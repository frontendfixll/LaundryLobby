'use client'

import { useState, useEffect } from 'react'
import { tenantBlogApi, BlogPost, BlogCategory } from '@/services/tenantBlogApi'
import { 
  Search, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Clock, 
  Eye,
  X,
  Loader2,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface TenantHelpCenterProps {
  tenantId: string
  tenantName?: string
  compact?: boolean
  showSearch?: boolean
  maxPosts?: number
  className?: string
}

export default function TenantHelpCenter({ 
  tenantId, 
  tenantName = 'Help Center',
  compact = false,
  showSearch = true,
  maxPosts = 6,
  className = ''
}: TenantHelpCenterProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const [searching, setSearching] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [postsResponse, categoriesResponse, popularResponse] = await Promise.all([
        tenantBlogApi.getTenantPosts(tenantId, { limit: maxPosts, audience: 'customer' }),
        tenantBlogApi.getTenantCategories(tenantId),
        tenantBlogApi.getTenantPopularPosts(tenantId, 3, 'customer')
      ])
      
      setPosts(postsResponse.data || [])
      setCategories(categoriesResponse.data || [])
      setPopularPosts(popularResponse.data || [])
    } catch (err: any) {
      console.error('Failed to fetch help center data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setSearching(true)
      const response = await tenantBlogApi.searchTenantPosts(tenantId, query, { 
        limit: 5, 
        audience: 'customer' 
      })
      setSearchResults(response.data || [])
    } catch (err: any) {
      console.error('Search failed:', err)
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    if (tenantId) {
      fetchData()
    }
  }, [tenantId])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading help articles...</span>
          </div>
        </div>
      </div>
    )
  }

  if (posts.length === 0 && categories.length === 0) {
    return null // Don't show help center if no content
  }

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tenantName} Help Center</h3>
                <p className="text-sm text-gray-600">Find answers to common questions</p>
              </div>
            </div>
            {showSearch && (
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Popular Articles */}
          {popularPosts.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Articles</h4>
              <div className="space-y-2">
                {popularPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/help/${post.slug}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                          {post.title}
                        </h5>
                        <div className="flex items-center text-xs text-gray-500 space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.viewCount}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readingTime || 5} min
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Browse by Category</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.slice(0, compact ? 4 : 6).map((category) => (
                  <Link
                    key={category._id}
                    href={`/help?category=${category._id}`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div 
                      className="p-2 rounded-lg mr-3"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <FileText 
                        className="w-4 h-4"
                        style={{ color: category.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {category.name}
                      </h5>
                      <p className="text-xs text-gray-500">
                        {category.postCount} articles
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent Articles */}
          {posts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">Recent Articles</h4>
                <Link
                  href="/help"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {posts.slice(0, compact ? 3 : 5).map((post) => (
                  <Link
                    key={post._id}
                    href={`/help/${post.slug}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                          {post.title}
                        </h5>
                        <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 space-x-2">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>•</span>
                          <span>{post.readingTime || 5} min read</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Search Help Articles</h3>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {searching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-gray-600">Searching...</span>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-4 space-y-2">
                  {searchResults.map((post) => (
                    <Link
                      key={post._id}
                      href={`/help/${post.slug}`}
                      onClick={() => setShowSearchModal(false)}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">No articles found for "{searchTerm}"</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Start typing to search help articles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}