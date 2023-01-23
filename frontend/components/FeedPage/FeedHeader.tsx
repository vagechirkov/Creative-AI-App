import useFeedContext from "../FeedContext";


const FeedHeader = () => {
    const {feedState} = useFeedContext();

    return (
        <div
            className="fixed top-0 inset-x-0 z-50 h-20 flex justify-center items-center bg-white overflow-hidden"
            style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
        >
            <div className="grid grid-cols-2">
                <div className="font-six_caps uppercase text-center text-4xl col-span-2">
                    creative artificial intelligence
                </div>
                <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg">
                             {feedState?.currentImage && feedState?.currentImage.n_artists ?
                                 feedState.currentImage.n_artists : 10}
                        </span>
                    <span className="font-jura font-bold uppercase ">
                            artists
                        </span>
                </div>
                <div className="text-center col-span-1">
                        <span className="font-plex font-bold uppercase text-lg">
                               {feedState?.currentImage && feedState?.currentImage.id ?
                                   feedState.currentImage.id : 10}
                        </span>
                    <span className="font-jura font-bold uppercase ">
                            artworks
                        </span>

                </div>
            </div>
        </div>
    );
}

export default FeedHeader;