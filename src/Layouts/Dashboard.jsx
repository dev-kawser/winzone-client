import { BiSolidBookContent } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdPadding, MdPostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex lg:flex-row flex-col">
            {/* Sidebar */}
            <div className="relative lg:w-64 w-full">
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <label htmlFor="my-drawer-2" className="btn bg-[#d32f2f] drawer-button lg:hidden mt-2 text-white rounded-none">☰ Open Drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu inter space-y-2 p-4 w-64 min-h-full bg-[#6A64F1] text-white">
                            <li>
                                <NavLink to="/dashboard/add-contest" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                    
                                    <span className="flex gap-1 items-center"> <IoMdAdd /> Add Contest</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-created-contest" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                    
                                    <span className="flex gap-1 items-center"> <MdPadding /> My Created Contest</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/contest-submitted-page" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                    
                                    <span className="flex gap-1 items-center"> <MdPostAdd /> Contest Submitted Page</span>
                                </NavLink>
                            </li>
                            <div className="divider divider-error" />
                            <li>
                                <NavLink to="/" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                    
                                    <span className="flex gap-1 items-center"> <FaHome /> Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/all-contests" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                    
                                    <span className="flex gap-1 items-center"> <BiSolidBookContent /> All Contests</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="mt-10 flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
