import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface RoundedButtonProps {
  href: string;
  label: string;
  parentGroup?: boolean;
  as?: "a" | "div"; // nova prop
  defaultTextColor?: string; // Cor padrão do texto
  defaultBgColor?: string; // Cor padrão do fundo
  hoverTextColor?: string; // Cor do texto no hover
  hoverBgColor?: string; // Cor do fundo no hover
  defaultBorderColor?: string; // Cor padrão da borda
  hoverBorderColor?: string; // Cor da borda no hover
  iconColor?: string; // Cor padrão do ícone
  hoverIconColor?: string; // Cor do ícone no hover
  iconBgColor?: string; // Cor padrão do fundo do ícone
  hoverIconBgColor?: string; // Cor do fundo do ícone no hover
}

export default function RoundedButton({
  href,
  label,
  parentGroup,
  as = "a", // padrão é <a>, como antes
  defaultTextColor = "text-amber-100", // Cor padrão do texto
  defaultBgColor = "bg-transparent", // Fundo padrão
  hoverTextColor = "text-black", // Cor do texto no hover
  hoverBgColor = "bg-amber-100", // Fundo no hover
  defaultBorderColor = "border-amber-100", // Cor da borda padrão
  hoverBorderColor = "border-black", // Cor da borda no hover
  iconColor = "text-black", // Cor padrão do ícone
  hoverIconColor = "text-amber-100", // Cor do ícone no hover
  iconBgColor = "bg-amber-100", // Cor padrão do fundo do ícone
  hoverIconBgColor = "bg-black", // Cor do fundo do ícone no hover
}: RoundedButtonProps) {
  const className = `
    group flex justify-between items-center w-full rounded-full p-0.5 text-xl font-bold
    transition-colors border-2
    ${defaultTextColor} ${defaultBgColor} ${defaultBorderColor}
    ${
      parentGroup
        ? `group-hover:${hoverTextColor} group-hover:${hoverBgColor} group-hover:${hoverBorderColor}`
        : `hover:${hoverTextColor} hover:${hoverBgColor} hover:${hoverBorderColor}`
    }
  `;

  const content = (
    <>
      <p
        className={`
          ml-3 font-light transition-colors
          ${
            parentGroup
              ? `group-hover:${hoverTextColor} group-hover:font-bold`
              : `hover:${hoverTextColor} hover:font-bold`
          }
        `}
      >
        {label}
      </p>
      <div
        className={`
          flex items-center justify-center w-6 h-6 rounded-full transition-colors mr-0.5
          ${iconBgColor}
          ${
            parentGroup
              ? `group-hover:${hoverIconBgColor}`
              : `hover:${hoverIconBgColor}`
          }
        `}
      >
        <ArrowRight
          size={22}
          className={`transition-colors ${iconColor} ${
            parentGroup
              ? `group-hover:${hoverIconColor}`
              : `hover:${hoverIconColor}`
          }`}
        />
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
