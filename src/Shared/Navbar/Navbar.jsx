
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { FaFacebookF, FaLinkedin, FaPhoneAlt, FaPinterest, FaTwitter } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { RiInstagramFill } from 'react-icons/ri';
import { CgLogIn } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {

    const { user, logOut } = useAuth()

    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "synthwave" : "light"));
    };

    const links = <>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f]' : 'hover:scale-105'} to='/' > Home</NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f]  transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f]' : 'hover:scale-105'} to='/all-contests' > All
                contests</NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f]  transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f] ' : ' hover:scale-105'} to='/leaderBoard' > Leaderboard </NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f] ' : 'hover:scale-105'} to='/participation-progress' >Participation Progress </NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f] transition-all duration-300 group-hover:w-full"></span>
        </li>

    </>

    const [open, setOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setOpen(false)
            }
        };
        document.addEventListener('mousedown', close);
        return () => {
            document.removeEventListener('mousedown', close)
        }
    }, []);

    return (
        <div>


            {/* navbar top */}
            <div className='bg-[#d32f2f] text-white py-3 lg:flex hidden'>

                <div className='container mx-auto'>
                    <div className='flex justify-between'>
                        <div>
                            <ul className='ubuntu flex gap-5 items-center justify-center'>
                                <li className='flex gap-1 items-center justify-center'><i><FaPhoneAlt /></i><a href="tel:+88 01709190412">+88 01709190412</a></li>
                                <li className='flex gap-1 items-center justify-center'><i><IoMail /></i><a href="kawserOfficial.dev@gmail.com">kawserOfficial.dev@gmail.com</a></li>
                            </ul>
                        </div>

                        <div>
                            <div className='flex gap-4'>
                                <ul className='flex gap-3'>
                                    <li className='text-xl'><FaFacebookF /></li>
                                    <li className='text-xl'><RiInstagramFill /></li>
                                    <li className='text-xl'><FaPinterest /></li>
                                    <li className='text-xl'><FaTwitter /></li>
                                    <li className='text-xl'><FaLinkedin /></li>
                                </ul>
                                <div className='border'></div>
                                <div className='flex gap-2 items-center justify-center'>
                                    <CgLogIn className='text-xl' />
                                    <Link to='/register' className="hover:underline ubuntu">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* navbar */}
            <div className='shadow-xl'>
                <div className="navbar container mx-auto py-4">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    links
                                }
                            </ul>
                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <img className='lg:size-12 size-5 rounded-full p-1 border-2 border-[#d32f2f]' src="https://i.ibb.co/Yjm8Wx5/golden-trophy-with-falling-golden-confetti.jpg" alt="" />
                            <Link to='/' className="font-bold ubuntu text-lg lg:text-[27px] text-[#d32f2f]">WinZone</Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center overpass justify-between gap-7 font-medium text-lg inter">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="navbar-end">

                    <label className="cursor-pointer hidden lg:grid place-items-center mr-3">
                        <input
                            onChange={handleToggle}
                            type="checkbox"
                            checked={theme === "synthwave"}
                            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                        />
                        <svg
                            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>

                        {
                            user ?
                                <div ref={dropDownRef} className="relative mx-2 w-fit text-black">
                                    <button onClick={() => setOpen((prev) => !prev)}>
                                        <img width={40} height={40} className="lg:size-12 size-10 border-2 border-[#d32f2f] rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80" src={user?.photoURL} alt="avatar drop down navigate ui" />
                                    </button>
                                    <ul className={`${open ? 'visible duration-300' : 'invisible'} absolute right-0 top-12 z-50 w-fit rounded-sm bg-slate-200 shadow-md`}>
                                        <li className='hover:bg-slate-400 inter bg-slate-300 rounded-sm px-6 py-2'>
                                            {user.displayName}
                                        </li>
                                        <li className='hover:bg-slate-300 inter rounded-sm px-6 py-2'>
                                            <Link to='/dashboard/welcome'>Dashboard</Link>
                                        </li>
                                        <li className='text-red-500 inter hover:bg-red-600 hover:text-white rounded-sm px-6 py-2 cursor-pointer font-semibold' onClick={logOut} >LogOut</li>
                                    </ul>
                                </div>

                                :
                                <Link to="/login">

                                    <button className="lg:rounded-md ubuntu border border-[#d32f2f] lg:px-5 lg:py-2 lg:text-xl text-lg px-2 text-white duration-200 bg-[#d32f2f] hover:bg-white  hover:text-[#d32f2f]">Login</button>

                                </Link>
                        }
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Navbar;