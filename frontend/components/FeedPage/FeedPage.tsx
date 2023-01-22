'use client';

import useFeedContext from "../FeedContext";
import ImageFeed from "../ImageFeed";
import {FC} from "react";
import FeedHeader from "../FeedImages/FeedHeader";
import BackgroundText from "../FeedImages/BackgroundText";
import FeedFooter from "../FeedImages/FeedFooter";


const FeedPage: FC = () => {
    const {feedState, feedDispatch} = useFeedContext();

    return (
        <>
            <FeedHeader/>
            <BackgroundText/>
            <ImageFeed/>
            {/*<FeedFooter/>*/}
        </>
    );

}

export default FeedPage;