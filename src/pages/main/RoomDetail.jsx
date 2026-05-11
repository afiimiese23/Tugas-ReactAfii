import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function RoomDetail() {

    const { id } = useParams();

    const rooms = [
        {
            id: "RM-001",
            name: "Deluxe Room",
            price: "Rp 750.000",
            status: "Available",
            image: "/img/deluxe.jpg",
            description:
                "Luxury deluxe room with king-size bed and balcony.",
        },
        {
            id: "RM-002",
            name: "Suite Room",
            price: "Rp 1.500.000",
            status: "Booked",
            image: "/img/suite.jpg",
            description:
                "Premium suite room with living room and minibar.",
        },
        {
            id: "RM-003",
            name: "Standard Room",
            price: "Rp 500.000",
            status: "Available",
            image: "/img/standard.jpg",
            description:
                "Comfortable standard room for budget travelers.",
        },
    ];

    const room = rooms.find((r) => r.id === id);

    return (
        <div className="p-4">
            <PageHeader title="Room Detail" breadcrumb={["Rooms", room?.name]} />
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                <img src={room?.image} alt={room?.name} className="w-full h-[400px] object-cover"/>

                <div className="p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">{room?.name} </h1>
                            <p className="text-gray-400 mt-1"> Room ID: {room?.id} </p>
                        </div>

                        <span className={`px-4 py-2 rounded-full text-sm ${ room?.status === "Available"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-500" }`}> {room?.status}
                        </span>

                    </div>
                    <p className="mt-6 text-gray-600 leading-relaxed"> {room?.description} </p>
                    <div className="mt-6">
                        <h2 className="text-yellow-600 text-2xl font-bold"> {room?.price} </h2>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            Free WiFi
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            Air Conditioner
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            Breakfast Included
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}