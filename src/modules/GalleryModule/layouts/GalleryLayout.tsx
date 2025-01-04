import { Outlet } from 'react-router-dom';
import { SubHeaderCategories } from '../Components';
import { NavItem } from '../Components/Header/NavHeader';
import { useMemo } from 'react';
import { GALLERY_CATEGORIES_PATHS } from '../constants';

const GalleryLayout = () => {
    const navItems = useMemo<NavItem[]>(() => {
        return [
            {
                label: 'All',
                path: GALLERY_CATEGORIES_PATHS.all,
            },
            {
                label: 'Animals',
                path: GALLERY_CATEGORIES_PATHS.animals,
            },
        ];
    }, []);

    return (
        <div className="flex flex-col">
            <SubHeaderCategories navItems={navItems} />
            <Outlet />
        </div>
    );
};

export default GalleryLayout;
