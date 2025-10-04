import { create } from 'zustand'
import { Vendor, MenuItem, Order, Review, Customer, GroupOrder, GroupOrderItem } from '@/types'

interface AppState {
  // Vendors
  vendors: Vendor[]
  selectedVendor: Vendor | null
  
  // Menu Items
  menuItems: MenuItem[]
  
  // Orders
  orders: Order[]
  currentOrder: Order | null
  // Group Orders
  groupOrders: GroupOrder[]
  
  // Reviews
  reviews: Review[]
  
  // Customer
  currentCustomer: Customer | null
  
  // UI State
  isVendorMode: boolean
  
  // Actions
  setVendors: (vendors: Vendor[]) => void
  setSelectedVendor: (vendor: Vendor | null) => void
  addVendor: (vendor: Vendor) => void
  updateVendor: (id: string, updates: Partial<Vendor>) => void
  
  setMenuItems: (items: MenuItem[]) => void
  addMenuItem: (item: MenuItem) => void
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
  
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  setCurrentOrder: (order: Order | null) => void
  // Group order actions
  setGroupOrders: (orders: GroupOrder[]) => void
  createGroupOrder: (groupOrder: GroupOrder) => void
  joinGroupOrder: (groupOrderId: string, item: GroupOrderItem) => void
  closeGroupOrder: (groupOrderId: string) => void
  
  addReview: (review: Review) => void
  setReviews: (reviews: Review[]) => void
  
  setCurrentCustomer: (customer: Customer | null) => void
  setIsVendorMode: (isVendor: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  vendors: [],
  selectedVendor: null,
  menuItems: [],
  orders: [],
  currentOrder: null,
  groupOrders: [],
  reviews: [],
  currentCustomer: null,
  isVendorMode: false,
  
  // Vendor actions
  setVendors: (vendors) => set({ vendors }),
  setSelectedVendor: (vendor) => set({ selectedVendor: vendor }),
  addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
  updateVendor: (id, updates) => set((state) => ({
    vendors: state.vendors.map(v => v.id === id ? { ...v, ...updates } : v)
  })),
  
  // Menu actions
  setMenuItems: (items) => set({ menuItems: items }),
  addMenuItem: (item) => set((state) => ({ menuItems: [...state.menuItems, item] })),
  updateMenuItem: (id, updates) => set((state) => ({
    menuItems: state.menuItems.map(item => item.id === id ? { ...item, ...updates } : item)
  })),
  deleteMenuItem: (id) => set((state) => ({
    menuItems: state.menuItems.filter(item => item.id !== id)
  })),
  
  // Order actions
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => order.id === id ? { ...order, status } : order)
  })),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  // Group order actions
  setGroupOrders: (orders) => set({ groupOrders: orders }),
  createGroupOrder: (groupOrder) => set((state) => ({ groupOrders: [...state.groupOrders, groupOrder] })),
  joinGroupOrder: (groupOrderId, item) => set((state) => ({
    groupOrders: state.groupOrders.map(g => g.id === groupOrderId ? { ...g, items: [...g.items, item] } : g)
  })),
  closeGroupOrder: (groupOrderId) => set((state) => ({
    groupOrders: state.groupOrders.map(g => g.id === groupOrderId ? { ...g, status: 'closed' } : g)
  })),
  
  // Review actions
  addReview: (review) => set((state) => ({ reviews: [...state.reviews, review] })),
  setReviews: (reviews) => set({ reviews }),
  
  // Customer actions
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  setIsVendorMode: (isVendor) => set({ isVendorMode: isVendor })
}))