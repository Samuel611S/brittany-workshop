import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the terms'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(500, 'Bio too long').optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
})

export const feedbackSchema = z.object({
  message: z.string().min(1, 'Message is required').max(1000, 'Message too long'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  name: z.string().optional(),
})

export const eventSchema = z.object({
  type: z.enum(['signup', 'clickedStart', 'outboundCourse']),
  meta: z.record(z.any()).optional(),
})

export type SignupData = z.infer<typeof signupSchema>
export type LoginData = z.infer<typeof loginSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type FeedbackData = z.infer<typeof feedbackSchema>
export type EventData = z.infer<typeof eventSchema>


