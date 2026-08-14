import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 13, marginTop: 20 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = item.href && !isLast ? (
          <Link href={item.href} style={{ color: "#0a5c8a" }}>
            {item.label}
          </Link>
        ) : (
          <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
        );

        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 ? " / " : ""}
            {content}
          </span>
        );
      })}
    </nav>
  );
}
