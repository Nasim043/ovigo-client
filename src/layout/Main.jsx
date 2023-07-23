import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Other components will be placed here */}
            <div className="flex-grow">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default Main;