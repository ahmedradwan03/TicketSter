import { LoginForm } from '@/components/LoginForm/LoginForm';
import Image from 'next/image';
import React from 'react';

const Login = () => {
    return (
        <section className="container m-auto px-7 h-screen flex items-center flex-col relative">
            <Image src="/hero.jpg" alt="Background Image" layout="fill" objectFit="cover" objectPosition="center" priority />
            <div className="absolute inset-0 bg-black opacity-80 "></div>
            <div className="relative z-10 text-center text-white mt-[100px]">
                <h1 className="text-3xl font-bold mb-5">Login To Your Account</h1>
                <LoginForm />
            </div>
        </section>
    );
};

export default Login;
