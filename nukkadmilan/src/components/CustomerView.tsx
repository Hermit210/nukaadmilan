'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store'
import { mockVendors, mockMenuItems } from '@/data/mockData'
import { VendorCard } from './VendorCard'
import { MenuItemCard } from './MenuItemCard'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Vendor, MenuItem, CuisineType } from '@/types'
import { Search, Filter, ShoppingCart } from 'lucide-react'

const cuisineTypes: CuisineType[] = ['Chaat', 'Momos', 'Dosa', 'Pav Bhaji', 'Biryani', 'Chinese', 'South Indian', 'North Indian', 'Beverages', 'Desserts']

export function CustomerView() {
  const { 
    vendors, 
    setVendors, 
    selectedVendor, 
    setSelectedVendor,
    menuItems,
    setMenuItems
  } = useAppStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | 'All'>('All')
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([])

  useEffect(() => {
    setVendors(mockVendors)
    setMenuItems(mockMenuItems)
  }, [setVendors, setMenuItems])

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCuisine = selectedCuisine === 'All' || vendor.cuisine.includes(selectedCuisine)
    return matchesSearch && matchesCuisine
  })

  const vendorMenuItems = selectedVendor 
    ? menuItems.filter(item => item.vendorId === selectedVendor.id)
    : []

  // Group orders for selected vendor
  const { groupOrders, setGroupOrders, createGroupOrder, joinGroupOrder } = useAppStore()
  const vendorGroupOrders = selectedVendor ? groupOrders.filter(g => g.vendorId === selectedVendor.id && g.status === 'open') : []

  const addToCart = (item: MenuItem, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }
      return [...prev, { item, quantity }]
    })
  }

  const cartTotal = cart.reduce((total, cartItem) => 
    total + (cartItem.item.price * cartItem.quantity), 0
  )

  if (selectedVendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button variant="outline" onClick={() => setSelectedVendor(null)}>
              ← Back to Vendors
            </Button>
            <h2 className="text-2xl font-bold mt-2">{selectedVendor.name}</h2>
            <p className="text-gray-600">{selectedVendor.description}</p>
          </div>
          
          {cart.length > 0 && (
            <Card className="w-80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({cart.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((cartItem, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{cartItem.item.name} x{cartItem.quantity}</span>
                      <span>₹{cartItem.item.price * cartItem.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total: ₹{cartTotal}</span>
                  </div>
                  <Button className="w-full mt-2">
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Group Orders Panel */}
          <Card className="w-80 mt-4">
            <CardHeader>
              <CardTitle>Group Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendorGroupOrders.length === 0 && (
                  <div className="text-sm text-gray-500">No open group orders. Start one to get discounts!</div>
                )}
                {vendorGroupOrders.map(g => (
                  <div key={g.id} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Group #{g.id}</div>
                      <div className="text-xs text-gray-500">Items: {g.items.length} • Target: ₹{g.minAmount ?? '—'}</div>
                    </div>
                    <div>
                      <Button size="sm" onClick={() => {
                        // for demo join with first cart item or placeholder
                        const itemToJoin = vendorMenuItems[0]
                        if (itemToJoin) {
                          joinGroupOrder(g.id, { customerId: 'guest', menuItemId: itemToJoin.id, name: itemToJoin.name, price: itemToJoin.price, quantity: 1 })
                        }
                      }}>Join</Button>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <Button onClick={() => {
                    if (!selectedVendor) return
                    const newGroup = {
                      id: `g_${Date.now()}`,
                      vendorId: selectedVendor.id,
                      initiatorCustomerId: 'guest',
                      items: [],
                      minAmount: 200,
                      status: 'open' as const,
                      createdAt: new Date(),
                      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
                    }
                    createGroupOrder(newGroup)
                  }}>Create Group Order</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorMenuItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Discover Street Food Near You</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search vendors or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter by cuisine:</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCuisine === 'All' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCuisine('All')}
          >
            All
          </Badge>
          {cuisineTypes.map(cuisine => (
            <Badge
              key={cuisine}
              variant={selectedCuisine === cuisine ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onSelect={setSelectedVendor}
          />
        ))}
      </div>
      
      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No vendors found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}