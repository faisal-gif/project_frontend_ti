import { Cloud, Droplets, Eye, Wind } from 'lucide-react';
import Card from '@/components/ui/Card';

const WeatherCard = () => {
  return (
    <Card className="flex flex-col justify-between border-0 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-red-800">New York</h2>
        <p className="mb-6 text-sm text-muted-foreground">Kamis, 7 Agustus 2025</p>

        <div className="mb-6">
          <div className="mb-2 text-5xl font-light text-blue-600">20.4°C</div>
          <p className="text-sm font-medium text-orange-500">light rain</p>
        </div>

        <div className="mb-6 flex justify-center">
          <Cloud className="mb-1 h-20 w-20 text-gray-600" />
        </div>
      </div>

      <div className="flex justify-around text-center">
        <div className="flex flex-col items-center">
          <Wind className="mb-1 h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">4.09 km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <Droplets className="mb-1 h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">78%</span>
        </div>
        <div className="flex flex-col items-center">
          <Eye className="mb-1 h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">10 km</span>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
