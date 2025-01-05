import NavHeader, { NavItem } from '../Header/NavHeader';
import { memo } from 'react';

interface SubHeaderCategoriesProps {
    navItems: NavItem[];
}
const SubHeaderCategories = ({ navItems }: SubHeaderCategoriesProps) => {
    return (
        <div className="flex w-full h-12 shadow-md bg-white  px-8 items-center">
            <div className="flex gap-4 h-full items-center">
                <NavHeader subHeader navItems={navItems} />
            </div>
        </div>
    );
};

export default memo(SubHeaderCategories);
