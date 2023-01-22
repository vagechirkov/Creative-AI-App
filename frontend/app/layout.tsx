import './globals.css'

import {Inter, Jura, IBM_Plex_Mono, Six_Caps} from '@next/font/google';
import {FeedContextProvider} from "../components/FeedContext/FeedContext";
import {ReactNode} from "react";


const inter = Inter({
    variable: '--font-inter',
    display: 'optional',
    weight: '100',
    subsets: ['latin']
});

const jura = Jura({
    variable: '--font-jura',
    display: 'optional',
    weight: '700',
    subsets: ['latin']
});

const plex = IBM_Plex_Mono({
    variable: '--font-plex',
    weight: '700',
    subsets: ['latin']
});

const sixCaps = Six_Caps({
    variable: '--font-six-caps',
    weight: '400',
    subsets: ['latin']
});


export default function RootLayout({children,}: { children: ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${jura.variable} ${plex.variable} ${sixCaps.variable}`}>
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
        <body>
        <FeedContextProvider>
            {children}
        </FeedContextProvider>
        </body>
        </html>
    )
}
