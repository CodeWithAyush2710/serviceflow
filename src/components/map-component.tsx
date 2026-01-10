'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { type FC } from 'react';

// IMPORTANT: You need to add your Google Maps API key to your environment variables.
// Create a .env.local file in the root of your project and add the following line:
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY_HERE"

type MapComponentProps = {
  center: { lat: number; lng: number };
  markers?: { lat: number; lng: number }[];
  zoom?: number;
};

const MapComponent: FC<MapComponentProps> = ({ center, markers, zoom = 12 }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="text-center p-4">
            <h3 className="font-semibold text-lg text-muted-foreground">Map Unavailable</h3>
            <p className="text-sm text-muted-foreground mt-1">
            Please provide a Google Maps API Key in your environment variables to enable this feature.
            </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="serviceflow-map"
        disableDefaultUI={true}
        gestureHandling={'greedy'}
        className='w-full h-full'
      >
        {markers?.map((marker, index) => (
          <AdvancedMarker key={index} position={marker}>
            <Pin />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
