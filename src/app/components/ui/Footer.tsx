export const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 text-gray-500 p-6 shadow-lg text-sm rounded-lg">
            <div className="flex justify-between">
                <div className="flex self-center">
                    <span>© {new Date().getFullYear()} DentalRobot. </span>
                    <span>All rights reserved.</span>
                </div>
                <div className="">
                    <a >
                        Dev Control Central
                    </a>
                    <a >Dev Incidents
                    </a>
                </div>
            </div>
        </footer>
    );
}