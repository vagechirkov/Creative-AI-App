import useFeedContext from "../FeedContext";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";


const FeedHeader = () => {
    const {feedState, feedDispatch} = useFeedContext();

    const changeFeedState = () => {
        feedDispatch({
            type: FEED_ACTIONS.SET_FEED_TYPE,
            payload: {feedType: feedState?.feedType === "live" ? "scrolling" : "live",}
        });
    }


    return (
        <div
            className="fixed top-0 inset-x-0 z-50 h-[110px] py-2 flex justify-center items-center bg-white overflow-hidden"
            style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
        >
            <div className="grid grid-cols-2 pb-2 w-[300px]">
                <div className="font-six_caps uppercase text-center text-5xl col-span-2">
                    artificial culture
                </div>
                <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg pr-2">
                             {feedState?.currentImage && feedState?.currentImage.n_artists ?
                                 feedState.currentImage.n_artists : 10}
                        </span>
                    <span className="font-jura font-bold uppercase ">
                            artists
                        </span>
                </div>
                <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg pr-2">
                               {feedState?.currentImage && feedState?.currentImage.id ?
                                   feedState.currentImage.id : 10}
                        </span>
                    <span className="font-jura font-bold uppercase ">
                            artworks
                        </span>

                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 justify-items-center">
                        <div className="col-span-2 animate-pulse">
                            <button className="w-fit h-fit px-4 text-center bg-black text-white"
                                    onClick={changeFeedState}>
                                <div className="font-jura">
                                    {feedState?.feedType === "live" ? "Show History" : "Back to Live"}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FeedHeader;