import { Logo } from '../../../components';
import { Button, Input, Card } from '../../../ui-elments/components';

const Login = () => {
    return (
        <div className="relative w-full bg-gray-50 h-screen">
            <div className="flex flex-col p-8 md:px-24 h-full">
                <div className="w-24 brightness-0 mb-4">
                    <Logo />
                </div>
                <Card noPadding className="h-full">
                    <div className="flex flex-col md:flex-row w-full h-full">
                        <div className="flex flex-col items-center w-full p-10 justify-center">
                            <h1>Log In</h1>
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
                        <div className="w-full h-full bg-blue-800">Card</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
