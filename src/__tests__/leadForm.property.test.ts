/**
 * Feature: marketing-landing-page
 * Property 1: Lead Form Validation Rejects Invalid Input
 * 
 * For any form submission with missing required fields (name, email, phone, 
 * businessName, businessType) or invalid email format, the Lead_Form SHALL 
 * display validation errors and prevent submission.
 * 
 * Validates: Requirements 3.5
 */

import * as fc from 'fast-check'
import { leadFormSchema } from '@/lib/validations'

describe('Property 1: Lead Form Validation Rejects Invalid Input', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    businessName: 'Test Business',
    businessType: 'small_laundry' as const,
    message: 'Test message',
  }

  describe('Missing required fields', () => {
    const requiredFields = ['name', 'email', 'phone', 'businessName', 'businessType'] as const

    test('should reject when any required field is missing (property-based)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...requiredFields),
          (fieldToOmit) => {
            const data = { ...validData }
            delete (data as Record<string, unknown>)[fieldToOmit]

            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 100 }
      )
    })

    test('should reject when any required field is empty string (property-based)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('name', 'email', 'phone', 'businessName'),
          (fieldToEmpty) => {
            const data = { ...validData, [fieldToEmpty]: '' }

            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 100 }
      )
    })

    test('should reject when multiple required fields are missing', () => {
      fc.assert(
        fc.property(
          fc.subarray(requiredFields, { minLength: 1 }),
          (fieldsToOmit) => {
            const data = { ...validData }
            fieldsToOmit.forEach(field => {
              delete (data as Record<string, unknown>)[field]
            })

            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Invalid email format', () => {
    test('should reject invalid email formats (property-based)', () => {
      const invalidEmailGenerators = [
        // Missing @
        fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 20 }),
        // Missing domain
        fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }).map(s => `${s}@`),
        // Missing local part
        fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }).map(s => `@${s}.com`),
        // Double @
        fc.tuple(
          fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 5 }),
          fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 5 })
        ).map(([a, b]) => `${a}@@${b}.com`),
        // Spaces in email
        fc.tuple(
          fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 5 }),
          fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 5 })
        ).map(([a, b]) => `${a} ${b}@test.com`),
      ]

      invalidEmailGenerators.forEach((generator, index) => {
        fc.assert(
          fc.property(generator, (invalidEmail) => {
            const data = { ...validData, email: invalidEmail }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }),
          { numRuns: 20 }
        )
      })
    })

    test('should accept valid email formats (property-based)', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }),
            fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }),
            fc.constantFrom('com', 'org', 'net', 'io')
          ),
          ([local, domain, tld]) => {
            const validEmail = `${local}@${domain}.${tld}`
            const data = { ...validData, email: validEmail }
            const result = leadFormSchema.safeParse(data)
            return result.success
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('Invalid business type', () => {
    test('should reject invalid business types (property-based)', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 20 }).filter(
            s => !['small_laundry', 'chain', 'dry_cleaner', 'other'].includes(s)
          ),
          (invalidType) => {
            const data = { ...validData, businessType: invalidType }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 100 }
      )
    })

    test('should accept all valid business types', () => {
      const validTypes = ['small_laundry', 'chain', 'dry_cleaner', 'other'] as const

      validTypes.forEach(type => {
        const data = { ...validData, businessType: type }
        const result = leadFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Field length constraints', () => {
    test('should reject name shorter than 2 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 0, maxLength: 1 }),
          (shortName) => {
            const data = { ...validData, name: shortName }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 50 }
      )
    })

    test('should reject name longer than 100 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 101, maxLength: 200 }),
          (longName) => {
            const data = { ...validData, name: longName }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 50 }
      )
    })

    test('should reject phone shorter than 10 digits', () => {
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), { minLength: 1, maxLength: 9 }),
          (shortPhone) => {
            const data = { ...validData, phone: shortPhone }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 50 }
      )
    })

    test('should reject message longer than 1000 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1001, maxLength: 1500 }),
          (longMessage) => {
            const data = { ...validData, message: longMessage }
            const result = leadFormSchema.safeParse(data)
            return !result.success
          }
        ),
        { numRuns: 20 }
      )
    })
  })

  describe('Valid data acceptance', () => {
    test('should accept valid data with all fields (property-based)', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 2, maxLength: 100 }),
            email: fc.tuple(
              fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }),
              fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 })
            ).map(([a, b]) => `${a}@${b}.com`),
            phone: fc.stringOf(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), { minLength: 10, maxLength: 15 }),
            businessName: fc.string({ minLength: 2, maxLength: 200 }),
            businessType: fc.constantFrom('small_laundry', 'chain', 'dry_cleaner', 'other'),
            message: fc.option(fc.string({ minLength: 0, maxLength: 1000 }), { nil: undefined }),
          }),
          (data) => {
            const result = leadFormSchema.safeParse(data)
            return result.success
          }
        ),
        { numRuns: 100 }
      )
    })

    test('should accept valid data without optional message', () => {
      const dataWithoutMessage = { ...validData }
      delete (dataWithoutMessage as Record<string, unknown>).message

      const result = leadFormSchema.safeParse(dataWithoutMessage)
      expect(result.success).toBe(true)
    })
  })
})
