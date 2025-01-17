"use client"
import dynamic from "next/dynamic"

const HomePageContent = dynamic(
  () => import("@/components/organisms/HomePageContent"),
  {
    ssr: false
  }
)
export default function Home() {
  return <HomePageContent />
}
