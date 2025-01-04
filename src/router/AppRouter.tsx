import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GalleryModuleRouter from '../modules/GalleryModule/router/GalleryModuleRouter';
import AuthModuleRouter from '../modules/AuthModule/router/AuthModuleRouter';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/gallery'} />} />
                <Route path="/*" element={<GalleryModuleRouter />} />
                <Route path="/login/*" element={<AuthModuleRouter />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
