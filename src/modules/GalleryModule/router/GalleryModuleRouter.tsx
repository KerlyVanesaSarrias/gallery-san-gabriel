import { Route, Routes } from 'react-router-dom';
import GalleryLayout from '../layouts/GalleryLayout';
import GalleryModuleLayout from '../layouts/GalleryModuleLayout';
import { GALLERY_CATEGORIES_PATHS } from '../constants';

const GalleryModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GalleryModuleLayout />}>
                <Route
                    path={GALLERY_CATEGORIES_PATHS.all}
                    element={<GalleryLayout />}
                >
                    <Route index element={<h1>All categories component</h1>} />
                    <Route
                        path={GALLERY_CATEGORIES_PATHS.animals}
                        element={<h1>filtra animals</h1>}
                    />
                </Route>
                <Route path="/favorites" element={<h1>favorites</h1>} />
            </Route>
        </Routes>
    );
};

export default GalleryModuleRouter;
