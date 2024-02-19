import './globals.css'
import Navigation from '@/components/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div>
          <Navigation />
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}
