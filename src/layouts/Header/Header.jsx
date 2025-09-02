import { aboutme, projects, home, modify, profile, aboutmed, projectsd, homed, modifyd, profiled } from '../../assets/images/logos.js'
import NavItem from './NavItem.jsx';
import NavBar from './NavBar.jsx';
import Logo from './Logo.jsx';
import BackToPortfolio from './BackToPortfolio.jsx';
import { useLocation } from 'react-router-dom';
import HeaderWrapper from '../HeaderWrapper.jsx';

function Header() {
    const { pathname } = useLocation();
    const navItems = [
        { page: "aboutme", label: "App Guide", icon: aboutme, darkicon: aboutmed },
        { page: "projects", label: "Projects", icon: projects, darkicon: projectsd },
        { page: "home", label: "Home", icon: home, darkicon: homed },
        { page: "modify", label: "List Manager", icon: modify, darkicon: modifyd },
        { page: "profile", label: "Profile", icon: profile, darkicon: profiled },
    ];

    return (
        <HeaderWrapper currentPage={pathname}>
            <Logo />
            <NavBar>
                {navItems.map(item => (
                    <NavItem key={item.page} {...item} currentPage={pathname} />
                ))}
            </NavBar>
            <BackToPortfolio currentPage={pathname}/>
        </HeaderWrapper>
    );
}

export default Header