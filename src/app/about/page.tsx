import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">About TicketSter</h1>
            <p className="text-lg mb-6 text-center text-gray-600">
                Welcome to TicketSter, your one-stop solution for booking tickets to the most exciting football matches around the globe!
            </p>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                    At TicketSter, we aim to connect football fans with unforgettable experiences by providing easy access to tickets for their favorite matches. We believe that every fan deserves to
                    witness the thrill of live football, and we are dedicated to making that happen.
                </p>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-primary">What We Offer</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Wide range of football matches from leagues around the world</li>
                    <li>Secure and straightforward ticket booking process</li>
                    <li>Exclusive deals and discounts for loyal customers</li>
                    <li>24/7 customer support for all your booking needs</li>
                </ul>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Why Choose TicketSter?</h2>
                <p className="text-gray-700 mb-4">
                    Choosing TicketSter means you can enjoy a hassle-free experience when booking your football tickets. Our platform is designed to be user-friendly, allowing you to find and secure
                    your tickets in just a few clicks. With our commitment to customer satisfaction, we strive to make your football experience unforgettable.
                </p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Join Us!</h2>
                <p className="text-gray-700 mb-4">Join us in celebrating the beautiful game! Follow us on social media and stay updated with the latest ticket releases and exclusive offers.</p>
                <a href="/contact" className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-[#2a6d0c] transition duration-300">
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default AboutPage;
