import { useState, useEffect, useRef } from "react";
import NavItem from "../UI/NavItem";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-b from-zinc-950 to-transparent text-white py-3">
      <nav
        ref={menuRef}
        className="container mx-auto px-6 py-4 flex justify-between items-center relative"
      >
        <div className="text-2xl font-bold tracking-wide">MovieReel</div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12H16m-6 6h6"
              />
            </svg>
          </button>
        </div>
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-8 absolute md:relative top-full right-0 md:top-0 bg-zinc-950 md:bg-transparent md:flex-row flex-col md:p-0 p-4 z-10`}
        >
          <NavItem item="Home" link="/" onClick={toggleMenu} />
          <NavItem item="Movies" link="/movies" onClick={toggleMenu} />
          <NavItem item="Watch Later" link="/watchLater" onClick={toggleMenu} />
          <NavItem item="Watched" link="/watched" onClick={toggleMenu} />
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
