import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../GalleryModule/pages/LoginPage';

const AuthModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
};

export default AuthModuleRouter;
