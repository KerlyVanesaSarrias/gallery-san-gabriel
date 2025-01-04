import { Logo } from '../../../../components';
import NavHeader, { NavItem } from './NavHeader';
import './Header.tailwind.css';
import { useMemo } from 'react';
const Header = () => {
    const navItems = useMemo<NavItem[]>(() => {
        return [
            {
                label: 'Gallery',
                path: '/gallery',
                to: '/gallery',
            },
            {
                label: 'Favorites',
                path: '/favorites',
                to: '/favorites',
            },
        ];
    }, []);

    return (
        <div className="flex justify-between w-full h-16 bg-blue-700 px-8 items-center">
            <Logo />
            <div className="h-full">
                <NavHeader navItems={navItems} />
            </div>
        </div>
    );
};

export default Header;
