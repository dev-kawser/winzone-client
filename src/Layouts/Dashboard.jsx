import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex gap-5 lg:flex-row flex-col">
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn bg-[#d32f2f] drawer-button lg:hidden mt-2 text-white rounded-none">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <NavLink to="/dashboard/add-contest">Add Contest</NavLink>
                            <NavLink>My Created Contest</NavLink>
                            <NavLink>Contest Submitted Page</NavLink>
                            <div className="divider"></div>
                            <NavLink to="/">Home</NavLink>
                            <NavLink>All Contests</NavLink>
                        </ul>

                    </div>
                </div>


            </div>
            <div className="mt-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;