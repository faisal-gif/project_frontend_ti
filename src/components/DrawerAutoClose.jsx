"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function DrawerAutoClose() {
  const pathname = usePathname()

  useEffect(() => {
    const checkbox = document.getElementById("drawer-nav")
    if (checkbox) checkbox.checked = false
  }, [pathname])

  return null
}
