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
  author: {
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
}

interface BlogSearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  visibility?: 'platform' | 'tenant' | 'both'
  audience?: 'admin' | 'customer' | 'both'
  tags?: string
}

class BlogAPI {
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

  // Get published blog posts for platform (marketing site)
  async getPosts(params: BlogSearchParams = {}) {
    const searchParams = new URLSearchParams()
    
    // Force platform visibility for marketing site
    searchParams.append('visibility', 'platform')
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.category) searchParams.append('category', params.category)
    if (params.search) searchParams.append('search', params.search)
    if (params.audience) searchParams.append('audience', params.audience)
    if (params.tags) searchParams.append('tags', params.tags)

    const response = await fetch(`${API_BASE_URL}/blog/posts?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get single blog post by slug for marketing site
  async getPostBySlug(slug: string, audience: string = 'both') {
    const searchParams = new URLSearchParams()
    searchParams.append('visibility', 'platform')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get blog categories for marketing site
  async getCategories() {
    const searchParams = new URLSearchParams()
    searchParams.append('visibility', 'platform')

    const response = await fetch(`${API_BASE_URL}/blog/categories?${searchParams}`)
    return this.handleResponse(response)
  }

  // Search blog posts for marketing site
  async searchPosts(query: string, params: BlogSearchParams = {}) {
    const searchParams = new URLSearchParams()
    searchParams.append('q', query)
    searchParams.append('visibility', 'platform')
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.audience) searchParams.append('audience', params.audience)

    const response = await fetch(`${API_BASE_URL}/blog/search?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get popular posts for marketing site
  async getPopularPosts(limit: number = 5, audience: string = 'both') {
    const searchParams = new URLSearchParams()
    searchParams.append('limit', limit.toString())
    searchParams.append('visibility', 'platform')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/popular?${searchParams}`)
    return this.handleResponse(response)
  }

  // Get recent posts for marketing site
  async getRecentPosts(limit: number = 5, audience: string = 'both') {
    const searchParams = new URLSearchParams()
    searchParams.append('limit', limit.toString())
    searchParams.append('visibility', 'platform')
    searchParams.append('audience', audience)

    const response = await fetch(`${API_BASE_URL}/blog/recent?${searchParams}`)
    return this.handleResponse(response)
  }

  // Record feedback (helpful/not helpful) for marketing site
  async recordFeedback(slug: string, helpful: boolean, userId?: string, userType?: string) {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        helpful,
        userId,
        userType: userType || 'anonymous'
      })
    })
    
    return this.handleResponse(response)
  }
}

export const blogApi = new BlogAPI()
export type { BlogPost, BlogCategory, BlogSearchParams }