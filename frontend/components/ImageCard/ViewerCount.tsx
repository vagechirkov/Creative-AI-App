'use client';

import {BsFillEyeFill} from "react-icons/bs";

interface ViewerCountProps {
    count: number;
}

const ViewerCount = ({count}: ViewerCountProps) => {
    return (
        <div className="container flex flex-row items-center">
            <span className="font-jura font-bold text-xs pr-1"> {count} </span>
            {/* eye icon */}
            <BsFillEyeFill/>
        </div>
    );
}

export default ViewerCount;