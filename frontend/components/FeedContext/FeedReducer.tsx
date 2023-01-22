import {FeedImageType, FeedState} from "./FeedContext";

export const FEED_ACTIONS = {
    SET_FEED_HISTORY: 'SET_FEED_HISTORY',
    SET_CURRENT_IMAGE: 'SET_CURRENT_IMAGE',
    SET_HISTORY_AND_CURRENT_IMAGE: 'SET_HISTORY_AND_CURRENT_IMAGE',
    SET_DRAG_STATE: 'SET_DRAG_STATE',
}
const background = {
    "Up": "i like it\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Left": "it inspires me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Right": "it surprises me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Down": "it terrifies me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
}
export const feedReducer = (state: FeedState, action: any) => {
    switch (action.type) {
        case FEED_ACTIONS.SET_FEED_HISTORY:
            return {...state, feedHistory: action.payload.feedHistory};
        case FEED_ACTIONS.SET_CURRENT_IMAGE:
            const currentImage = action.payload.currentImage as FeedImageType;
            if (!currentImage) return state;

            let feedHistory = state.feedHistory ? state.feedHistory : [];
            const imageInx = feedHistory.findIndex((i) => i.id === currentImage.id);

            if (imageInx !== -1) {
                // update existing image
                feedHistory = [...feedHistory.slice(0, -1), currentImage];
            } else {
                // remove the oldest image if we have more than 10
                if (feedHistory.length > 10) {
                    feedHistory.shift();
                }
                feedHistory = [...feedHistory, currentImage];
            }
            return {...state, currentImage: currentImage, feedHistory: feedHistory};

        case FEED_ACTIONS.SET_HISTORY_AND_CURRENT_IMAGE:
            return {...state, feedHistory: action.payload.feedHistory, currentImage: action.payload.currentImage};
        case FEED_ACTIONS.SET_DRAG_STATE:
            if (action.payload.isDragging) {
                // TODO: set decision when drag is done
                const text = background[action.payload.direction as keyof typeof background];

                return {
                    ...state,
                    dragState: {
                        direction: action.payload.direction,
                        magnitude: action.payload.magnitude,
                        backgroundText: text,
                        isDragging: action.payload.isDragging
                    }
                };
            } else {
                return {
                    ...state,
                    dragState: {
                        direction: '',
                        magnitude: 0,
                        backgroundText: '',
                        isDragging: false
                    }
                };
            }

        default:
            return state;
    }
}