import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="mt-10">

            <footer className="flex flex-col text-black border-t-2 border-[#d32f2f]">
                <div className="flex flex-col items-center justify-around gap-5 bg-sky-50 py-4 lg:py-8 md:flex-row md:gap-0">
                    <aside className="flex items-center justify-center gap-3 text-xl">
                        <img className='lg:size-12 size-5 rounded-full' src="https://i.ibb.co/7XhJX5x/w-removebg-preview.png" alt="" />
                        <Link to='/' className="font-bold ubuntu text-lg lg:text-[27px] text-[#d32f2f]">WinZone</Link>
                    </aside>
                    <div className="divider-info">

                    </div>
                    <nav className="lg:text-lg text-sm border-l-2 border-black">
                        <ul className=" flex h-full items-center justify-center gap-5">
                            <a href="https://www.facebook.com/kawserferdoussafi.03" className=" text-2xl">
                                <FaFacebookF />

                            </a>
                            <a href="https://www.linkedin.com/in/kawser-ferdous-safi/" className=" text-2xl">
                                <FaLinkedin />

                            </a>
                        </ul>
                    </nav>
                </div>
                <aside className="bg-sky-100 py-5 text-center text-sm inter">
                    <p>&copy; 2024 WinZone. All Rights Reserved.</p>
                </aside>
            </footer>

        </div>
    );
};

export default Footer;