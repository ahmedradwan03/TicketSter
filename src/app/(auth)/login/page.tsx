import { LoginForm } from '@/components/LoginForm';
import React from 'react';

const login = () => {
    return (
        <section className="fix-height container  m-auto px-7 flex items-center justify-center flex-col">
            <div className='text-center'>
                <h1 className="text-3xl font-bold  text-gray-800 mb-5">Login To Your Account</h1>
                <LoginForm />
            </div>
        </section>
    );
}
export default login;
