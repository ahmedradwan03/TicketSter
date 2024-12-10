'use client';

const ErrorComponent = ({ error }: { error: { message: string } }) => {
    return (
        <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Error</h2>
            <p>{error.message || 'An unknown error occurred.'}</p>
        </div>
    );
};

export default ErrorComponent;
