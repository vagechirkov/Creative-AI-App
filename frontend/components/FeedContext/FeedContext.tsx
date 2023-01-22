'use client';

import {ImageWithInfoProps} from "../ImageCard/ImageWithInfo";
import {createContext, useContext, useReducer} from "react";
import {DragState} from "../ImageDraggable/ImageDraggable";


export const FEED_ACTIONS = {
    SET_FEED_HISTORY: 'SET_FEED_HISTORY',
    SET_CURRENT_IMAGE: 'SET_CURRENT_IMAGE',
    SET_HISTORY_AND_CURRENT_IMAGE: 'SET_HISTORY_AND_CURRENT_IMAGE',
    SET_DRAG_STATE: 'SET_DRAG_STATE',
}

type FeedState = {
    feedHistory: ImageWithInfoProps[] | undefined;
    currentImage: ImageWithInfoProps | undefined;
    dragState: DragState;
}

export type FeedContextType = {
    feedState: FeedState | undefined;
    feedDispatch: (action: any) => void;
}

export const FeedContext = createContext<FeedContextType | null>(null);


const initialState: FeedState = {
    feedHistory: undefined,
    currentImage: undefined,
    dragState: {direction: '', magnitude: 0, backgroundText: '', isDragging: false},
}

const feedInitializer = (initialState: FeedState) => {
    // JSON.parse(localStorage.getItem(LOCAL_STORAGE_NETWORK_STATE_KEY)) ||
    return initialState;
}

export const FeedContextProvider = (({children}: any) => {
    const [state, dispatch] = useReducer(feedReducer, initialState, feedInitializer);

    return (
        <FeedContext.Provider value={{feedState: state, feedDispatch: dispatch}}>
            {children}
        </FeedContext.Provider>
    )
});

const background = {
    "Up": "i like it\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Left": "it inspires me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Right": "it surprises me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Down": "it terrifies me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
}


const feedReducer = (state: FeedState, action: any) => {
    switch (action.type) {
        case FEED_ACTIONS.SET_FEED_HISTORY:
            return {...state, feedHistory: action.payload.feedHistory};
        case FEED_ACTIONS.SET_CURRENT_IMAGE:
            return {...state, currentImage: action.payload.currentImage};
        case FEED_ACTIONS.SET_HISTORY_AND_CURRENT_IMAGE:
            return {...state, feedHistory: action.payload.feedHistory, currentImage: action.payload.currentImage};
        case FEED_ACTIONS.SET_DRAG_STATE:
            if (action.payload.isDragging) {
                const text = background[action.payload.direction as keyof typeof background];

                return {...state,
                    dragState: {
                        direction: action.payload.direction,
                        magnitude: action.payload.magnitude,
                        backgroundText: text,
                        isDragging: action.payload.isDragging
                    }
                };
            } else {
                return {...state,
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


const useFeedContext = () => useContext(FeedContext) as FeedContextType;

export default useFeedContext;