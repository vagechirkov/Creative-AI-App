import {nanoid} from 'nanoid'

import FeedPage from "../../components/FeedPage";


export default async function Feed() {
    // Read environment variable from .env file or build.env file when deployed
    const WSBasePath = process.env.NEXT_PUBLIC_BACKEND_API;
    const userId: string = nanoid();
    return (
        <main>
            <FeedPage />
        </main>
    )
}