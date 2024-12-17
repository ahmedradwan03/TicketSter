import { SignupForm } from '@/components/SignupForm/SignupForm';
import Image from 'next/image';
import React from 'react';

export default function page() {
    return (
        <section className="fix-height container m-auto px-7  h-screen flex items-center  flex-col relative">
            <div className="absolute inset-0 z-0">
                <Image src="/hero.jpg" alt="Background Image" layout="fill" objectFit="cover" objectPosition="center" priority />
                <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            </div>
            <div className="relative z-10 text-center text-white mt-[100px]">
                <h1 className="text-3xl font-bold   mb-5">Create New Account</h1>
                <SignupForm />
            </div>
        </section>
    );
}
