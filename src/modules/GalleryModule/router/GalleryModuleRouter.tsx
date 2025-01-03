import { Route, Routes } from 'react-router-dom';
import GalleryLayout from '../layouts/GalleryLayout';

const GalleryModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GalleryLayout />}>
                <Route index element={<h1>All categories component</h1>} />
                <Route path={'animals'} element={<h1>filtra animals</h1>} />
            </Route>
        </Routes>
    );
};

export default GalleryModuleRouter;
