import { useState } from 'react';
import './Header.scss';

const Header = () => {
    const NavLinks = [
        { href: "/", label: "Главная" },
        { href: "/movie", label: "Фильмы" },
        { href: "/featured", label: "Избранное" },
    ];
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <button className="header__burger-button" onClick={toggleMenu}>
                <span className="header__burger-line header__burger-line--top"></span>
                <span className="header__burger-line header__burger-line--middle"></span>
                <span className="header__burger-line header__burger-line--bottom"></span>
            </button>

            <nav className={`header__menu ${isOpen ? 'header__menu--open' : ''}`}>
                {NavLinks.map((link, index) => (
                    <li key={index} className="header__item">
                        <a href={link.href} className="header__link">
                            {link.label}
                        </a>
                    </li>
                ))}
            </nav>
        </header>
    );
};

export default Header;