import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const SignUp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { registerAuth, updateUserProfile, googleLogIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [pass, setPass] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPassError, setConfpassError] = useState('');
    const [authError, setAuthError] = useState('')
    const from = location.state?.from?.pathname || '/';

    const handlePassword = (e) => {
        const password = e.target.value;
        setPass(password);
        if (password.length < 6) {
            setPasswordError('Password should be at least 6 character long');
        } else if (!/^(?=.*[A-Z])(?=.*[\W_])(.{6,})$/.test(password)) {
            setPasswordError('Password must have a capital letter and a special character');
        } else {
            setPasswordError('');
        }
    }
    const handleConfirmPass = (e) => {
        const confirmPass = e.target.value;
        if (confirmPass !== pass) {
            setConfpassError('Passwords do not match');
        } else {
            setConfpassError('');
        }
    }

    // google
    const handleGoogleLogin = () => {
        googleLogIn()
            .then((result) => {
                //handleLogOut();
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const newUser = { name: loggedInUser.displayName, email: loggedInUser.email, image: loggedInUser.photoURL }
                fetch('http://localhost:5000/users', {
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
            .catch(error => setAuthError(error.message.split('/')[1].slice(0, -2)))
    }

    const onSubmit = data => {

        // console.log(data)
        if (!passwordError && !confPassError) {
            registerAuth(data.email, data.password)
                .then(() => {
                    updateUserProfile(data.name, data.photoUrl)
                        .then(() => {
                            const newuser = { name: data.name, email: data.email, image: data.photoUrl }
                            fetch('http://localhost:5000/users', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(newuser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        reset();
                                        toast.success('User created successfully', {
                                            closeOnClick: true,
                                        })
                                        navigate(from, { replace: true });
                                    }
                                })
                            // handleLogOut();
                        })
                        .catch(error => console.log(error.message))
                })
                .catch(error => {
                    setAuthError(error.message.split('/')[1].slice(0, -2));
                })
        }
    };
    return (
        <div className="my-container">
            <div className="card w-11/12 sm:w-4/5 max-w-xl mx-auto shadow-2xl bg-base-100 mb-10">
                <div className="card-body">
                    <h3 className='text-3xl font-bold text-center mb-3 text-[#293749]'>Sign up to Discover</h3>
                    <div className="form-control">
                        <button className="btn btn-outline btn-neutral hover:bg-mysecondary mb-2" onClick={handleGoogleLogin}><FaGoogle className='me-2'></FaGoogle> Login with Google</button>
                    </div>
                    <div className="divider my-3">Or sign up with email</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-sm mt-1 error">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-sm mt-1 error">email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true })} placeholder="******" onChange={(e) => handlePassword(e)} className="input input-bordered" />
                            {errors.password && <span className="text-sm mt-1 error">password is required</span>}
                            {passwordError && <span className="text-sm mt-1 error">{passwordError}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" {...register("confirm_password", { required: true })} placeholder="******" onChange={(e) => handleConfirmPass(e)} className="input input-bordered" />
                            {errors.confirm_password && <span className="text-sm mt-1 error">confirm password is required</span>}
                            {confPassError && <span className="text-sm mt-1 error">{confPassError}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="url" {...register("photoUrl", { required: true })} placeholder="Photo Url" className="input input-bordered" />
                            {errors.photoUrl && <span className="text-sm mt-1 error">photoUrl is required</span>}
                        </div>
                        {authError && <span className='text-red-500 text-sm mt-1 error'>{authError}</span>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p className='mt-3'>Already have an account?  <Link to='/login' className="link link-hover text-primary">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;