import { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rooms = [
    {id: "RM-001", name: "Deluxe Room", price: "Rp 750.000", status: "Available", image: "img/deluxe.jpg"},
    {id: "RM-002", name: "Suite Room", price: "Rp 1.500.000", status: "Booked", image: "img/suite.jpg"},
    {id: "RM-003", name: "Standard Room", price: "Rp 500.000", status: "Available", image: "img/standard.jpg"}
  ];

  return (
    <div className="p-4">
      <PageHeader title="Rooms" breadcrumb="Room List">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600" >
          + Add Room
        </button>
      </PageHeader>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6">Add New Room</h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Room Name"
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Price"
                className="w-full border p-3 rounded-xl"
              />

              <select className="w-full border p-3 rounded-xl">
                <option>Available</option>
                <option>Booked</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>

                <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ROOMS GRID */}
      <div className="grid md:grid-cols-3 gap-5 mt-6">

        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm overflow-hidden">

            {/* IMAGE */}
            <img src={room.image} className="w-full h-40 object-cover" />

            {/* CONTENT */}
            <div className="p-4">

              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  room.status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}>
                  {room.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-1">{room.id}</p>

              <p className="mt-3 font-bold text-yellow-600">
                {room.price}
              </p>

              <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                View Details
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}