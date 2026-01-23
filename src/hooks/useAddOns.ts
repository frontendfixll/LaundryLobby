/**
 * Custom hooks for add-ons data fetching in frontend-marketing
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchMarketplaceAddOns, fetchAddOnDetails, AddOn, AddOnFilters } from '@/lib/addonsApi'

/**
 * Hook for fetching marketplace add-ons
 */
export function useMarketplaceAddOns(filters: AddOnFilters = {}) {
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState<any>(null)
  const [filterOptions, setFilterOptions] = useState<any>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetchMarketplaceAddOns(filters)
      
      if (response.success) {
        setAddOns(response.data.addOns)
        setPagination(response.data.pagination)
        setFilterOptions(response.data.filters)
      } else {
        throw new Error(response.message || 'Failed to fetch add-ons')
      }
    } catch (err) {
      console.error('Error fetching add-ons:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    addOns,
    loading,
    error,
    pagination,
    filterOptions,
    refetch: fetchData
  }
}

/**
 * Hook for fetching single add-on details
 */
export function useAddOnDetails(addOnId: string | null) {
  const [addOn, setAddOn] = useState<AddOn | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!addOnId) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetchAddOnDetails(addOnId)
      
      if (response.success) {
        setAddOn(response.data.addOn)
      } else {
        throw new Error('Failed to fetch add-on details')
      }
    } catch (err) {
      console.error('Error fetching add-on details:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [addOnId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    addOn,
    loading,
    error,
    refetch: fetchData
  }
}

/**
 * Hook for getting popular add-ons
 */
export function usePopularAddOns(limit: number = 6) {
  return useMarketplaceAddOns({
    sortBy: 'popular',
    limit
  })
}

/**
 * Hook for getting featured add-ons
 */
export function useFeaturedAddOns(limit: number = 3) {
  return useMarketplaceAddOns({
    featured: true,
    limit
  })
}

/**
 * Hook for getting add-ons by category
 */
export function useAddOnsByCategory(category: string, limit?: number) {
  return useMarketplaceAddOns({
    category: category === 'all' ? undefined : category,
    limit
  })
}

/**
 * Hook for searching add-ons
 */
export function useAddOnSearch(searchTerm: string, filters: Omit<AddOnFilters, 'search'> = {}) {
  return useMarketplaceAddOns({
    ...filters,
    search: searchTerm
  })
}