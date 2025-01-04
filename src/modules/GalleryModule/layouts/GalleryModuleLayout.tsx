import { Outlet } from 'react-router-dom';
import { Header } from '../Components';
import { NavItem } from '../Components/Header/NavHeader';
import { useMemo } from 'react';

const GalleryModuleLayout = () => {
    const navItems = useMemo<NavItem[]>(() => {
        return [
            {
                label: 'Gallery',
                path: '/gallery',
            },
            {
                label: 'Favorites',
                path: '/favorites',
            },
        ];
    }, []);
    return (
        <div className="flex flex-col">
            <Header navItems={navItems} />
            <Outlet />
        </div>
    );
};

export default GalleryModuleLayout;
