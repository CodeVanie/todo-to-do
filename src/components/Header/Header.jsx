import { aboutme, projects, home, modify, profile, aboutmed, projectsd, homed, modifyd, profiled } from '../../assets/images/nav-logos.js'
import NavItem from './NavItem.jsx';
import HeaderTop from './HeaderTop.jsx';
import NavBar from './NavBar.jsx';
import Logo from './Logo.jsx';
import BackToPortfolio from './BackToPortfolio.jsx';
import { useLocation } from 'react-router-dom';

function Header() {
    const { pathname } = useLocation();
    const headerClass = `bg-center pt-3 px-2 ${pathname === "/modify" ?
                 "bg-rough-brown text-red-950" : 
                 "bg-smooth-brown bg-cover text-ptlbrown-100"}`;
    const navItems = [
        { page: "aboutme", icon: aboutme, darkicon: aboutmed },
        { page: "projects", icon: projects, darkicon: projectsd },
        { page: "home", icon: home, darkicon: homed },
        { page: "modify", icon: modify, darkicon: modifyd },
        { page: "profile", icon: profile, darkicon: profiled },
    ];

    return (
        <header className={headerClass}>
            <HeaderTop>
                <Logo />
                <BackToPortfolio />
            </HeaderTop>
            
            <NavBar>
                {navItems.map(item => (
                    <NavItem key={item.page} {...item} currentPage={pathname} />
                ))}
            </NavBar>
        </header>
    );
}

export default Header