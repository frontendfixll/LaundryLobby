'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { tenantBlogApi, BlogPost } from '@/services/tenantBlogApi'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Tag,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

// This would be dynamically determined based on subdomain in a real implementation
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || 'default-tenant'
const TENANT_NAME = process.env.NEXT_PUBLIC_TENANT_NAME || 'Help Center'

export default function HelpArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await tenantBlogApi.getTenantPostBySlug(TENANT_ID, slug, 'customer')
      setPost(response.data)
      
      // Fetch related posts if available
      if (response.data?.relatedPosts) {
        setRelatedPosts(response.data.relatedPosts)
      } else {
        // Fetch some recent posts as related
        try {
          const recentResponse = await tenantBlogApi.getTenantRecentPosts(TENANT_ID, 3, 'customer')
          setRelatedPosts((recentResponse.data || []).filter((p: BlogPost) => p._id !== response.data._id))
        } catch (err) {
          console.error('Failed to fetch related posts:', err)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch help article')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const handleFeedback = async (helpful: boolean) => {
    if (!post || feedbackSubmitted) return
    
    try {
      await tenantBlogApi.recordTenantFeedback(TENANT_ID, post.slug, helpful, undefined, 'customer')
      setFeedbackSubmitted(true)
      
      // Update local state
      setPost(prev => prev ? {
        ...prev,
        helpfulCount: helpful ? prev.helpfulCount + 1 : prev.helpfulCount,
        notHelpfulCount: !helpful ? prev.notHelpfulCount + 1 : prev.notHelpfulCount
      } : null)
    } catch (err: any) {
      console.error('Failed to record feedback:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading help article...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Help article not found</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error || 'The help article you\'re looking for doesn\'t exist or has been removed.'}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/help"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Help Center</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/help"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {TENANT_NAME}</span>
            </Link>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              {copySuccess ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video bg-gray-200">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center space-x-4 mb-6">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${post.category.color}20`,
                  color: post.category.color 
                }}
              >
                {post.category.name}
              </span>
              <span className="text-gray-500 text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-gray-500 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime || 5} min read
              </span>
              <span className="text-gray-500 text-sm flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.viewCount} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 mr-2">Tags:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Was this article helpful?
                </h3>
                
                {feedbackSubmitted ? (
                  <div className="text-green-600 font-medium">
                    Thank you for your feedback!
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Yes ({post.helpfulCount})</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>No ({post.notHelpfulCount})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Still need help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/help/${relatedPost.slug}`}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  {relatedPost.featuredImage && (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.readingTime || 5} min
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {relatedPost.viewCount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}