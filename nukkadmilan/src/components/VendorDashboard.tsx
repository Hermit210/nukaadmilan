'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store'
import { mockVendors, mockMenuItems, mockOrders } from '@/data/mockData'
import { MenuItemCard } from './MenuItemCard'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Order } from '@/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

export function VendorDashboard() {
  const { 
    vendors, 
    setVendors, 
    menuItems, 
    setMenuItems,
    orders,
    setOrders,
    updateMenuItem,
    updateOrderStatus
  } = useAppStore()
  
  // Simulate current vendor (in real app, this would come from auth)
  const currentVendor = vendors[0] || mockVendors[0]
  const [vendorActive, setVendorActive] = useState(currentVendor?.isActive || false)

  useEffect(() => {
    setVendors(mockVendors)
    setMenuItems(mockMenuItems)
    setOrders(mockOrders)
  }, [setVendors, setMenuItems, setOrders])

  const vendorMenuItems = menuItems.filter(item => item.vendorId === currentVendor?.id)
  const vendorOrders = orders.filter(order => order.vendorId === currentVendor?.id)
  
  const todayOrders = vendorOrders.filter(order => {
    const today = new Date()
    const orderDate = new Date(order.createdAt)
    return orderDate.toDateString() === today.toDateString()
  })

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)
  const avgOrderValue = todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0

  const handleToggleAvailability = (itemId: string, isAvailable: boolean) => {
    updateMenuItem(itemId, { isAvailable })
  }

  const handleOrderStatusUpdate = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status)
  }

  const salesData = [
    { name: 'Mon', sales: 1200 },
    { name: 'Tue', sales: 1900 },
    { name: 'Wed', sales: 800 },
    { name: 'Thu', sales: 1500 },
    { name: 'Fri', sales: 2200 },
    { name: 'Sat', sales: 2800 },
    { name: 'Sun', sales: 2100 },
  ]

  if (!currentVendor) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Vendor Dashboard</h2>
            <p className="text-gray-600">Welcome back, {currentVendor.name}!</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm">Store Status:</span>
            <Switch
              checked={vendorActive}
              onCheckedChange={setVendorActive}
            />
            <Badge variant={vendorActive ? 'success' : 'secondary'}>
              {vendorActive ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{todayRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(avgOrderValue)}</div>
            <p className="text-xs text-muted-foreground">
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendorOrders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {vendorOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'HH:mm')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.total}</p>
                    <Badge 
                      variant={
                        order.status === 'completed' ? 'success' :
                        order.status === 'ready' ? 'warning' :
                        order.status === 'preparing' ? 'default' : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                    {order.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="mt-1"
                        onClick={() => handleOrderStatusUpdate(order.id, 'confirmed')}
                      >
                        Accept
                      </Button>
                    )}
                    {order.status === 'preparing' && (
                      <Button 
                        size="sm" 
                        className="mt-1"
                        onClick={() => handleOrderStatusUpdate(order.id, 'ready')}
                      >
                        Ready
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Management */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorMenuItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                isVendorMode={true}
                onToggleAvailability={handleToggleAvailability}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}