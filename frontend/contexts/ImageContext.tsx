import {createContext} from "react";


export interface IImageCardContext {
    image: { src: string, alt: string },
    likes: number,

}

export const ImageCardContext = createContext<IImageCardContext | null>(null);


const ImageCardContextProvider = ({children}: any) => {
    const image = {
        src: "https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840",
        alt: "Adorably cute 🐈‍⬛, artstation winner by victo ngai, kilian eng and by jake parker, swirly vibrant color lines, winning-award masterpiece, fantastically gaudy, aesthetic octane render, 8k hd resolution"
    }
    const likes = 0;

    return (
        <ImageCardContext.Provider value={{image, likes}}>
            {children}
        </ImageCardContext.Provider>
    )
};

export default ImageCardContextProvider;