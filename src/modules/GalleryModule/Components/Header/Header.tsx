import { Logo } from '../../../../components';
import NavHeader, { NavItem } from './NavHeader';
import { Button, Dropdown } from '../../../../ui-elments/components';
import { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItemProps } from '../../../../ui-elments/components/Dropdown/DropdownItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { userActions } from '../../../AuthModule/slices/UserSlice/userSlice';

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
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const dropdownItems = useMemo<DropdownItemProps[]>(() => {
        return [
            {
                id: '0',
                label: userName,
                isBold: true,
            },
            {
                id: '1',
                label: 'Sign out',
                onClick: handleLogout,
            },
        ];
    }, [handleLogout, userName]);

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
