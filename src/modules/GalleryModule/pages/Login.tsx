import { Logo } from '../../../components';
import { Button, Input, Card } from '../../../ui-elments/components';

const Login = () => {
    return (
        <div className="relative w-full bg-gray-50 h-screen">
            <div className="flex flex-col p-8 md:px-24">
                <div className="w-24 brightness-0">
                    <Logo />
                </div>
                <Card noPadding>
                    <div className="flex w-full">
                        <div className="flex flex-col items-center w-full p-10">
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
                        <div className="w-full  bg-blue-800">Card</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
