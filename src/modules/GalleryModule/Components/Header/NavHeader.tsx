import { Link, useLocation } from 'react-router-dom';

export type NavItem = {
    label: string;
    path: string;
};
interface NavHeaderProps {
    navItems: NavItem[];
}
const NavHeader = ({ navItems }: NavHeaderProps) => {
    const location = useLocation();

    return (
        <nav className="h-full">
            <ul className="flex gap-2 text-white h-full items-center nav">
                {navItems.map((item) => {
                    const { label, path } = item;
                    return (
                        <li
                            key={label}
                            className={
                                location.pathname === path ? 'active' : ''
                            }
                        >
                            <Link
                                to={path}
                                className="size-full flex items-center px-4"
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavHeader;
