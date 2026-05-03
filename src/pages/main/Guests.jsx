import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import customerData from "../../data/Customers.json";

export default function Guests() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      
      <PageHeader title="Guests" breadcrumb="Guest List">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
        >
          + Add New Guest
        </button>
      </PageHeader>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Guest
            </h2>

            <form className="space-y-4">
              
              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
                  placeholder="Guest name"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
                  placeholder="guest@email.com"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
                  placeholder="+62..."
                />
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-600"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-50 uppercase text-xs text-gray-400 font-semibold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Guest Name</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {customerData.map((cust) => (
              <tr key={cust.id} className="border-t">
                <td className="p-4 font-semibold text-gray-700">
                  {cust.id}
                </td>
                <td className="p-4">{cust.name}</td>
                <td className="p-4 text-yellow-600 font-semibold">
                  {cust.loyalty}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}