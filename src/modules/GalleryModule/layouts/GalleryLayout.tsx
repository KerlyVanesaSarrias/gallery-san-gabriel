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
            {
                label: 'Music',
                path: GALLERY_CATEGORIES_PATHS.music,
            },
            {
                label: 'Sports',
                path: GALLERY_CATEGORIES_PATHS.sports,
            },
            {
                label: 'Food',
                path: GALLERY_CATEGORIES_PATHS.food,
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
