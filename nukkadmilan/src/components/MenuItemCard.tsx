'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MenuItem } from '@/types'
import { Clock, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart?: (item: MenuItem, quantity: number) => void
  isVendorMode?: boolean
  onToggleAvailability?: (itemId: string, isAvailable: boolean) => void
}

export function MenuItemCard({ 
  item, 
  onAddToCart, 
  isVendorMode = false,
  onToggleAvailability 
}: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (onAddToCart && quantity > 0) {
      onAddToCart(item, quantity)
      setQuantity(1)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={item.isAvailable ? 'success' : 'secondary'}>
              {item.isAvailable ? 'Available' : 'Sold Out'}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-base">{item.name}</CardTitle>
        <p className="text-sm text-gray-600">{item.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">₹{item.price}</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{item.preparationTime} min</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
          
          {isVendorMode ? (
            <Button
              variant={item.isAvailable ? "destructive" : "default"}
              className="w-full"
              onClick={() => onToggleAvailability?.(item.id, !item.isAvailable)}
            >
              {item.isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={!item.isAvailable}
              >
                {item.isAvailable ? `Add to Cart - ₹${item.price * quantity}` : 'Currently Unavailable'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}