import { NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-6 h-16 bg-white">
      <h2 className="text-primary-red font-bold text-2xl">Bookify</h2>
      <nav className="hidden xs:flex items-center h-full gap-8">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/mp3">MP3</NavLink>
        <NavLink to="/user-list">UserList</NavLink>
      </nav>

      <div className="relative" ref={menuRef}>
        <CiMenuBurger
          className="cursor-pointer size-5"
          onClick={handleOpenMenu}
        />
        {isMenuOpen && (
          <nav className="flex flex-col p-4 w-auto min-w-40 gap-3 absolute right-0 bg-white text-base rounded-2xl">
            <NavLink
              to="/"
              className="hamburguer-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </NavLink>
            <NavLink
              to="/"
              className="hamburguer-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrarse
            </NavLink>
            <hr className="text-gray-300" />
            <NavLink
              to="/"
              className="hamburguer-link xs:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/mp3"
              className="hamburguer-link xs:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              MP3
            </NavLink>
            <NavLink
              to="/user-list"
              className="hamburguer-link"
              onClick={() => setIsMenuOpen(false)}
            >
              UserList
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
