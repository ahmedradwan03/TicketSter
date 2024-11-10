import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-center mb-6">If you have any questions about booking tickets for football matches, feel free to reach out!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Name
                            </label>
                            <input type="text" id="name" className="w-full border border-gray-300 p-2 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input type="email" id="email" className="w-full border border-gray-300 p-2 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea id="message" rows={4} className="w-full border border-gray-300 p-2 rounded" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
                    <p className="mb-2">
                        <strong>Email:</strong> support@ticketster.com
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> +1 (234) 567-8900
                    </p>
                    <p className="mb-2">
                        <strong>Address:</strong> 123 Stadium Ave, Football City, FC 12345
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-center mb-4">Visit Us</h2>
                <div className="w-full h-64 bg-gray-300 rounded-lg">
                    <iframe
                        title="Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093033!2d144.953736315319!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f4d5ab3%3A0x3b2d4eecab7402f2!2sFootball%20City!5e0!3m2!1sen!2sau!4v1601581291548!5m2!1sen!2sau"
                        width="100%"
                        height="100%"
                        allowFullScreen={false}
                        loading="lazy"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
