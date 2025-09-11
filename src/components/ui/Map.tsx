'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
  height?: string;
  title?: string;
  address?: string;
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
  title = 'Village Location',
  address = '',
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map container
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Calculate bbox for proper zoom
    const offset = 0.005; // Smaller offset for better zoom
    const bbox = `${longitude-offset},${latitude-offset},${longitude+offset},${latitude+offset}`;

    // Create iframe for OpenStreetMap with marker
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
    iframe.width = '100%';
    iframe.height = height;
    iframe.frameBorder = '0';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '0.75rem';
    iframe.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

    mapContainer.appendChild(iframe);

    // Add custom info overlay
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
      <div style="position: absolute; top: 12px; left: 12px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); max-width: 250px; z-index: 10;">
        <h4 style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px; color: #1f2937;">${title}</h4>
        ${address ? `<p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.4;">${address}</p>` : ''}
      </div>
    `;
    mapContainer.appendChild(infoDiv);

    // Add attribution
    const attributionDiv = document.createElement('div');
    attributionDiv.innerHTML = `
      <div style="position: absolute; bottom: 8px; right: 8px; background: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 10;">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" style="color: #6b7280; text-decoration: none;">
          © OpenStreetMap contributors
        </a>
      </div>
    `;
    mapContainer.appendChild(attributionDiv);

  }, [latitude, longitude, zoom, height, title, address]);

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
