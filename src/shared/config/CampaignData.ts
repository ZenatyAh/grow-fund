import {
  FaGraduationCap,
  FaHeartbeat,
  FaHome,
  FaLeaf,
  FaPaw,
  FaShieldAlt,
  FaTint,
  FaUtensils,
} from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

export const CampaignCategorys = [
  {
    id: 1,
    Icon: FaGraduationCap,
    name: 'التعليم',
    type: 'education',
  },
  {
    id: 2,
    Icon: FaTint,
    name: 'مياه',
    type: 'water',
  },
  {
    id: 3,
    Icon: FaHome,
    name: 'إيواء',
    type: 'shelter',
  },
  {
    id: 4,
    Icon: FaHeartbeat,
    name: 'صحة',
    type: 'health',
  },
  {
    id: 5,
    Icon: FaLeaf,
    name: 'بيئة',
    type: 'environment',
  },
  {
    id: 6,
    Icon: FaPaw,
    name: 'حيوانات',
    type: 'animals',
  },
  {
    id: 7,
    Icon: FaUtensils,
    name: 'إغاثة غذائية',
    type: 'food_relief',
  },
];

export const BasicCampaignInfoInputs = [
  {
    id: 1,
    label: 'اكتب عنوان حملتك',
    type: 'text',
    name: 'title',
    placeholder: 'مثال: مياه نظيفة للعائلات المحتاجة',
  },
  {
    id: 2,
    label: 'وصف مختصر للحملة',
    type: 'textarea',
    name: 'motivationMessage',
    placeholder: 'اكتب وصف قصيرا يوضح هدف الحملة وتاثيرها',
  },
];

export const CampaignImageStepInputs = [
  {
    id: 1,
    label: 'صورة الحملة',
    type: 'file',
    name: 'file',
  },
  {
    id: 2,
    label: 'وصف الحملة',
    type: 'textarea',
    name: 'description',
    placeholder: 'اشرح فكرة الحملة بشكل أوضح، وما الأثر الذي تسعى لتحقيقه.',
  },
];

export const campaignsDurations = [
  {
    id: 1,
    duration: 30,
  },
  {
    id: 2,
    duration: 60,
  },
  {
    id: 3,
    duration: 90,
  },
];

export const STEPS = [
  { id: 'step-1', label: 'معلومات الحملة الأساسية' },
  { id: 'step-2', label: 'صورة الحملة' },
  { id: 'step-3', label: 'تفاصيل الهدف والتقدّم' },
  { id: 'step-4', label: 'مراجعة الحملة قبل النشر' },
];

export const stepFields = [
  ['title', 'motivationMessage', 'category', 'goal'] as const,
  ['file', 'description'] as const,
  ['startDate', 'endDate'] as const,
  ['checkbox'] as const,
];

export const trackingProgressData = [
  {
    id: 1,
    Icon: FaShieldAlt,
    text: 'نقوم بمراجعة الحملات للتأكد من وضوح الهدف ومصداقية المحتوى قبل نشرها.',
  },
  {
    id: 2,
    Icon: MdAccessTime,
    text: 'تستغرق المراجعة عادة من 24 إلى 48 ساعة.',
  },
];
