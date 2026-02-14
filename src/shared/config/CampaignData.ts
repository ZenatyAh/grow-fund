import {
  FaGraduationCap,
  FaHeartbeat,
  FaHome,
  FaLeaf,
  FaPaw,
  FaTint,
  FaUtensils,
} from 'react-icons/fa';

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
