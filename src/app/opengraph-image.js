import { ImageResponse } from 'next/server'

const title = 'Faster Reflex ⚡️'
export const alt = title
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
export const runtime = 'edge'
 
export default function og() {
  const font = fetch(
    new URL('../../assets/Nunito-Light.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Nunito Light',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
