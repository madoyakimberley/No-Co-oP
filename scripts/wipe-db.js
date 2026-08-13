const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

async function wipeDb() {
  const conn = await mysql.createConnection({
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "G3FZLWjDBYoPm2X.root",
    password: process.env.DB_PASSWORD,
    database: "nocoop",
    ssl: { rejectUnauthorized: true },
  });

  console.log("Connected. Fetching table list...");

  const [tables] = await conn.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'nocoop'`
  );

  if (tables.length === 0) {
    console.log("No tables found. Nothing to wipe.");
    await conn.end();
    return;
  }

  console.log(`Found ${tables.length} tables:`, tables.map(t => t.TABLE_NAME || t.table_name).join(", "));

  await conn.query("SET FOREIGN_KEY_CHECKS = 0");

  for (const row of tables) {
    const name = row.TABLE_NAME || row.table_name;
    console.log(`Dropping ${name}...`);
    await conn.query(`DROP TABLE IF EXISTS \`${name}\``);
  }

  await conn.query("SET FOREIGN_KEY_CHECKS = 1");

  console.log("All tables dropped.");
  await conn.end();
}

wipeDb().catch((err) => {
  console.error("Wipe failed:", err);
  process.exit(1);
});
