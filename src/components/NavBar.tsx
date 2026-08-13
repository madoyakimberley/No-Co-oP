import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/routine", label: "Routine" },
  { href: "/study", label: "Study" },
  { href: "/exam", label: "Exam" },
  { href: "/skills", label: "Skills" },
  { href: "/drawing", label: "Drawing" },
  { href: "/planner", label: "Planner" },
  { href: "/meals", label: "Meals" },
  { href: "/pull", label: "Pull Me" },
];

export default function NavBar() {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border bg-surface-lowest px-4 py-2">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-xs text-text-secondary hover:text-primary whitespace-nowrap px-3 py-1 rounded-card">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
