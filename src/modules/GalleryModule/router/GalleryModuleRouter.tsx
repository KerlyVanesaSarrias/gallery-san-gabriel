import { Route, Routes } from 'react-router-dom';
import GalleryLayout from '../layouts/GalleryLayout';
import GalleryModuleLayout from '../layouts/GalleryModuleLayout';
import { GALLERY_CATEGORIES_PATHS } from '../constants';
import GalleryPage from '../pages/GalleryPage';
import FavoritesPage from '../pages/FavoritesPage';
import { ProtectedRoute } from '../../../components';
import PageError from '../../../components/PageError/PageError';

const GalleryModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GalleryModuleLayout />}>
                <Route
                    path={GALLERY_CATEGORIES_PATHS.all}
                    element={<GalleryLayout />}
                >
                    <Route index element={<GalleryPage />} />
                    <Route
                        path={GALLERY_CATEGORIES_PATHS.animals}
                        element={<GalleryPage category="animals" />}
                    />
                    <Route
                        path={GALLERY_CATEGORIES_PATHS.music}
                        element={<GalleryPage category="music" />}
                    />
                    <Route
                        path={GALLERY_CATEGORIES_PATHS.sports}
                        element={<GalleryPage category="sports" />}
                    />
                    <Route
                        path={GALLERY_CATEGORIES_PATHS.food}
                        element={<GalleryPage category="food" />}
                    />
                </Route>
                <Route
                    path="/favorites"
                    element={<ProtectedRoute component={<FavoritesPage />} />}
                />
                <Route path="*" element={<PageError />} />
            </Route>
        </Routes>
    );
};

export default GalleryModuleRouter;
