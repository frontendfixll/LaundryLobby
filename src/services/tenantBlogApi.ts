const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  category: {
    _id: string
    name: string
    slug: string
    color: string
    icon: string
  }
  tenantAuthor?: {
    name: string
  }
  visibility: 'platform' | 'tenant' | 'both'
  targetAudience: 'admin' | 'customer' | 'both'
  publishedAt: string
  viewCount: number
  helpfulCount: number
  notHelpfulCount: number
  readingTime: number
  tags: string[]
  featuredImage?: string
  relatedPosts?: BlogPost[]
  metaTitle?: string
  metaDescription?: string
  tenantId: string
}

interface BlogCategory {
  _id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  visibility: 'platform' | 'tenant' | 'both'
  postCount: number
  tenantId?: string
}

interface BlogSearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  audience?: 'admin' | 'customer' | 'both'
  tags?: string
}

class TenantBlogAPI {
  private async handleResponse(response: Response) {
    const contentType = response.headers.get('content-type')
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      throw new Error(`Server returned non-JSON response. Status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  }

  // Get published blog posts for a specific tenant (for customer landing pages)
  async getTenantPosts(tenantId: string, params: BlogSearchParams = {}) {
    const searchParams = new URLSearchParams()
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')
    searchParams.append('audience', params.audience || 'customer')
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.category) searchParams.append('category', params.category)
    if (params.search) searchParams.append('search', params.search)
    if (params.tags) searchParams.append('tags', params.tags)

    const response = await fetch(`${API_BASE_URL}/blog/posts?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get single blog post by slug for tenant landing page
  async getTenantPostBySlug(tenantId: string, slug: string, audience: string = 'customer') {
    const searchParams = new URLSearchParams()
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get blog categories for tenant landing page
  async getTenantCategories(tenantId: string) {
    const searchParams = new URLSearchParams()
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')

    const response = await fetch(`${API_BASE_URL}/blog/categories?${searchParams}`)
    return this.handleResponse(response)
  }

  // Search blog posts for tenant landing page
  async searchTenantPosts(tenantId: string, query: string, params: BlogSearchParams = {}) {
    const searchParams = new URLSearchParams()
    searchParams.append('q', query)
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')
    searchParams.append('audience', params.audience || 'customer')
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())

    const response = await fetch(`${API_BASE_URL}/blog/search?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get popular posts for tenant landing page
  async getTenantPopularPosts(tenantId: string, limit: number = 5, audience: string = 'customer') {
    const searchParams = new URLSearchParams()
    searchParams.append('limit', limit.toString())
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/popular?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get recent posts for tenant landing page
  async getTenantRecentPosts(tenantId: string, limit: number = 5, audience: string = 'customer') {
    const searchParams = new URLSearchParams()
    searchParams.append('limit', limit.toString())
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/recent?${searchParams}`)
    return this.handleResponse(response)
  }

  // Record feedback for tenant posts
  async recordTenantFeedback(tenantId: string, slug: string, helpful: boolean, userId?: string, userType?: string) {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        helpful,
        userId,
        userType: userType || 'customer',
        tenantId
      })
    })
    
    return this.handleResponse(response)
  }

  // Get tenant blog stats (for help center widget)
  async getTenantBlogStats(tenantId: string) {
    const searchParams = new URLSearchParams()
    searchParams.append('tenantId', tenantId)
    searchParams.append('visibility', 'tenant')

    const response = await fetch(`${API_BASE_URL}/blog/stats?${searchParams}`)
    return this.handleResponse(response)
  }
}

export const tenantBlogApi = new TenantBlogAPI()
export type { BlogPost, BlogCategory, BlogSearchParams }