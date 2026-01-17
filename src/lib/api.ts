import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface LeadFormData {
  name: string
  email: string
  phone: string
  businessName: string
  businessType: 'small_laundry' | 'chain' | 'dry_cleaner' | 'other'
  interestedPlan?: string
  expectedMonthlyOrders?: string
  currentBranches?: number
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    pincode?: string
    country?: string
  }
  message?: string
  source?: 'website' | 'pricing_page' | 'referral' | 'other'
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: Array<{ field: string; message: string }>
}

export async function submitLead(data: LeadFormData): Promise<ApiResponse<{ leadId: string }>> {
  const response = await api.post<ApiResponse<{ leadId: string }>>('/public/leads', data)
  return response.data
}

export default api
