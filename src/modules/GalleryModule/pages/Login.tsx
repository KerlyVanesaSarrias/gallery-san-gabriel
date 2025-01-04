
import { Button } from '../../../ui-elments/components';
import { Input } from '../../../ui-elments/components/Input';

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    return (
        <div>
            <div className=''>
                <h1>Log In</h1>
                <form className='flex flex-col gap-5 '>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        label="Email"
                        value="email"
                    />
                    <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    label="Password"
                    value="password"
                    />

                    <Button
                    type="submit"
                    label="Log In"
                    color="primary"
                    size="medium"


                    />
                </form>

            </div>
        </div>
    );
};

export default Login;
