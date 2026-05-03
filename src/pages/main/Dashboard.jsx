import { FaBed, FaUserCheck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";

export default function Dashboard() {
    return (
        <div className="p-4">
            <PageHeader title="Hotel Dashboard" breadcrumb="Statistics"/>
            <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-yellow-100 rounded-xl p-4 flex items-center space-x-4">
                    <div className="bg-yellow-500 rounded-full p-4 text-white">
                        <FaBed />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">120</h2>
                        <p className="text-gray-500 text-sm">Total Bookings</p>
                    </div>
                </div>

                <div className="bg-blue-100 rounded-xl p-4 flex items-center space-x-4">
                    <div className="bg-blue-500 rounded-full p-4 text-white">
                        <FaUserCheck />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">80</h2>
                        <p className="text-gray-500 text-sm">Check-ins</p>
                    </div>
                </div>

                <div className="bg-red-100 rounded-xl p-4 flex items-center space-x-4">
                    <div className="bg-red-500 rounded-full p-4 text-white">
                        <FaBan />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">15</h2>
                        <p className="text-gray-500 text-sm">Canceled</p>
                    </div>
                </div>

                <div className="bg-green-100 rounded-xl p-4 flex items-center space-x-4">
                    <div className="bg-green-500 rounded-full p-4 text-white">
                        <FaDollarSign />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Rp 25jt</h2>
                        <p className="text-gray-500 text-sm">Revenue</p>
                    </div>
                </div>
            </div>

            {/* SECOND SECTION */}
            <div className="px-5 grid md:grid-cols-2 gap-4">

                {/* RECENT BOOKINGS */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-semibold text-gray-700">
                            Recent Bookings
                        </h3>
                        <span className="text-sm text-yellow-600 cursor-pointer">
                            View All
                        </span>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="py-2 text-left">Booking ID</th>
                                <th className="py-2 text-left">Guest</th>
                                <th className="py-2 text-left">Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2">BK-001</td>
                                <td>John Doe</td>
                                <td>Deluxe</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">BK-002</td>
                                <td>Sarah</td>
                                <td>Suite</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">BK-003</td>
                                <td>Michael</td>
                                <td>Standard</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ROOM PERFORMANCE */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-semibold text-gray-700">
                            Room Performance
                        </h3>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Deluxe Room</span>
                                <span>80%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div className="bg-yellow-500 h-2 rounded w-[80%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Suite Room</span>
                                <span>60%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div className="bg-blue-500 h-2 rounded w-[60%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Standard Room</span>
                                <span>40%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div className="bg-red-400 h-2 rounded w-[40%]"></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}