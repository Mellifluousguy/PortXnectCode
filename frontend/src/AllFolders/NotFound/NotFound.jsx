import React from "react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate(); // Hook to navigate back

    return (
        <div className="bg-cloud-gray h-lvh flex flex-col justify-center select-none gap-4 items-center">
            <h1 className=" text-brand !p-4 text-8xl font-bold rounded-md">404</h1>
            <p className="text-xl">Oops! The page you're looking for doesn't exist.</p>
            <button className="bg-brand cursor-pointer !px-4 !py-2 rounded-sm text-white" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default NotFound;
