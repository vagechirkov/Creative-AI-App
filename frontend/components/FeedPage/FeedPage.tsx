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
                className="sticky top-0 z-50 h-20 flex justify-center items-center bg-white"
                style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
            >
                <div className="grid grid-cols-2">
                    <div className="font-six_caps uppercase text-center text-4xl col-span-2">
                        creative artificial intelligence
                    </div>
                    <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg">
                             42
                        </span>
                        <span className="font-jura font-bold uppercase ">
                            artists
                        </span>
                    </div>
                    <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg">
                             597
                        </span>
                        <span className="font-jura font-bold uppercase ">
                            artworks
                        </span>

                    </div>
                </div>
            </div>
            {/* Background image */}
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
            <div
                className="sticky bottom-0 z-50 h-16 flex justify-center items-center bg-gray-200"
                style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
            >
                some footer
            </div>
        </div>
    );

}

export default FeedPage;