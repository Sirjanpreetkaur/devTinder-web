import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';


const Connections = () => {
    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(",,,res", res.data?.data);
            dispatch(addConnections(res.data?.data));

        }
        catch (err) {
            console.log(",,,err", err)

        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) return;
    if (connections.length === 0) return <h1 className='text-3xl font-bold'>No connections found</h1>;

    return (
        <div className="min-h-screen px-4 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white-800">
                        My Connections
                    </h1>
                </div>

                {/* Connections List */}
                {connections && connections.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {connections.map((connection) => {
                            const {
                                _id,
                                firstName,
                                lastName,
                                photoUrl,
                                about,
                                age,
                                gender,
                            } = connection;

                            return (
                                <div
                                    key={_id}
                                    className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Profile Image */}
                                    <img
                                        src={photoUrl || "https://placehold.co/100x100?text=User"}
                                        alt={`${firstName} ${lastName}`}
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-50"
                                    />

                                    {/* Name */}
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {firstName} {lastName}
                                    </h2>

                                    {/* Age and Gender */}
                                    {(age || gender) && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {age && `${age} years`}
                                            {age && gender && " · "}
                                            {gender}
                                        </p>
                                    )}

                                    {/* About */}
                                    <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-3">
                                        {about || "No bio available."}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-5">
                            <span className="text-4xl">👥</span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            No connections yet
                        </h2>

                        <p className="text-gray-500 mt-2 max-w-sm">
                            Your connections will appear here once you connect with people.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Connections
