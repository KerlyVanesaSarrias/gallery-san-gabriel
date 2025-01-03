import { Route, Routes } from 'react-router-dom';

const AuthModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Login page</h1>} />
        </Routes>
    );
};

export default AuthModuleRouter;
