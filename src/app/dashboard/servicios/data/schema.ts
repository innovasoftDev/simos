import { z } from 'zod'

//! Users

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('normal'),
])
export type UserRole = z.infer<typeof userRoleSchema>

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

//? Services

const serviceStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type ServiceStatus = z.infer<typeof serviceStatusSchema>

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  server: z.string(),
  status: serviceStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Service = z.infer<typeof serviceSchema>

export const serviceListSchema = z.array(serviceSchema)
export const userListSchema = z.array(userSchema)


