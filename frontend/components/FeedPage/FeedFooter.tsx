import useFeedContext from "../FeedContext";
import {useState} from "react";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";


const FeedFooter = () => {
    const [newPrompt, setNewPrompt] = useState<string>('');
    const {feedState, feedDispatch} = useFeedContext();

    const onPromptSubmit = () => {
        feedDispatch({
            type: FEED_ACTIONS.ADD_USER_PROMPT_TO_HISTORY,
            payload: {userPrompt: newPrompt}
        })
        setNewPrompt('');
    }

    return (
        <div
            className="fixed bottom-0 inset-x-0 z-50 h-20 flex justify-center items-center bg-white overflow-hidden"
            style={{opacity: feedState?.dragState && feedState.dragState.magnitude > 0 ? 0 : 1}}
        >
            <div className="grid grid-cols-4 items-center justify-center border-t border-black">
                <div className="col-span-3">
                    <span className="font-plex font-normal">
                    <input id="new_prompts"
                           className="text-black bg-white font-normal w-64 h-10 pl-3 focus:outline-none flex items-center border-gray-300 rounded"
                           placeholder="Enter your prompt here"
                           value={newPrompt}
                           onChange={(e) => setNewPrompt(e.target.value)}
                           autoComplete="off"
                    />
                    </span>
                </div>

                <div className="text-center col-span-1 pl-2">
                    <button
                        className="w-fit h-fit border border-black bg-black hover:bg-white text-white hover:text-black px-1"
                        onClick={onPromptSubmit}
                    >
                        <div className="font-jura ">
                            Propose
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedFooter;