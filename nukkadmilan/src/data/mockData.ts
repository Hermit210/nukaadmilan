import { Vendor, MenuItem, Order, Review } from '@/types'

export const mockVendors: Vendor[] = [
  // Surat Vendors (for demo)
  {
    id: 's1',
    name: 'Nukkad Pav Bhaji - Surat',
    description: 'Famous pav bhaji served hot on the streets of Surat',
    image: '/api/placeholder/300/200',
    location: {
      lat: 21.1702,
      lng: 72.8311,
      address: 'Varachha Road, Surat'
    },
    cuisine: ['Pav Bhaji', 'North Indian'],
    rating: 4.6,
    totalReviews: 342,
    isActive: true,
    phone: '+91 9876500001',
    openTime: '11:00',
    closeTime: '23:00'
  },
  {
    id: 's2',
    name: 'Surat Farsan & Snacks',
    description: 'Local farsan and chaats, authentic Surat flavors',
    image: '/api/placeholder/300/200',
    location: {
      lat: 21.1705,
      lng: 72.8320,
      address: 'Kapodra, Surat'
    },
    cuisine: ['Chaat', 'Snacks'],
    rating: 4.4,
    totalReviews: 210,
    isActive: true,
    phone: '+91 9876500002',
    openTime: '10:00',
    closeTime: '22:30'
  },
  {
    id: '1',
    name: 'Sharma Chaat Corner',
    description: 'Authentic Delhi-style chaat and snacks',
    image: '/api/placeholder/300/200',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place, New Delhi'
    },
    cuisine: ['Chaat', 'North Indian'],
    rating: 4.5,
    totalReviews: 127,
    isActive: true,
    phone: '+91 9876543210',
    openTime: '10:00',
    closeTime: '22:00'
  },
  {
    id: '2',
    name: 'Momo Junction',
    description: 'Fresh steamed and fried momos',
    image: '/api/placeholder/300/200',
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: 'Karol Bagh, New Delhi'
    },
    cuisine: ['Momos', 'Chinese'],
    rating: 4.2,
    totalReviews: 89,
    isActive: true,
    phone: '+91 9876543211',
    openTime: '11:00',
    closeTime: '23:00'
  },
  {
    id: '3',
    name: 'South Indian Express',
    description: 'Crispy dosas and authentic South Indian food',
    image: '/api/placeholder/300/200',
    location: {
      lat: 28.6304,
      lng: 77.2177,
      address: 'Rajouri Garden, New Delhi'
    },
    cuisine: ['Dosa', 'South Indian'],
    rating: 4.7,
    totalReviews: 203,
    isActive: false,
    phone: '+91 9876543212',
    openTime: '08:00',
    closeTime: '21:00'
  }
]

export const mockMenuItems: MenuItem[] = [
  // Sharma Chaat Corner items
  {
    id: '1',
    vendorId: '1',
    name: 'Bhel Puri',
    description: 'Crispy puffed rice with tangy chutneys',
    price: 40,
    image: '/api/placeholder/200/150',
    category: 'Chaat',
    isAvailable: true,
    preparationTime: 5
  },
  {
    id: '2',
    vendorId: '1',
    name: 'Pani Puri',
    description: '6 pieces of crispy puris with spiced water',
    price: 30,
    image: '/api/placeholder/200/150',
    category: 'Chaat',
    isAvailable: true,
    preparationTime: 3
  },
  {
    id: '3',
    vendorId: '1',
    name: 'Aloo Tikki',
    description: 'Crispy potato patties with chutneys',
    price: 35,
    image: '/api/placeholder/200/150',
    category: 'Chaat',
    isAvailable: false,
    preparationTime: 8
  },
  
  // Momo Junction items
  {
    id: '4',
    vendorId: '2',
    name: 'Veg Steamed Momos',
    description: '8 pieces of steamed vegetable momos',
    price: 80,
    image: '/api/placeholder/200/150',
    category: 'Momos',
    isAvailable: true,
    preparationTime: 10
  },
  {
    id: '5',
    vendorId: '2',
    name: 'Chicken Fried Momos',
    description: '8 pieces of crispy fried chicken momos',
    price: 120,
    image: '/api/placeholder/200/150',
    category: 'Momos',
    isAvailable: true,
    preparationTime: 12
  },
  
  // South Indian Express items
  {
    id: '6',
    vendorId: '3',
    name: 'Masala Dosa',
    description: 'Crispy dosa with spiced potato filling',
    price: 60,
    image: '/api/placeholder/200/150',
    category: 'Dosa',
    isAvailable: true,
    preparationTime: 15
  },
  {
    id: '7',
    vendorId: '3',
    name: 'Plain Dosa',
    description: 'Crispy plain dosa with sambar and chutney',
    price: 45,
    image: '/api/placeholder/200/150',
    category: 'Dosa',
    isAvailable: true,
    preparationTime: 12
  }
]

// Surat vendor menu items
mockMenuItems.push(
  {
    id: 's1-1',
    vendorId: 's1',
    name: 'Pav Bhaji - Single',
    description: 'Buttery pav bhaji single plate',
    price: 90,
    image: '/api/placeholder/200/150',
    category: 'Pav Bhaji',
    isAvailable: true,
    preparationTime: 12
  },
  {
    id: 's1-2',
    vendorId: 's1',
    name: 'Extra Pav (2 pcs)',
    description: 'Soft pav buns (2 pieces)',
    price: 20,
    image: '/api/placeholder/200/150',
    category: 'Bread',
    isAvailable: true,
    preparationTime: 2
  },
  {
    id: 's2-1',
    vendorId: 's2',
    name: 'Dabeli',
    description: 'Sweet and spicy dabeli',
    price: 40,
    image: '/api/placeholder/200/150',
    category: 'Snacks',
    isAvailable: true,
    preparationTime: 5
  }
)

// Sample group orders
import { GroupOrder } from '@/types'

export const mockGroupOrders: GroupOrder[] = [
  {
    id: 'g1',
    vendorId: 's1',
    initiatorCustomerId: 'c_demo',
    items: [
      { customerId: 'c_demo', menuItemId: 's1-1', name: 'Pav Bhaji - Single', price: 90, quantity: 2 }
    ],
    minAmount: 300,
    status: 'open',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60)
  }
]

export const mockOrders: Order[] = [
  {
    id: '1',
    vendorId: '1',
    customerId: 'c1',
    items: [
      { menuItemId: '1', name: 'Bhel Puri', price: 40, quantity: 2 },
      { menuItemId: '2', name: 'Pani Puri', price: 30, quantity: 1 }
    ],
    total: 110,
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    estimatedTime: 10,
    customerName: 'Rahul Kumar',
    customerPhone: '+91 9876543220'
  },
  {
    id: '2',
    vendorId: '2',
    customerId: 'c2',
    items: [
      { menuItemId: '4', name: 'Veg Steamed Momos', price: 80, quantity: 1 }
    ],
    total: 80,
    status: 'ready',
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    estimatedTime: 5,
    customerName: 'Priya Sharma',
    customerPhone: '+91 9876543221'
  }
]

export const mockReviews: Review[] = [
  {
    id: '1',
    vendorId: '1',
    customerId: 'c1',
    orderId: '1',
    rating: 5,
    comment: 'Amazing bhel puri! Fresh and tasty.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    customerName: 'Rahul Kumar'
  },
  {
    id: '2',
    vendorId: '2',
    customerId: 'c2',
    orderId: '2',
    rating: 4,
    comment: 'Good momos, could be a bit spicier.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    customerName: 'Priya Sharma'
  }
]