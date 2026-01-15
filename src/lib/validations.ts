import { z } from 'zod'

export const leadFormSchema = z.object({
  // Contact Info
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
  
  // Business Info
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(200, 'Business name must not exceed 200 characters'),
  businessType: z.enum(['small_laundry', 'chain', 'dry_cleaner', 'other'], {
    errorMap: () => ({ message: 'Please select a business type' }),
  }),
  
  // Address (optional)
  address: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  
  // Plan Interest
  interestedPlan: z.enum(['free', 'basic', 'pro', 'enterprise', 'undecided']).optional(),
  
  // Business Scale
  expectedMonthlyOrders: z.enum(['0-100', '100-500', '500-1000', '1000-5000', '5000+']).optional(),
  currentBranches: z.number().min(1).optional(),
  
  // Additional
  message: z
    .string()
    .max(1000, 'Message must not exceed 1000 characters')
    .optional(),
  source: z.enum(['website', 'pricing_page', 'referral', 'other']).optional(),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>
