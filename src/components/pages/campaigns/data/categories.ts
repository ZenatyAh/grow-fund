import {
  BookOpen,
  Cat,
  Droplets,
  Filter,
  Heart,
  Home,
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: Filter, isDefault: true },
  { id: 'education', label: 'تعليم', icon: BookOpen },
  { id: 'water', label: 'مياه', icon: Droplets },
  { id: 'shelter', label: 'إيواء', icon: Home },
  { id: 'health', label: 'صحة', icon: Heart },
  { id: 'environment', label: 'بيئة', icon: Filter }, // Placeholder icon
  { id: 'animals', label: 'حيوانات', icon: Cat },
  { id: 'food', label: 'إغاثة غذائية', icon: Filter }, // Placeholder icon
];

export const DEFAULT_CATEGORY_ID =
  CATEGORIES.find((category) => category.isDefault)?.id ?? '';

export const CATEGORY_LABEL_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category.label])
);

export const CATEGORY_LABEL_BY_API = {
  EDUCATION: "تعليم",
  WATER: "مياه",
  SHELTER: "إيواء",
  HEALTH: "صحة",
  ENVIRONMENT: "بيئة",
  ANIMALS: "حيوانات",
  FOOD: "إغاثة غذائية",
} as const;
