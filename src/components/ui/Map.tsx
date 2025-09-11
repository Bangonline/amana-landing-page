'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
  height?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    description?: string;
  }>;
}

export function Map({ 
  latitude, 
  longitude, 
  zoom = 15, 
  className,
  height = '400px',
  markers = []
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create OpenStreetMap tile layer URL
    const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    // Create map container
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Create iframe for OpenStreetMap
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    iframe.width = '100%';
    iframe.height = height;
    iframe.frameBorder = '0';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '0.75rem';

    mapContainer.appendChild(iframe);

    // Add attribution
    const attributionDiv = document.createElement('div');
    attributionDiv.innerHTML = `
      <div style="position: absolute; bottom: 8px; right: 8px; background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" style="color: #333; text-decoration: none;">
          © OpenStreetMap contributors
        </a>
      </div>
    `;
    mapContainer.appendChild(attributionDiv);

  }, [latitude, longitude, zoom, height]);

  return (
    <div 
      ref={mapRef}
      className={cn(
        'relative w-full bg-gray-100 rounded-xl overflow-hidden',
        className
      )}
      style={{ height }}
    />
  );
}

// Alternative implementation using Leaflet (requires additional dependencies)
// Uncomment and install leaflet if you prefer this approach:
/*
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function Map({ 
  latitude, 
  longitude, 
  zoom = 15, 
  className,
  height = '400px',
  markers = []
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([latitude, longitude], zoom);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add main marker
    const mainMarker = L.marker([latitude, longitude]).addTo(map);
    mainMarker.bindPopup('<b>Location</b><br>Main location marker');

    // Add additional markers
    markers.forEach(marker => {
      const markerInstance = L.marker([marker.lat, marker.lng]).addTo(map);
      markerInstance.bindPopup(`
        <b>${marker.title}</b>
        ${marker.description ? `<br>${marker.description}` : ''}
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, markers]);

  return (
    <div 
      ref={mapRef}
      className={cn(
        'w-full bg-gray-100 rounded-xl overflow-hidden',
        className
      )}
      style={{ height }}
    />
  );
}
*/
