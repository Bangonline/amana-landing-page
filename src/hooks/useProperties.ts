/**
 * React hooks for property data
 * 
 * These hooks provide easy access to the dynamic property feed
 * with built-in caching, loading states, and error handling.
 */

import { useState, useEffect, useMemo } from 'react';
import { Property, PropertyFilters, VillageSlug } from '@/types/property';

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  total: number;
  lastSync: string | null;
  refetch: () => Promise<void>;
}

interface UsePropertiesOptions {
  village?: VillageSlug | 'all';
  status?: string[];
  type?: string[];
  priceRange?: [number, number];
  bedrooms?: number[];
  bathrooms?: number[];
  autoRefetch?: boolean;
  refetchInterval?: number;
}

/**
 * Main hook for fetching properties with filters
 */
export function useProperties(options: UsePropertiesOptions = {}): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Build query string from options
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    
    if (options.village && options.village !== 'all') {
      params.set('village', options.village);
    }
    if (options.status?.length) {
      params.set('status', options.status.join(','));
    }
    if (options.type?.length) {
      params.set('type', options.type.join(','));
    }
    if (options.priceRange) {
      if (options.priceRange[0] > 0) params.set('minPrice', options.priceRange[0].toString());
      if (options.priceRange[1] < Infinity) params.set('maxPrice', options.priceRange[1].toString());
    }
    if (options.bedrooms?.length) {
      params.set('beds', options.bedrooms.join(','));
    }
    if (options.bathrooms?.length) {
      params.set('baths', options.bathrooms.join(','));
    }

    return params.toString();
  }, [options]);

  // Fetch function
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `/api/properties${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch properties');
      }

      setProperties(data.properties || []);
      setTotal(data.total || 0);
      setLastSync(data.metadata?.lastSync || null);

    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setProperties([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and dependency updates
  useEffect(() => {
    fetchProperties();
  }, [queryString]);

  // Auto-refetch interval
  useEffect(() => {
    if (!options.autoRefetch || !options.refetchInterval) return;

    const interval = setInterval(() => {
      fetchProperties();
    }, options.refetchInterval);

    return () => clearInterval(interval);
  }, [options.autoRefetch, options.refetchInterval, queryString]);

  return {
    properties,
    loading,
    error,
    total,
    lastSync,
    refetch: fetchProperties
  };
}

/**
 * Hook for a specific village's properties
 */
export function useVillageProperties(village: VillageSlug) {
  return useProperties({ village });
}

/**
 * Hook for available properties only
 */
export function useAvailableProperties(options: Omit<UsePropertiesOptions, 'status'> = {}) {
  return useProperties({ ...options, status: ['available'] });
}

/**
 * Hook for properties with specific filters and real-time updates
 */
export function useFilteredProperties(filters: PropertyFilters) {
  return useProperties({
    village: filters.village?.[0] || 'all',
    status: filters.status,
    type: filters.type,
    priceRange: filters.priceRange,
    bedrooms: filters.bedrooms,
    bathrooms: filters.bathrooms,
    autoRefetch: true,
    refetchInterval: 5 * 60 * 1000 // 5 minutes
  });
}

/**
 * Hook for triggering property sync
 */
export function usePropertySync() {
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncResult, setLastSyncResult] = useState<any>(null);

  const triggerSync = async (force = false) => {
    try {
      setSyncing(true);
      setSyncError(null);

      const url = `/api/properties/sync${force ? '?force=true' : ''}`;
      const response = await fetch(url, { method: 'GET' });
      
      const result = await response.json();
      setLastSyncResult(result);

      if (!result.success) {
        throw new Error(result.error || 'Sync failed');
      }

      return result;

    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown sync error';
      setSyncError(error);
      throw err;
    } finally {
      setSyncing(false);
    }
  };

  return {
    triggerSync,
    syncing,
    syncError,
    lastSyncResult
  };
}

/**
 * Hook for property statistics
 */
export function usePropertyStats(village?: VillageSlug) {
  const { properties, loading } = useProperties({ village });

  const stats = useMemo(() => {
    if (loading || properties.length === 0) {
      return {
        total: 0,
        available: 0,
        sold: 0,
        apartments: 0,
        villas: 0,
        averagePrice: 0,
        priceRange: [0, 0] as [number, number]
      };
    }

    const available = properties.filter(p => p.status === 'available').length;
    const sold = properties.filter(p => p.status === 'sold').length;
    const apartments = properties.filter(p => p.type === 'apartment').length;
    const villas = properties.filter(p => p.type === 'villa').length;
    
    const prices = properties.map(p => p.price).filter(p => p > 0);
    const averagePrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const priceRange: [number, number] = prices.length > 0 ? [Math.min(...prices), Math.max(...prices)] : [0, 0];

    return {
      total: properties.length,
      available,
      sold,
      apartments,
      villas,
      averagePrice: Math.round(averagePrice),
      priceRange
    };
  }, [properties, loading]);

  return { stats, loading };
}