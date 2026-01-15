'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as Dialog from '@radix-ui/react-dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search, ArrowLeft, ArrowRight, MapPin, Users, Plane, Camera, Star, Clock, Globe } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  country: string;
  popularity: number;
  price: number;
}

const mockDestinations: Destination[] = [
  { id: 1, name: 'Santorini', country: 'Greece', popularity: 95, price: 1299 },
  { id: 2, name: 'Bali', country: 'Indonesia', popularity: 88, price: 899 },
  { id: 3, name: 'Maldives', country: 'Maldives', popularity: 92, price: 2199 }
];

export default function VacationPlanningDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(mockDestinations);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFilteredDestinations(mockDestinations);
      } catch (err) {
        setError('Failed to load destinations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = mockDestinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(results);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredDestinations.length / 5);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <Card className='shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 border-0'>
        <CardHeader className='p-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-white text-xl'>Active Trips</CardTitle>
            <Plane className='h-8 w-8 text-white/80' />
          </div>
        </CardHeader>
        <CardContent className='text-center py-4'>
          <span className='text-5xl font-bold text-white'>847</span>
          <p className='text-white/80 mt-2'>Currently exploring</p>
        </CardContent>
      </Card>

      <Card className='shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500 border-0'>
        <CardHeader className='p-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-white text-xl'>Destinations</CardTitle>
            <MapPin className='h-8 w-8 text-white/80' />
          </div>
        </CardHeader>
        <CardContent className='text-center py-4'>
          <span className='text-5xl font-bold text-white'>156</span>
          <p className='text-white/80 mt-2'>Available worldwide</p>
        </CardContent>
      </Card>

      <Card className='shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-500 border-0'>
        <CardHeader className='p-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-white text-xl'>Happy Travelers</CardTitle>
            <Users className='h-8 w-8 text-white/80' />
          </div>
        </CardHeader>
        <CardContent className='text-center py-4'>
          <span className='text-5xl font-bold text-white'>12,847</span>
          <p className='text-white/80 mt-2'>This season</p>
        </CardContent>
      </Card>

      <Card className='shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-green-400 to-teal-500 border-0'>
        <CardHeader className='p-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-white text-xl'>Satisfaction</CardTitle>
            <Star className='h-8 w-8 text-white/80' />
          </div>
        </CardHeader>
        <CardContent className='text-center py-4'>
          <span className='text-5xl font-bold text-white'>98%</span>
          <p className='text-white/80 mt-2'>Customer rating</p>
        </CardContent>
      </Card>

      <Card className='col-span-full shadow-2xl rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm border-0'>
        <CardHeader className='p-6 bg-gradient-to-r from-orange-400 to-pink-400'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-white text-2xl flex items-center'>
              <Camera className='mr-3 h-6 w-6' />
              Trending Destinations
            </CardTitle>
            <div className='relative w-80'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                type='text'
                placeholder='Search destinations...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-white/90 border-0 rounded-2xl'
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          {isLoading ? (
            <Skeleton className='h-32 w-full rounded-2xl' />
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-gray-700 font-semibold'>Destination</TableHead>
                  <TableHead className='text-gray-700 font-semibold'>Country</TableHead>
                  <TableHead className='text-gray-700 font-semibold'>Popularity Score</TableHead>
                  <TableHead className='text-gray-700 font-semibold'>Starting Price</TableHead>
                  <TableHead className='text-gray-700 font-semibold'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.slice((currentPage - 1) * 5, currentPage * 5).map((destination) => (
                  <TableRow key={destination.id} className='hover:bg-orange-50'>
                    <TableCell className='font-semibold text-gray-800'>{destination.name}</TableCell>
                    <TableCell className='text-gray-600'>{destination.country}</TableCell>
                    <TableCell>
                      <div className='flex items-center'>
                        <Progress value={destination.popularity} className='w-20 mr-3' />
                        <span className='text-sm font-medium'>{destination.popularity}%</span>
                      </div>
                    </TableCell>
                    <TableCell className='font-bold text-green-600'>${destination.price}</TableCell>
                    <TableCell>
                      <Badge variant='default' className='bg-gradient-to-r from-green-400 to-teal-500 text-white border-0'>
                        Trending
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className='mt-6 flex justify-end space-x-3'>
            <Button 
              variant='outline' 
              disabled={currentPage === 1} 
              onClick={handlePrevPage}
              className='border-orange-200 text-orange-600 hover:bg-orange-50'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Previous
            </Button>
            <Button 
              variant='outline' 
              disabled={currentPage === totalPages} 
              onClick={handleNextPage}
              className='border-orange-200 text-orange-600 hover:bg-orange-50'
            >
              Next
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog.Root open={isModalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm' />
          <Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-lg w-full p-8 shadow-2xl rounded-3xl bg-gradient-to-br from-orange-50 to-pink-50 border-0'>
            <Dialog.Title className='text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-6'>
              Plan Your Dream Vacation
            </Dialog.Title>
            <form className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Destination</label>
                <Input placeholder='Where do you want to go?' required className='rounded-2xl border-orange-200' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Travel Dates</label>
                <div className='flex space-x-3'>
                  <Input type='date' required className='rounded-2xl border-orange-200' />
                  <Input type='date' required className='rounded-2xl border-orange-200' />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Number of Travelers</label>
                <Select>
                  <SelectTrigger className='w-full rounded-2xl border-orange-200'>
                    <SelectValue placeholder='Select travelers' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 Person</SelectItem>
                    <SelectItem value='2'>2 People</SelectItem>
                    <SelectItem value='3-4'>3-4 People</SelectItem>
                    <SelectItem value='5+'>5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Budget Range</label>
                <Select>
                  <SelectTrigger className='w-full rounded-2xl border-orange-200'>
                    <SelectValue placeholder='Select budget' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='budget'>Budget ($500-$1000)</SelectItem>
                    <SelectItem value='mid'>Mid-range ($1000-$3000)</SelectItem>
                    <SelectItem value='luxury'>Luxury ($3000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type='submit' className='w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 text-lg py-6'>
                <Clock className='mr-2 h-5 w-5' />
                Generate AI Travel Plan
              </Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
