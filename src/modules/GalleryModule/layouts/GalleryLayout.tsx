import { Outlet } from 'react-router-dom';

const GalleryLayout = () => {
    return (
        <div className="flex flex-col">
            <h1>Header categories</h1>
            <Outlet />
        </div>
    );
};

export default GalleryLayout;
