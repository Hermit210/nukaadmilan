'use client'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useAppStore } from '@/store'
import { MapPin, User, Store } from 'lucide-react'

export function Header() {
  const { isVendorMode, setIsVendorMode } = useAppStore()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">NukkadMilan</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">Customer</span>
              <Switch
                checked={isVendorMode}
                onCheckedChange={setIsVendorMode}
              />
              <Store className="h-4 w-4" />
              <span className="text-sm">Vendor</span>
            </div>
            <div>
              <a href="/onboard">
                <Button variant="outline">Onboard Vendor</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}