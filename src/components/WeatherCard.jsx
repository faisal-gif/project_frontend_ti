'use client'
import { useEffect, useState } from 'react';
import {
  Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain,
  CloudSnow, CloudSun, Droplets, Eye, MapPin, Sun, Wind,
} from 'lucide-react';
import Card from '@/components/ui/Card';

// Jakarta — dipakai kalau geolokasi ditolak / tidak tersedia
const FALLBACK = { latitude: -6.2088, longitude: 106.8456, city: 'Jakarta' };

// Kode cuaca WMO (dipakai Open-Meteo) → label + ikon
function describe(code) {
  if (code === 0) return { label: 'Cerah', Icon: Sun };
  if (code === 1) return { label: 'Cerah berawan', Icon: CloudSun };
  if (code === 2) return { label: 'Berawan sebagian', Icon: CloudSun };
  if (code === 3) return { label: 'Berawan', Icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Berkabut', Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: 'Gerimis', Icon: CloudDrizzle };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: 'Hujan', Icon: CloudRain };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { label: 'Salju', Icon: CloudSnow };
  if (code >= 95) return { label: 'Badai petir', Icon: CloudLightning };
  return { label: 'Berawan', Icon: Cloud };
}

async function fetchWeather({ latitude, longitude }, signal) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,visibility` +
    `&wind_speed_unit=kmh&timezone=auto`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('weather fetch failed');
  const { current } = await res.json();
  return current;
}

// Reverse geocode tanpa API key — hanya untuk menampilkan nama kota saat pakai GPS
async function fetchCity({ latitude, longitude }, signal) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`,
      { signal }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d.city || d.locality || d.principalSubdivision || null;
  } catch {
    return null; // nama kota opsional; cuaca tetap tampil
  }
}

function getCoords() {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null), // ditolak / gagal → fallback
      { timeout: 8000 }
    );
  });
}

const WeatherCard = () => {
  const [state, setState] = useState({ status: 'loading', data: null, city: '' });

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const gps = await getCoords();
        const loc = gps ? { ...gps, city: null } : FALLBACK;
        const [current, city] = await Promise.all([
          fetchWeather(loc, ctrl.signal),
          gps ? fetchCity(loc, ctrl.signal) : Promise.resolve(FALLBACK.city),
        ]);
        setState({ status: 'ok', data: current, city: city || 'Lokasi Anda' });
      } catch (e) {
        if (e.name !== 'AbortError') setState({ status: 'error', data: null, city: '' });
      }
    })();
    return () => ctrl.abort();
  }, []);

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <Card className="border border-base-300 bg-base-200 p-4">
      {state.status === 'loading' && (
        <div className="py-4 text-center text-sm text-muted-foreground animate-pulse">
          Memuat cuaca…
        </div>
      )}

      {state.status === 'error' && (
        <div className="py-4 text-center text-sm text-muted-foreground">
          Cuaca tidak tersedia saat ini.
        </div>
      )}

      {state.status === 'ok' && (() => {
        const { label, Icon } = describe(state.data.weather_code);
        return (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Lokasi + tanggal */}
            <div>
              <div className="flex items-center gap-1.5 text-lg font-bold text-base-content">
                <MapPin className="h-5 w-5" />
                {state.city}
              </div>
              <p className="text-sm text-muted-foreground">{today}</p>
            </div>

            {/* Suhu + kondisi */}
            <div className="flex items-center gap-3">
              <Icon className="h-14 w-14 text-base-content/80" />
              <div>
                <div className="text-4xl font-light leading-none text-blue-600">
                  {Math.round(state.data.temperature_2m)}°C
                </div>
                <p className="mt-1 text-sm font-medium text-orange-500">{label}</p>
              </div>
            </div>

            {/* Detail */}
            <div className="flex gap-5 text-center">
              <div className="flex flex-col items-center">
                <Wind className="mb-1 h-5 w-5 text-base-content/70" />
                <span className="text-sm font-medium text-base-content">
                  {state.data.wind_speed_10m} km/h
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="mb-1 h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-base-content">
                  {state.data.relative_humidity_2m}%
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Eye className="mb-1 h-5 w-5 text-base-content/70" />
                <span className="text-sm font-medium text-base-content">
                  {Math.round(state.data.visibility / 1000)} km
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </Card>
  );
};

export default WeatherCard;
