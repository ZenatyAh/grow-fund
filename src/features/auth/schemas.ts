/**
 * Validation schema for individual campaign creator registration
 */

import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'الاسم الأخير مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  dateOfBirth: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
