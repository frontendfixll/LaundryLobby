'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, 
  Users, 
  Zap, 
  TrendingUp, 
  Globe, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Plus
} from 'lucide-react'
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

const categoryIcons = {
  capacity: Users,
  feature: Zap,
  usage: TrendingUp,
  branding: Globe,
  integration: Package,
  support: Shield
}

const featuredAddOns = [
  {
    id: 'campaign-manager',
    name: 'Campaign Manager',
    category: 'feature',
    price: { monthly: 799, yearly: 7990 },
    description: 'Create promotional campaigns and boost custome