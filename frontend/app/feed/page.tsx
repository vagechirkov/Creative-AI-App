import FeedImage from "../../components/Feed/FeedImage";

export default function Feed() {

    return (
        <main>
            <FeedImage wsUrl={"ws://localhost:8000/ws/client3"}/>
        </main>
    )
}