import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import customerData from "../../data/Customers.json";

export default function GuestDetail() {

  const { id } = useParams();

  const guest = customerData.find((g) => g.id === id);

  return (
    <div className="p-4">

      <PageHeader
        title="Guest Detail"
        breadcrumb={["Guests", guest?.name]}
      />

      <div className="bg-white rounded-2xl shadow-sm p-8">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={`https://i.pravatar.cc/150?u=${guest?.id}`}
            alt={guest?.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-100"
          />

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              {guest?.name}
            </h1>

            <p className="text-gray-400 mt-1">
              Guest ID: {guest?.id}
            </p>

            <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
              guest?.loyalty === "Gold"
                ? "bg-yellow-100 text-yellow-600"
                : guest?.loyalty === "Silver"
                ? "bg-gray-200 text-gray-600"
                : "bg-orange-100 text-orange-500"
            }`}>
              {guest?.loyalty} Member
            </span>

          </div>

        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">
              Email Address
            </p>

            <h3 className="font-semibold text-gray-700">
              {guest?.email || "guest@email.com"}
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">
              Phone Number
            </p>

            <h3 className="font-semibold text-gray-700">
              {guest?.phone || "+62 812345678"}
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">
              Current Room
            </p>

            <h3 className="font-semibold text-gray-700">
              Deluxe Room
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">
              Status
            </p>

            <h3 className="font-semibold text-green-600">
              Active Guest
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}