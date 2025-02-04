import "./Header.scss";

function Header() {
    const NavLinks = [
        { href: "/", label: "Главная" },
        { href: "/movie", label: "Фильмы" },
        { href: "/featured", label: "Избранное" },
    ];

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__list">
                    {NavLinks.map((link, index) => (
                        <li key={index} className="header__item">
                            <a href={link.href} className="header__link">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;