 'use client'

 import { useState } from 'react'
 import { useAppStore } from '@/store'
 import { Input } from './ui/input'
 import { Button } from './ui/button'

 export function VendorOnboarding() {
   const { addVendor } = useAppStore()
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')

   const handleSubmit = () => {
     if (!name || !phone) return
     const newVendor = {
       id: `v_${Date.now()}`,
       name,
       description,
       image: '/api/placeholder/300/200',
       location: { lat: 21.1702, lng: 72.8311, address },
       cuisine: ['Beverages'],
       rating: 4.0,
       totalReviews: 0,
       isActive: true,
       phone,
       openTime: '09:00',
       closeTime: '21:00'
     }
     addVendor(newVendor)
     setName('')
     setPhone('')
     setAddress('')
     setDescription('')
     alert('Vendor registered locally for demo. In production, vendor data should be saved to the backend and verified.')
   }

   return (
     <div className="max-w-3xl mx-auto p-6">
       <h2 className="text-xl font-bold mb-4">Onboard a Vendor (Surat)</h2>
       <div className="space-y-3">
         <Input placeholder="Vendor name" value={name} onChange={(e) => setName(e.target.value)} />
         <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
         <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
         <Input placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
         <div className="flex gap-2">
           <Button onClick={handleSubmit}>Register Vendor</Button>
         </div>
       </div>
     </div>
   )
 }
