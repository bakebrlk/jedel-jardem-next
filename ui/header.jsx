'use client'

import { useState } from 'react'
import Image from 'next/image'
import Logo from '../app/logo.svg'
import { User, LogOut, UserCircle2 } from 'lucide-react'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('access')
        window.location.href = '/auth'
    }

    const handleProfile = () => {
        window.location.href = '/profile'
    }

    return (
        <header className="bg-black/30 backdrop-blur-2xl fixed w-[100vw] px-4 z-50 top-0">
            <div className="max-w-[1440px] mx-auto py-3 text-[#f0f0f5] flex items-center justify-between relative">
                <div className="text-4xl font-bold flex items-end">
                    <Image src={Logo} width={70} height={70} alt="Logo" />
                    <h1 className="py-2 ml-4">Jedel Jardem</h1>
                </div>
                <input
                    type="text"
                    className="border border-[#928fab] bg-[#010817] px-3 py-2 text-[#f0f0f5] placeholder:text-[#94a3b8] placeholder:text-xl max-w-[400px] w-full rounded-md"
                    placeholder="Search"
                />
                <div className="relative">
                    <div
                        className="bg-white/30 size-[70px] rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <User size={40} />
                    </div>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#010817] text-white shadow-lg rounded-md overflow-hidden">
                            <button className="flex items-center px-4 py-3 w-full hover:bg-white/20 transition">
                                <UserCircle2 className="mr-2" /> Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-3 w-full text-red-500 hover:bg-red-500/20 transition"
                            >
                                <LogOut className="mr-2" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
