import { Edit, Star } from 'lucide-react';

export const GetCampaignInfo = (values: any, days: number) => [
  {
    id: 1,
    title: 'اسم الحملة',
    type: 'text',
    name: 'title',
    description: values.title,
    Icon: Edit,
  },
  {
    id: 2,
    title: 'وصف الحملة',
    type: 'text',
    name: 'description',
    description: values.description,
    Icon: Edit,
  },
  {
    id: 3,
    title: 'الهدف',
    type: 'number',
    name: 'goal',
    description: values.goal,
    Icon: Edit,
    descIcon: Star,
  },
  {
    id: 4,
    title: 'المدة',
    type: 'date',
    name: 'duration',
    description: `${days} يوم`,
    Icon: Edit,
  },
];

export const dateInputs = [
  {
    id: 1,
    type: 'date',
    name: 'startDate',
    label: 'تاريخ بداية الحملة',
  },
  {
    id: 2,
    type: 'date',
    name: 'endDate',
    label: 'تاريخ إنتهاء الحملة',
  },
];
