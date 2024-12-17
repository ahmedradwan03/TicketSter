import Image from 'next/image';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <Image src="/hero.jpg" alt="Hero Image" layout="fill" objectFit="cover" className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className=" flex flex-col ">
                    <h1 className="text-primary  text-3xl md:text-5xl font-bold text-center">Welcome to TicketSter</h1>
                </div>
            </div>
        </div>
    );
};
export default Hero;
