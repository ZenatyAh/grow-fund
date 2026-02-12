/**
 * Validation schema for individual campaign creator registration
 */

import { z } from 'zod';
import * as yup from 'yup';

import { textOnlyRegex, textWithPunctuationRegex } from '@/utils/regex';

export const registerSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'الاسم الأخير مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  dateOfBirth: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const campaignsCreateSchema = yup.object({
  title: yup
    .string()
    .required('عنوان الحملة مطلوب')
    .matches(
      textOnlyRegex,
      'عنوان الحملة يجب أن يحتوي على نص صحيح فقط بدون رموز غريبة'
    ),
  motivationMessage: yup.string().required('وصف الحملة مطلوب'),

  category: yup.string().required('نوع الحملة مطلوب'),
  goal: yup.number().required('عدد النجوم مطلوب'),
  file: yup.mixed().nullable().notRequired(),
  description: yup
    .string()
    .required('وصف الحملة مطلوب')
    .matches(
      textWithPunctuationRegex,
      'وصف الحملة يجب أن يحتوي على نص صحيح فقط بدون رموز غير مدعومة'
    ),
  startDate: yup.string().required('تاريخ البدء مطلوب'),
  endDate: yup.string().required('تاريخ الإنتهاء مطلوب'),
  checkbox: yup.boolean().oneOf([true, false]),
});
