export interface Vendor {
  id: string
  name: string
  description: string
  image: string
  location: {
    lat: number
    lng: number
    address: string
  }
  cuisine: string[]
  rating: number
  totalReviews: number
  isActive: boolean
  phone: string
  openTime: string
  closeTime: string
}

export interface MenuItem {
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isAvailable: boolean
  preparationTime: number
}

export interface Order {
  id: string
  vendorId: string
  customerId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  estimatedTime: number
  customerName: string
  customerPhone: string
}

export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export interface Review {
  id: string
  vendorId: string
  customerId: string
  orderId: string
  rating: number
  comment: string
  createdAt: Date
  customerName: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
}

export type CuisineType = 'Chaat' | 'Momos' | 'Dosa' | 'Pav Bhaji' | 'Biryani' | 'Chinese' | 'South Indian' | 'North Indian' | 'Beverages' | 'Desserts'

export type GroupOrderStatus = 'open' | 'closed' | 'placed'

export interface GroupOrderItem {
  customerId: string
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export interface GroupOrder {
  id: string
  vendorId: string
  initiatorCustomerId: string
  items: GroupOrderItem[]
  minAmount?: number // optional minimum target for group discount
  status: GroupOrderStatus
  createdAt: Date
  expiresAt?: Date
}