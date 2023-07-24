import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, googleLogIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState('')
    const from = location.state?.from?.pathname || '/'

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // google login
    const handleGoogleLogin = () => {
        googleLogIn()
            .then(result => {
                const loggedInUser = result.user;
                // console.log(loggedInUser);
                const newUser = { name: loggedInUser.displayName, email: loggedInUser.email, image: loggedInUser.photoURL }

                fetch('https://ovigo-server-wheat.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.log(error.message))
    }

    const onSubmit = (data) => {
        // console.log(data);
        login(data.email, data.password)
            .then(() => {
                reset();
                toast.success('Login Successfull', {
                    closeOnClick: true,
                  })
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message.split('/')[1].slice(0, -2));
            })
    }
    return (
        <div className="my-container">
            <div className="card w-11/12 sm:w-4/5 max-w-xl mx-auto shadow-2xl bg-base-100 mb-10">
                <div className="card-body">
                    <h3 className='text-3xl font-bold text-center mb-3 text-[#293749]'>Login to have fun</h3>
                    <div className="form-control">
                        <button className="btn btn-outline btn-neutral hover:bg-mysecondary mb-2" onClick={handleGoogleLogin}><FaGoogle className='me-2'></FaGoogle> Login with Google</button>
                    </div>
                    <div className="divider my-3">OR</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email <span className='text-red-500 text-lg'></span></span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password <span className='text-red-500 text-lg mt-1'></span></span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} placeholder="password" className="input input-bordered" required />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 pt-9 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {error && <span className='text-sm mt-1 error'>{error}</span>}
                    <p className='mt-3'>Don&apos;t have an account?  <Link to='/signup' className="link link-hover text-primary">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;