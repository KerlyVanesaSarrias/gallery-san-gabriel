import { useMemo } from 'react';
import { Logo } from '../../../components';
import {
    Button,
    Input,
    Card,
    Text,
    Carousel,
} from '../../../ui-elments/components';
import { CarouselImage } from '../../../ui-elments/components/Carousel/Carousel';
import imageZero from '../../../assets/images/login-zero.jpg';
import imageOne from '../../../assets/images/login-one.jpg';
import imageTwo from '../../../assets/images/login-two.jpg';

const Login = () => {
    const images = useMemo<CarouselImage[]>(() => {
        return [
            {
                id: 0,
                url: imageZero,
            },
            {
                id: 1,
                url: imageOne,
            },
            {
                id: 2,
                url: imageTwo,
            },
        ];
    }, []);

    return (
        <div className="relative w-full bg-gray-50 h-screen">
            <div className="flex flex-col p-8 md:px-24 h-full">
                <div className="w-24 brightness-0 mb-4">
                    <Logo />
                </div>
                <Card noPadding className="h-full">
                    <div className="flex flex-col sm:flex-row w-full h-full">
                        <div className="sm:w-1/2 flex flex-col items-center w-full p-10 justify-center">
                            <Text
                                as="h1"
                                size={'md'}
                                weight="medium"
                                className="mb-4"
                            >
                                Log In
                            </Text>
                            <form className="flex flex-col gap-5 w-full md:w-[300px]">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    label="Email"
                                />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    label="Password"
                                />

                                <Button
                                    type="submit"
                                    label="Log In"
                                    color="primary"
                                    size="medium"
                                />
                            </form>
                        </div>
                        <div className="w-full sm:w-1/2 h-full bg-blue-800 flex items-center px-2 sm:px-8">
                            <Carousel images={images} enableAutoplay />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
