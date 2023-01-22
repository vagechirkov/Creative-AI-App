'use client';

import {ImageWithInfoProps} from "../ImageCard/ImageWithInfo";
import {createContext, ReactNode, useContext, useReducer} from "react";
import {DragState} from "../ImageFeed/ImageFeed";

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

export const FeedContext = createContext<FeedContextType|null>(null);


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

const feedReducer = (state: FeedState, action: any) => {
    switch (action.type) {
        case FEED_ACTIONS.SET_FEED_HISTORY:
            return {...state, feedHistory: action.payload.feedHistory};
        case FEED_ACTIONS.SET_CURRENT_IMAGE:
            return {...state, currentImage: action.payload.currentImage};
        case FEED_ACTIONS.SET_HISTORY_AND_CURRENT_IMAGE:
            return {...state, feedHistory: action.payload.feedHistory, currentImage: action.payload.currentImage};
        case FEED_ACTIONS.SET_DRAG_STATE:
            return {...state, dragState: action.payload.dragState};
        default:
            return state;
    }
}


export const useFeedContext = () => useContext(FeedContext) as FeedContextType;