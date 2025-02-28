'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ArrowRight, TriangleAlert, LogIn } from 'lucide-react'
import Logo from '../logo.svg'
import Image from 'next/image'
import $api from '../../http'
import { cn } from '../../utils'
import { redirect } from 'next/navigation'

const validationSchema = {
    signUp: Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .min(6, 'Phone must be at least 6 characters')
            .required('Phone is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    }),
    login: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    }),
}

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
        },
        validationSchema: isSignUp
            ? validationSchema.signUp
            : validationSchema.login,
        onSubmit: async (values) => {
            try {
                const endpoint = isSignUp ? '/auth/register' : '/auth/login'
                const payload = isSignUp
                    ? { ...values, role: 'doctor' }
                    : { email: values.email, password: values.password }

                const response = await $api.post(endpoint, payload)
                if (!isSignUp) {
                    localStorage.setItem('access', response.data.access)
                }
                window.location.href = '/posts'
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <div className="auth-page h-screen flex items-center justify-center px-4 py-12">
            <div className="flex w-full max-w-md space-y-8">
                <form
                    className="flex flex-col w-full gap-1 mt-8 space-y-4 bg-transparent border-none shadow-transparent"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex flex-col items-center justify-center">
                        <Image src={Logo} alt="Logo" height={94} width={94} />
                        <h2 className="text-[#f0f0f5] mt-6 text-3xl font-extrabold text-center">
                            {isSignUp ? 'Create Account' : 'Login'}
                        </h2>
                    </div>

                    <div className="-space-y-px rounded-md">
                        {isSignUp && (
                            <div className="relative">
                                <input
                                    className="flex h-10 w-full border border-[#48455e] bg-[#010817] px-3 py-2 text-[#f0f0f5] placeholder:text-[#94a3b8] focus-visible:ring-2 rounded-t-md"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <TriangleAlert
                                        className="absolute top-2 right-2"
                                        color="red"
                                    />
                                )}
                            </div>
                        )}

                        <div className="relative">
                            <input
                                className={cn(
                                    'flex h-10 w-full border border-[#48455e] bg-[#010817] px-3 py-2 text-[#f0f0f5] placeholder:text-[#94a3b8] focus-visible:ring-2',
                                    !isSignUp && 'rounded-t-md'
                                )}
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <TriangleAlert
                                    className="absolute top-2 right-2"
                                    color="red"
                                />
                            )}
                        </div>

                        {isSignUp && (
                            <div className="relative">
                                <input
                                    className="flex h-10 w-full border border-[#48455e] bg-[#010817] px-3 py-2 text-[#f0f0f5] placeholder:text-[#94a3b8] focus-visible:ring-2"
                                    type="text"
                                    placeholder="Phone"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phoneNumber &&
                                    formik.errors.phoneNumber && (
                                        <TriangleAlert
                                            className="absolute top-2 right-2"
                                            color="red"
                                        />
                                    )}
                            </div>
                        )}

                        <div className="relative">
                            <input
                                className="flex h-10 w-full border border-[#48455e] bg-[#010817] px-3 py-2 text-[#f0f0f5] placeholder:text-[#94a3b8] focus-visible:ring-2 rounded-b-md"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <TriangleAlert
                                        className="absolute top-2 right-2"
                                        color="red"
                                    />
                                )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-8 bg-indigo-800 h-10 font-semibold text-white rounded-2xl cursor-pointer"
                    >
                        {isSignUp ? 'Sign Up' : 'Login'} <ArrowRight />
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-5 bg-gray-700 h-10 font-semibold text-white rounded-2xl cursor-pointer"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp
                            ? 'Already have an account? Login'
                            : 'New here? Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}
