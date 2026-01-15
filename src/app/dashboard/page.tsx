import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock } from 'lucide-react'

interface Trip {
  id: string
  destination: string
  startDate: string
  endDate: string
  status: 'upcoming' | 'ongoing' | 'completed'
  image: string
}

async function getUpcomingTrips(): Promise<Trip[]> {
  // This will be replaced with actual API call once backend is implemented
  return [
    {
      id: '1',
      destination: 'Bali, Indonesia',
      startDate: '2024-02-15',
      endDate: '2024-02-22',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      destination: 'Santorini, Greece',
      startDate: '2024-03-10',
      endDate: '2024-03-17',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      destination: 'Tokyo, Japan',
      startDate: '2024-04-05',
      endDate: '2024-04-12',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
    }
  ]
}

export default async function DashboardPage() {
  const trips = await getUpcomingTrips()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Travel Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your upcoming adventures and plan your next getaway</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Upcoming Trips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {trip.destination}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{calculateDuration(trip.startDate, trip.endDate)}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trip.status === 'upcoming' 
                        ? 'bg-primary/10 text-primary' 
                        : trip.status === 'ongoing'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                    <button className="text-primary hover:text-primary/80 font-medium">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {trips.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No upcoming trips</h3>
                <p className="text-gray-400 mb-4">Start planning your next adventure!</p>
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Plan a Trip
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
