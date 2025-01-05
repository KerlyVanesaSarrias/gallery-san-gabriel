import { useCallback } from 'react';
import LogoIMG from '../../assets/images/gallery-logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex h-full w-full">
            <img
                src={LogoIMG}
                alt="Gallery logo"
                onClick={handleClick}
                role="button"
            />
        </div>
    );
};

export default Logo;
