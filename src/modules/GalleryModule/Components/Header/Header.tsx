import { Logo } from '../../../../components';
import NavHeader, { NavItem } from './NavHeader';
import { Button, Dropdown } from '../../../../ui-elments/components';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItemProps } from '../../../../ui-elments/components/Dropdown/DropdownItem';

interface HeaderProps {
    navItems: NavItem[];
    isAuthenticated?: boolean;
    userName: string;
}
const Header = ({
    navItems,
    isAuthenticated = false,
    userName,
}: HeaderProps) => {
    const dropdownItems = useMemo<DropdownItemProps[]>(() => {
        return [
            {
                id: '0',
                label: userName,
            },
            {
                id: '1',
                label: 'Sign out',
                onClick: () => alert('Sign out method'),
            },
        ];
    }, [userName]);

    return (
        <div className="flex justify-between w-full h-16 bg-blue-700 px-8 items-center">
            <Logo />
            <div className="flex gap-4 h-full items-center">
                <NavHeader navItems={navItems} />
                {!isAuthenticated && (
                    <Link to="/login">
                        <Button size="small" color="secondary" label="Login" />
                    </Link>
                )}
                {isAuthenticated && (
                    <Dropdown label="KV" isRounded items={dropdownItems} />
                )}
            </div>
        </div>
    );
};

export default memo(Header);
