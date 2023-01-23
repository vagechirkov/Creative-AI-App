import useFeedContext from "../FeedContext";


const BackgroundText = () => {
    const { feedState } =useFeedContext();

    return (
        <div
            className="absolute -bottom-52 inset-x-0"
            style={{opacity: feedState?.dragState && feedState.dragState.magnitude}}
        >
            <div className="font-six_caps text-justify text-6xl underline leading-[76px] break-all ">
                {feedState?.dragState && feedState.dragState.backgroundText}
            </div>
        </div>
    );
}

export default BackgroundText;