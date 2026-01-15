'use client'

import { Button } from '@/components/ui/button';
import { Plus, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className='p-6 flex justify-between items-center bg-white/10 backdrop-blur-sm'>
      <div className='flex items-center space-x-3'>
        <Globe className='h-8 w-8 text-yellow-300' />
        <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent'>TourismAgent Planner</h1>
      </div>
      <div className='flex space-x-3'>
        <Button variant='outline' className='bg-white/20 border-white/30 text-white hover:bg-white/30'>Settings</Button>
        <Button onClick={() => setModalOpen(true)} className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600'>
          <Plus className='mr-2 h-4 w-4' />
          Plan New Trip
        </Button>
      </div>
    </header>
  )
}
