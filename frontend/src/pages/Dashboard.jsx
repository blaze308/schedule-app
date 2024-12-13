import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
                Welcome to the Scheduling App
            </h1>
            <p className="text-lg text-gray-600 mb-12">
                Manage your meetings with ease and efficiency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">
                        Schedule a Meeting
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Plan new meetings with your colleagues or clients effortlessly.
                    </p>
                    <Link
                        to="/schedule"
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Go to Schedule
                    </Link>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-green-600">
                        Manage Meetings
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Edit or cancel your scheduled meetings with ease.
                    </p>
                    <Link
                        to="/manage"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg shadow hover:bg-green-600 transition duration-300"
                    >
                        Go to Manage
                    </Link>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600">
                        View Meetings
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        See all your upcoming meetings at a glance.
                    </p>
                    <Link
                        to="/view"
                        className="bg-purple-500 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-600 transition duration-300"
                    >
                        Go to View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
