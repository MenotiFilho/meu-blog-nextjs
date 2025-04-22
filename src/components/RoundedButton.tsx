import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface RoundedButtonProps {
  href: string;
  label: string;
  parentGroup?: boolean;
  as?: "a" | "div"; // nova prop
}

export default function RoundedButton({
  href,
  label,
  parentGroup,
  as = "a", // padrão é <a>, como antes
}: RoundedButtonProps) {
  const className = `
    group flex justify-between items-center w-full rounded-full p-0.5 text-xl border-1 border-amber-100 font-bold
    transition-colors
    ${
      parentGroup
        ? "group-hover:text-black group-hover:bg-amber-100 group-hover:border-black"
        : "hover:text-black hover:bg-amber-100 hover:border-black"
    }
  `;

  const content = (
    <>
      <p
        className={`
          ml-3 font-light transition-colors
          ${
            parentGroup
              ? "group-hover:text-black group-hover:font-bold"
              : "hover:text-black hover:font-bold"
          }
        `}
      >
        {label}
      </p>
      <div
        className={`
          flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-black transition-colors mr-0.5
          ${
            parentGroup
              ? "group-hover:bg-black group-hover:text-amber-100"
              : "hover:bg-black hover:text-amber-100"
          }
        `}
      >
        <ArrowRight size={22} />
      </div>
    </>
  );

  if (as === "div") {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
