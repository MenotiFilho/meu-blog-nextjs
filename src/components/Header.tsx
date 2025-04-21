import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      {" "}
      {/* Sticky header */}
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Nome do Blog */}
        <Link
          href="/"
          className="text-xl font-bold hover:text-gray-300 transition-colors"
        >
          ickfj {/* Ou o nome que preferir */}
        </Link>

        {/* Links de Navegação */}
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="archive"
              className="hover:text-gray-300 transition-colors"
            >
              Archive
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
