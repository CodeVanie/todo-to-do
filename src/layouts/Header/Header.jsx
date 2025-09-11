import NavItem from './NavItem.jsx';
import NavBar from './NavBar.jsx';
import Logo from './Logo.jsx';
import Portfolio from './Portfolio.jsx';
import { useLocation } from 'react-router-dom';
import HeaderWrapper from '../HeaderWrapper.jsx';

export default function Header() {
    const { pathname } = useLocation();
    const navItems = [
        { page: "aboutapp", label: "App Guide"},
        { page: "projects", label: "Projects" },
        { page: "home", label: "Home" },
        { page: "modify", label: "List Manager" },
        { page: "notif", label: "Notifications"},
    ];

    return (
        <HeaderWrapper currentPage={pathname}>
            <Logo />
            <NavBar>
            {navItems.map(item => (
                <NavItem key={item.page} {...item} currentPage={pathname} />
            ))}
            </NavBar>
            <Portfolio />
        </HeaderWrapper>
    );
}