import {createContext, useState} from "react";


export interface IImageCardContext {
    image: { src: string, alt: string },
    reactions: { likes: number },

    updateImage: (image: { src: string, alt: string }) => void,
    updateReactions: (reactions: { likes: number }) => void,
}

export const ImageCardContext = createContext<IImageCardContext | null>(null);


const ImageCardContextProvider = ({children}: any) => {
    const image_default = {
        src: "https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840",
        alt: "Adorably cute 🐈‍⬛, artstation winner by victo ngai, kilian eng and by jake parker, swirly vibrant color lines, winning-award masterpiece, fantastically gaudy, aesthetic octane render, 8k hd resolution"
    }
    const [image, setImage] = useState(image_default);
    const [reactions, setReactions] = useState({likes: 1});

    const updateImage = (imageNew: { src: string, alt: string }) => setImage(imageNew);

    const updateReactions = (reactionsNew: { likes: number }) => setReactions(reactionsNew);


    return (
        <ImageCardContext.Provider value={{image, reactions, updateImage, updateReactions}}>
            {children}
        </ImageCardContext.Provider>
    )
};

export default ImageCardContextProvider;