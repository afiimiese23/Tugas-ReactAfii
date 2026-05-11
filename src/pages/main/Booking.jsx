import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import orderData from "../../data/Orders.json";

export default function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      
      <PageHeader title="Bookings" breadcrumb="Booking List">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
        >
          + Add New Booking
        </button>
      </PageHeader>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Booking
            </h2>

            <form className="space-y-4">

              {/* BOOKING ID */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Booking ID
                </label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3"
                  placeholder="#BOOK-001"
                />
              </div>

              {/* GUEST NAME */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Guest Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3"
                  placeholder="Guest name"
                />
              </div>

              {/* ROOM TYPE */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Room Type
                </label>
                <select className="w-full border rounded-xl p-3 bg-white outline-none">
                  <option>Standard Room</option>
                  <option>Deluxe Room</option>
                  <option>Suite Room</option>
                </select>
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Status
                </label>
                <select className="w-full border rounded-xl p-3 bg-white outline-none">
                  <option>Pending</option>
                  <option>Checked-in</option>
                  <option>Checked-out</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-gray-500"
                >
                  Cancel
                </button>

                <button 
                  type="submit" 
                  className="bg-yellow-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-600"
                >
                  Save Booking
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
            <tr>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>

          <tbody>
            {orderData.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4 font-semibold">{order.id}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4 font-semibold text-gray-800">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}