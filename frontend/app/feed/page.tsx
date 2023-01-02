import ImageCard from "../../components/ImageCard";


export default function Feed() {

    const onReaction = (emoji: string) => {
        console.log(emoji);
    }

    const url = 'https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840';

    return (
        <main>
            <h1 className="text-3xl font-bold text-emerald-600">Feed</h1>
            <ImageCard imageUrl={url} />
        </main>
    )
}