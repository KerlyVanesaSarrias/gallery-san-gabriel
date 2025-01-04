import { Route, Routes } from 'react-router-dom';
import GalleryLayout from '../layouts/GalleryLayout';
import GalleryModuleLayout from '../layouts/GalleryModuleLayout';

const GalleryModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GalleryModuleLayout />}>
                <Route path="/gallery" element={<GalleryLayout />}>
                    <Route index element={<h1>All categories component</h1>} />
                    <Route path={'animals'} element={<h1>filtra animals</h1>} />
                </Route>
                <Route path="/favorites" element={<h1>favorites</h1>} />
            </Route>
        </Routes>
    );
};

export default GalleryModuleRouter;
