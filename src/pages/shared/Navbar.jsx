import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                toast.success('Log-out successful', {
                    closeOnClick: true,
                })
                navigate('/login');
            }).catch((error) => {
                // An error happened.
                console.log(error.message);
            });
    }


    return (
        <>
            <div className="navbar my-container">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            {user ? <>
                                <li><Link to='/addCommunity'>Create Community</Link></li>
                                <li><Link to='/dashboard'>DashBoard</Link></li>
                                <li><a onClick={handleLogOut}>Logout</a></li></>
                                : <li><Link to='/login'>Login</Link></li>}
                            {user && (<div className="tooltip" data-tip={user?.displayName}>
                                <li> <a>{user?.displayName}</a></li>
                            </div>)}
                        </ul>
                    </div>
                    <Link to='/' className="text-xl sm:text-3xl font-bold flex items-center">
                        <span className='text-purple-600 ms-2'>Ovigo</span>
                    </Link>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 lg:flex lg:items-center">
                        <li><NavLink to='/' className={({ isActive }) =>
                            isActive ? "" : ""}>Home</NavLink></li>

                        {user ? <>
                            <li><NavLink to='/addCommunity' className={({ isActive }) =>
                                isActive ? "" : ""}>Create Community</NavLink></li>
                            <li><NavLink to='/dashboard' className={({ isActive }) =>
                                isActive ? "" : ""}>DashBoard</NavLink></li>
                            <li><NavLink onClick={handleLogOut} className="me-2">Logout</NavLink></li></>
                            :
                            <li><NavLink to='/login' className={({ isActive }) =>
                                isActive ? "" : ""}>Login</NavLink></li>}
                        {user && (<div className="tooltip" data-tip={user?.displayName}>
                            <img src={user.photoURL ? user.photoURL : "https://i.ibb.co/6Y2xHC1/Fj-U2lkc-WYAg-NG6d.jpg"} alt={user?.displayName} className='w-12 h-12 rounded-full' />
                        </div>)}
                    </ul>
                </div>
            </div >
        </>
    );
};

export default Navbar;