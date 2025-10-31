import './globals.css'

export const metadata = {
  title: 'Event Registration Form',
  description: 'Register for college events',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
