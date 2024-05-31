
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    const links = <>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f]' : 'hover:scale-105'} to='/' > Home</NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f]  transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f]' : 'hover:scale-105'} to='/all-contests' > All
                contests</NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f]  transition-all duration-300 group-hover:w-full"></span>
        </li>
        {/* <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f] font-bold ' : 'font-semibold hover:scale-105'} to='/my-queries' > My Queries </NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
            <NavLink className={({ isActive }) => isActive ? 'text-[#d32f2f] font-bold ' : 'font-semibold hover:scale-105'} to='/allReview' > Reviews </NavLink> <span className="hidden lg:block mt-[2px] h-[3px] w-[0px] rounded-full bg-[#d32f2f] transition-all duration-300 group-hover:w-full"></span>
        </li> */}

    </>

    return (
        <div>


            {/* navbar top */}
            <div className='bg-[#d32f2f] text-white py-3'>
                <div className='container mx-auto flex justify-between'>
                    <div>
                        <h1>Hello I am Safi</h1>
                    </div>
                    <div>
                        <h1>Hello I am Goodbye</h1>
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
                            <img className='size-10' src="https://i.ibb.co/Zzmqtbf/png-transparent-digital-camera-illustration-logo-camera-lens-graphy-creative-camera-lens-camera-icon.png" alt="" />
                            <Link to='/' className="font-bold text-[27px] text-[#d32f2f]">SHOOTER</Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center overpass justify-between gap-7 font-medium text-lg">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Link to="/login">

                            <button className="rounded-md border border-[#d32f2f] px-5 py-2 text-xl text-white duration-200 bg-[#d32f2f] hover:bg-white  hover:text-[#d32f2f]">Login</button>

                        </Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Navbar;