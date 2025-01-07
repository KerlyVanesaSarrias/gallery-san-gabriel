import image from '../../assets/images/image_error404.svg';
import { Link } from 'react-router-dom';
import { Text } from '../../ui-elments/components';

const PageError = () => {
    return (
        <div className="">
            <div>
                <img className="w-full" src={image} alt="404 Error" />
            </div>
            <div>
                <Text color="error">Error</Text>
                <Link to="/"></Link>
            </div>
        </div>
    );
};
export default PageError;
