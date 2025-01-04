import { Logo } from '../../../../components';
import NavHeader, { NavItem } from './NavHeader';
import { Button } from '../../../../ui-elments/components';
import { memo } from 'react';

interface HeaderProps {
    navItems: NavItem[];
}
const Header = ({ navItems }: HeaderProps) => {
    return (
        <div className="flex justify-between w-full h-16 bg-blue-700 px-8 items-center">
            <Logo />
            <div className="flex gap-4 h-full items-center">
                <NavHeader navItems={navItems} />
                <Button color="secondary" label="Login" />
            </div>
        </div>
    );
};

export default memo(Header);
