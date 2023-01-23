'use client';

import {createContext, useContext, useReducer} from "react";
import {DragState} from "../ImageDraggable/ImageDraggable";
import {feedReducer} from "./FeedReducer";

export type FeedImageType = {
    id: number;
    url: string;
    alt_text: string;
    // list of emojis and their counts
    reactions: { emoji: string, count: number }[];
    active_users: number;
    artist?: string;
}

export type FeedState = {
    feedHistory: FeedImageType[] | undefined;
    currentImage: FeedImageType | undefined;
    userReaction: { reaction: string, imageId: number } | undefined;
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
    userReaction: undefined,
    dragState: {direction: '', magnitude: 0, backgroundText: '', isDragging: false},
}

const feedInitializer = (initialState: FeedState) => {
    // JSON.parse(localStorage.getItem('FEED_STATE')) ||
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


const useFeedContext = () => useContext(FeedContext) as FeedContextType;

export default useFeedContext;