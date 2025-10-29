import { z } from 'zod'

export const phoneSchema = z.string().regex(/^[0-9]{10,15}$/, { message: 'Enter a valid phone number' })

export const formSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name required' }),
  email: z.email().trim().min(1, { message: 'Email required' }),
  phone: phoneSchema,
  plan: z.enum(["arcade", "advanced", "pro"]),
  period: z.enum(["monthly", "yearly"]),
  onlineservice: z.boolean().optional(),
  largerstorage: z.boolean().optional(),
  customizableprofile: z.boolean().optional(),
})

export type FormType = z.infer<typeof formSchema>