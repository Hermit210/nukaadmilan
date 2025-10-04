'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Vendor } from '@/types'
import { Star, MapPin, Clock, Phone } from 'lucide-react'
import Image from 'next/image'

interface VendorCardProps {
  vendor: Vendor
  onSelect?: (vendor: Vendor) => void
}

export function VendorCard({ vendor, onSelect }: VendorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={vendor.isActive ? 'success' : 'secondary'}>
              {vendor.isActive ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg">{vendor.name}</CardTitle>
        <p className="text-sm text-gray-600">{vendor.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{vendor.rating}</span>
            <span className="text-sm text-gray-500">({vendor.totalReviews} reviews)</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{vendor.location.address}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {vendor.openTime} - {vendor.closeTime}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{vendor.phone}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {vendor.cuisine.map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
          
          {onSelect && (
            <Button 
              className="w-full mt-4" 
              onClick={() => onSelect(vendor)}
              disabled={!vendor.isActive}
            >
              {vendor.isActive ? 'View Menu' : 'Currently Closed'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}