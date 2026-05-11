import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout(){
    return(
        <div className="flex min-h-screen bg-[#F8F8F8]">
            <div id="layout-wrapper" className="flex flex-row flex-1">
                <Sidebar/>
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    )
}
