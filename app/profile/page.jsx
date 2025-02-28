'use client'

import { Users, Heart, User, UserPen, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import $api from '../../http'

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        $api.get('/users')
            .then((r) => console.log(r.data))
            .catch((err) => console.error(err.response))
    }, [])

    return (
        <div className="auth-page min-h-[100vh]">
            <div className="max-w-[1440px] w-full mx-auto mt-[130px] text-[#f0f0f5] flex gap-5">
                <aside className="bg-black/30 backdrop-blur-2xl min-h-[300px] px-5 py-10 flex-1/4 rounded-md">
                    <nav className="flex flex-col gap-6 text-2xl">
                        <a
                            href="#"
                            className="flex items-center gap-3 text-[#f0f0f5] hover:text-blue-400"
                        >
                            <User /> Profile
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 text-[#f0f0f5] hover:text-blue-400"
                        >
                            <Heart /> Liked Posts
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 text-[#f0f0f5] hover:text-blue-400"
                        >
                            <Users /> Friends
                        </a>
                    </nav>
                </aside>
                <main className="bg-black/30 backdrop-blur-2xl min-h-[300px] px-5 py-5 flex-3/4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl">Profile</h2>
                        <button
                            className="flex items-center gap-5 px-5 bg-blue-900 h-[50px] rounded-md cursor-pointer"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? (
                                <div className="flex gap-4">
                                    <Save /> Save
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <UserPen />
                                    Edit
                                </div>
                            )}
                        </button>
                    </div>

                    {profile ? (
                        <div className="mt-4 space-y-3">
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                            />
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                value={profile.phone}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                            />
                            <input
                                type="email"
                                className="w-full p-2 bg-gray-700 rounded"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                            />
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                value={profile.specialisation}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        specialisation: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    )
}

export default ProfilePage
