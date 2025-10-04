'use client'

import { useAppStore } from '@/store'
import { CustomerView } from '@/components/CustomerView'
import { VendorDashboard } from '@/components/VendorDashboard'

export default function Home() {
  const { isVendorMode } = useAppStore()

  return (
    <div className="min-h-screen">
      {isVendorMode ? <VendorDashboard /> : <CustomerView />}
    </div>
  )
}
