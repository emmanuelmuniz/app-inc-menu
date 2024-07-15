import Navbar from "@/components/Navbar";
import HomeOptions from "@/components/HomeOptions";
import './Menu.css';

export default function Menu() {
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen no-scrollbar font-gratelos">
                <div className="bg-white rounded shadow-lg w-full sm:w-5/12 
                    sm:min-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100vh-2.5rem)]
                    sm:rounded sm:shadow-lgh-full min-h-screen overflow-y-auto no-scrollbar relative">
                    <div className="fixed z-10 bg-white w-full sm:w-5/12 rounded">
                        <Navbar className="" />
                    </div>
                    <div className="mt-[calc(4rem+1px)]">
                        <HomeOptions />
                    </div>
                </div>
            </div>
        </>
    );
}
