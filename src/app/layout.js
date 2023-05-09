import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Faster Reflex! ⚡️',
//   description: 'Can you beat your friends with a faster reflex? ⚡️',
//   // url: 'https://faster-reflex.netlify.app',
//   // locale: 'en-US',
//   // type: 'website',
//   // themeColor: 'black',
//   // keywords: 'fast, faster, reflex, reflexes, game, play, challenge, speed, fun, entertaining, entertainment, social',
//   // openGraph: {
//   //   images: [
//   //     {
//   //       url: 'https://faster-reflex.netlify.app/opengraph-image.js',
//   //       width: 1800,
//   //       height: 1600
//   //     },
//   //     {
//   //       url: 'https://faster-reflex.netlify.app/opengraph-image.js',
//   //       width: 800,
//   //       height: 600
//   //     }
//   //   ]
//   // }
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
