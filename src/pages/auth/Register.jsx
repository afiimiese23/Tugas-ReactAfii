import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

export default function Register() {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dataForm.password !== dataForm.confirmPassword) {
            alert("Password tidak sama");
            return;
        }

        try {
            // cek email sudah ada atau belum
            const { data: existingUser } = await supabase
                .from("user")
                .select("*")
                .eq("email", dataForm.email);

            if (existingUser.length > 0) {
                alert("Email sudah digunakan");
                return;
            }

            const { error } = await supabase
                .from("user")
                .insert([
                    {
                        username: dataForm.username,
                        email: dataForm.email,
                        password: dataForm.password,
                        role: "user",
                    },
                ]);

            if (error) {
                alert(error.message);
                return;
            }

            alert("Registrasi berhasil!");

            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Join Stayzone 🏨
            </h2>

            <form onSubmit={handleSubmit}>

                {/* USERNAME */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>

                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={dataForm.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="John Doe"
                            required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="guest@luxurystay.com"
                            required
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="********"
                            required
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={dataForm.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="********"
                            required
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#113D32] hover:bg-[#0D3027] text-white rounded-2xl py-3 font-semibold shadow-lg shadow-emerald-900/10"
                >
                    Register
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <span
                    className="text-green-600 cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Login
                </span>
            </p>
        </div>
    );
}