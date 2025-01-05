import { Route, Routes } from 'react-router-dom';
import Login from '../../GalleryModule/pages/Login';

const AuthModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
        </Routes>
    );
};

export default AuthModuleRouter;
