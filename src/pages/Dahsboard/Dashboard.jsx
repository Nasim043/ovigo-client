import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Dashboard = () => {
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

export default Dashboard;