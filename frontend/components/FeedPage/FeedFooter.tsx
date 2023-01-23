import useFeedContext from "../FeedContext";


const FeedFooter = () => {
    const { feedState} =useFeedContext();

    return (
        <div
            className="fixed bottom-0 inset-x-0 z-50 h-16 flex justify-center items-center bg-gray-200 overflow-hidden"
            style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
        >
            some footer
        </div>
    );
}

export default FeedFooter;