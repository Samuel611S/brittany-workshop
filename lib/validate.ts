import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the terms'),
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
export type FeedbackData = z.infer<typeof feedbackSchema>
export type EventData = z.infer<typeof eventSchema>


