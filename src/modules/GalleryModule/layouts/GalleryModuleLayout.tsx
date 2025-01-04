import { Outlet } from 'react-router-dom';
import { Header } from '../Components';

const GalleryModuleLayout = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <Outlet />
        </div>
    );
};

export default GalleryModuleLayout;
