import './globals.css'

import { Inter, Jura, IBM_Plex_Mono } from '@next/font/google';


const inter = Inter({
    variable: '--font-inter',
    display: 'optional',
    weight: "100"
});

const jura = Jura({
    variable: '--font-jura',
    display: 'optional',
    weight: "700"
});

const plex = IBM_Plex_Mono({
    variable: '--font-plex',
    weight: "700"
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jura.variable} ${plex.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}
