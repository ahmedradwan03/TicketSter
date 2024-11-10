import { SignupForm } from '@/components/SignupForm';

export default function page() {
    return (
        <section className="fix-height container  m-auto px-7 flex items-center justify-center flex-col">
            <div className='text-center'>
                <h1 className="text-3xl font-bold  text-gray-800 mb-5">Create New Account</h1>
                <SignupForm />
            </div>
        </section>
    );
}
