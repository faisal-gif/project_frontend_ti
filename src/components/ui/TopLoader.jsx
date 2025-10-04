'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const TopLoader = () => {
    const pathname = usePathname()

    useEffect(() => {
        NProgress.start()

        // Simulasi delay untuk animasi (biasanya pakai router events, tapi di app router pakai effect)
        const timeout = setTimeout(() => {
            NProgress.done()
        }, 300)

        return () => clearTimeout(timeout)
    }, [pathname])

    return null
}

export default TopLoader
