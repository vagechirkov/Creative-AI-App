'use client';

import useFeedContext from "../FeedContext";
import ImageFeed from "../ImageFeed";
import {FC} from "react";


const FeedPage: FC = () => {
    const {feedState, feedDispatch} = useFeedContext();

    return (
        <div>
            {/* Header */}
            <div
                className="absolute -bottom-52 inset-x-0"
                style={{opacity: feedState?.dragState && feedState.dragState.magnitude}}
            >
                <div className="font-six_caps text-justify text-6xl underline leading-[76px] break-all ">
                    {feedState?.dragState && feedState.dragState.backgroundText}
                </div>
            </div>
            <ImageFeed/>
            {/* Footer */}
        </div>
    );

}

export default FeedPage;