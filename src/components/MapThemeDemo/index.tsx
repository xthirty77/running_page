import React, { useState, useRef } from 'react';
import Map, { MapRef } from 'react-map-gl';
import { MAPBOX_TOKEN, MAP_TILE_VENDOR, MAP_TILE_ACCESS_TOKEN } from '@/utils/const';
import { getMapStyleByTheme } from '@/utils/utils';
import useTheme from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';

const MapThemeDemo: React.FC = () => {
  const { theme } = useTheme();
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = useState({
    longitude: 116.3974,
    latitude: 39.9093,
    zoom: 10
  });

  const mapStyle = getMapStyleByTheme(
    MAP_TILE_VENDOR,
    theme,
    MAP_TILE_ACCESS_TOKEN
  );

  return (
    <div className="w-full h-96 relative">
      {/* 主题切换按钮 */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* 地图信息 */}
      <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">地图主题演示</h3>
        <p className="text-sm text-gray-600">
          当前主题: <span className="font-medium">{theme === 'dark' ? '暗黑' : '明亮'}</span>
        </p>
        <p className="text-sm text-gray-600">
          地图样式: <span className="font-medium">{mapStyle.split('/').pop()?.split('?')[0] || 'Mapbox'}</span>
        </p>
      </div>

      {/* Mapbox地图 */}
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      />
    </div>
  );
};

export default MapThemeDemo;
