import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ParallaxProvider } from '@/components/parallax/parallax-provider'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Navbar stays OUTSIDE the 3D stage — fixed positioning must not
          be affected by perspective/transform on the parallax scope */}
      <Navbar />
      <ParallaxProvider>
        {children}
        <Footer />
      </ParallaxProvider>
    </>
  )
}
