import React, { useEffect, useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";

import { supabase } from "../../lib/supabase";

export default function User() {
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("All User");

    const tabs = ["All User", "Admin", "User"];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .order("id_user");

        if (error) {
            console.log(error);
            return;
        }

        setUsers(data);
    };

    const filteredUsers =
        activeTab === "Admin"
            ? users.filter((u) => u.role === "admin")
            : activeTab === "User"
            ? users.filter((u) => u.role === "user")
            : users;

    const tableHeaders = [
        <input
            type="checkbox"
            className="w-4 h-4 rounded accent-[#3AB449]"
        />,
        "Username",
        "Email",
        "Password",
        "Role",
        "Status",
        "",
    ];

    return (
        <Container className="bg-[#EEEEEE] min-h-screen py-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
                <Tabs
                    defaultValue="All User"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <div className="flex justify-between items-center mb-8 gap-4">
                        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="rounded-none border-b-2 border-transparent px-0 pb-4 text-sm font-bold
                                    data-[state=active]:border-[#3AB449]
                                    data-[state=active]:text-[#113D32]
                                    data-[state=active]:bg-transparent
                                    text-gray-400 shadow-none"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="flex gap-3">
                            <Button className="px-6 py-2.5 shadow-lg shadow-green-900/20">
                                + New User
                            </Button>

                            <Button
                                type="secondary"
                                className="bg-white border-gray-200 px-6 py-2.5 flex items-center gap-2"
                            >
                                <span className="text-[#113D32]">
                                    {filteredUsers.length} Users
                                </span>

                                <FaChevronDown className="text-[#3AB449] text-[10px]" />
                            </Button>
                        </div>
                    </div>
                </Tabs>
            </div>

            {/* TABLE */}
            <Card className="p-0 overflow-hidden border-none shadow-sm">
                <Table headers={tableHeaders}>
                    {filteredUsers.map((user) => (
                        <tr
                            key={user.id_user}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                            <td className="p-5 text-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded accent-[#3AB449]"
                                />
                            </td>

                            <td className="p-5">
                                <div className="flex items-center gap-4">
                                    <Avatar name={user.username} />

                                    <div>
                                        <p className="font-bold text-[#113D32] text-sm">
                                            {user.username}
                                        </p>

                                        <p className="text-[10px] text-[#3AB449] font-bold">
                                            ID : {user.id_user}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="p-5 text-[#6E6E6E] font-medium">
                                {user.email}
                            </td>

                            <td className="p-5 text-[#6E6E6E] font-medium">
                                {user.password}
                            </td>

                            <td className="p-5">
                                <Badge
                                    type={
                                        user.role === "admin"
                                            ? "success"
                                            : "warning"
                                    }
                                >
                                    {user.role}
                                </Badge>
                            </td>

                            <td className="p-5">
                                <Badge type="success">
                                    Active
                                </Badge>
                            </td>

                            <td className="p-5 text-center text-gray-300 cursor-pointer hover:text-[#113D32]">
                                <FaEllipsisH />
                            </td>
                        </tr>
                    ))}
                </Table>
            </Card>

            {/* PAGINATION */}
            <div className="flex justify-between items-center mt-6 text-[11px] text-[#6E6E6E] font-semibold px-2">
                <p>
                    Showing {filteredUsers.length} user(s)
                </p>

                <div className="flex gap-2">
                    <Button
                        type="secondary"
                        className="bg-white border-gray-200 px-4 py-2"
                    >
                        Prev
                    </Button>

                    <Button className="px-4 py-2">
                        1
                    </Button>

                    <Button
                        type="secondary"
                        className="bg-white border-gray-200 px-4 py-2"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Container>
    );
}