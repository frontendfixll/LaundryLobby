// Mock data for when API is unavailable
export const mockBillingPlans = [
  {
    _id: 'free-plan',
    name: 'free',
    displayName: 'Free Plan',
    description: 'Perfect for getting started with basic features',
    price: {
      monthly: 0,
      yearly: 0
    },
    features: {
      max_orders: 100,
      max_staff: 2,
      max_customers: 500,
      max_branches: 1,
      custom_domain: false,
      advanced_analytics: false,
      api_access: false,
      white_label: false,
      priority_support: false,
      custom_branding: false,
      campaigns: false,
      loyalty_points: false,
      inventory_management: true,
      multi_location: false,
      custom_reports: false,
      mobile_app: true,
      sms_notifications: false,
      email_marketing: false,
      pos_integration: false,
      accounting_integration: false
    },
    isPopular: false
  },
  {
    _id: 'basic-plan',
    name: 'basic',
    displayName: 'Basic Plan',
    description: 'Ideal for small to medium laundry businesses',
    price: {
      monthly: 2999,
      yearly: 29990
    },
    features: {
      max_orders: 500,
      max_staff: 5,
      max_customers: 2000,
      max_branches: 2,
      custom_domain: false,
      advanced_analytics: true,
      api_access: false,
      white_label: false,
      priority_support: false,
      custom_branding: true,
      campaigns: true,
      loyalty_points: true,
      inventory_management: true,
      multi_location: false,
      custom_reports: true,
      mobile_app: true,
      sms_notifications: true,
      email_marketing: false,
      pos_integration: false,
      accounting_integration: false
    },
    isPopular: false
  },
  {
    _id: 'pro-plan',
    name: 'pro',
    displayName: 'Pro Plan',
    description: 'Most popular choice for growing businesses',
    price: {
      monthly: 4999,
      yearly: 49990
    },
    features: {
      max_orders: -1,
      max_staff: 15,
      max_customers: -1,
      max_branches: 5,
      custom_domain: true,
      advanced_analytics: true,
      api_access: true,
      white_label: false,
      priority_support: true,
      custom_branding: true,
      campaigns: true,
      loyalty_points: true,
      inventory_management: true,
      multi_location: true,
      custom_reports: true,
      mobile_app: true,
      sms_notifications: true,
      email_marketing: true,
      pos_integration: true,
      accounting_integration: false
    },
    isPopular: true,
    badge: 'Most Popular'
  },
  {
    _id: 'enterprise-plan',
    name: 'enterprise',
    displayName: 'Enterprise Plan',
    description: 'Complete solution for large operations',
    price: {
      monthly: 9999,
      yearly: 99990
    },
    features: {
      max_orders: -1,
      max_staff: -1,
      max_customers: -1,
      max_branches: -1,
      custom_domain: true,
      advanced_analytics: true,
      api_access: true,
      white_label: true,
      priority_support: true,
      custom_branding: true,
      campaigns: true,
      loyalty_points: true,
      inventory_management: true,
      multi_location: true,
      custom_reports: true,
      mobile_app: true,
      sms_notifications: true,
      email_marketing: true,
      pos_integration: true,
      accounting_integration: true
    },
    isPopular: false,
    badge: 'Best Value'
  }
]