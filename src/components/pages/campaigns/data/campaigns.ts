export type DummyCampaign = {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  createdAt: string;
  description: string;
  raised: number;
  goal: number;
  daysLeft: number;
  executor: string;
  scope: string;
  shares: number;
  views: number;
  location?: string;
  creatorName?: string;
  about?: string;
  highlights?: string[];
};

export const CAMPAIGNS: DummyCampaign[] = [
  {
    id: 1,
    title: 'حملة سلة الخير: ساهم في توفير الغذاء للأسر المتعففة',
    image: '/images/home/background.png',
    category: 'إغاثة غذائية',
    date: 'تم نشر في 1/1/2025',
    createdAt: '2025-01-01',
    description:
      'في أزقة خانيونس وقطاع غزة، لم تعد  مجرد حاجة يومية، بل أصبحت صراعاً من أجل البقاء. آلاف الأسر المتعففة وجدت نفسها فجأة بلا مأوى وبلا مصدر دخل، تواجه شبح الجوع بصمت وصبر. الأطفال ينامون ببطون خاوية، والآباء يقفون عاجزين أمام غلاء الأسعار الفاحش وانقطاع المواد الأساسية.',
    raised: 154700,
    goal: 5200000,
    daysLeft: 5,
    executor: 'trusted_org',
    scope: 'local',
    shares: 240,
    views: 1200,
    location: 'غزة، فلسطين',
    creatorName: 'عبدالله قاسم',
    about:
      'في هذه الحملة نسعى لتأمين سلال غذائية متكاملة للأسر المتعففة في قطاع غزة. هدفنا توفير احتياجات أساسية تعينهم على تجاوز الظروف الصعبة وتمنحهم الأمان الغذائي.',
    highlights: [
      'أرز، معكرونة، سكر، زيت، وعدس.',
      'معلبات أساسية (تونة، فول).',
      'مواد نظافة شخصية للعائلة.',
      'حليب ووجبات مغذية للأطفال.',
    ],
  },
  {
    id: 2,
    title: 'سقيا رحمة: مياه نقية للمحتاجين',
    image: '/images/home/background.png',
    category: 'مياه',
    date: 'تم نشر في 5/1/2025',
    createdAt: '2025-01-05',
    description:
      'مشروع حفر آبار وتوفير محطات تحلية للمياه في المناطق النائية التي تعاني من شح المياه الصالحة للشرب.',
    raised: 89000,
    goal: 150000,
    daysLeft: 12,
    executor: 'official_org',
    scope: 'regional',
    shares: 140,
    views: 980,
    location: 'جنوب القطاع',
    creatorName: 'مبادرة سقيا',
    about:
      'مشروع يوفر مياه شرب آمنة للمجتمعات البعيدة مع ضمان الاستدامة عبر صيانة دورية.',
    highlights: [
      'حفر آبار جديدة.',
      'تجهيز محطات تحلية صغيرة.',
      'توفير خزانات توزيع.',
    ],
  },
  {
    id: 3,
    title: 'ترميم منازل الفقراء',
    image: '/images/home/background.png',
    category: 'إيواء',
    date: 'تم نشر في 12/1/2025',
    createdAt: '2025-01-12',
    description:
      'ساعد في ترميم منازل الأسر الأشد احتياجًا لتوفير مأوى آمن وكريم يحميهم من تقلبات الطقس.',
    raised: 230000,
    goal: 400000,
    daysLeft: 3,
    executor: 'community_initiative',
    scope: 'local',
    shares: 310,
    views: 1500,
    location: 'الشمال',
    creatorName: 'لجنة الإيواء',
    about:
      'نسعى لتأهيل المنازل المتضررة وتوفير مأوى كريم للأسر الأكثر احتياجًا.',
    highlights: ['ترميم الأسقف والجدران.', 'تأمين مستلزمات السلامة.'],
  },
  {
    id: 4,
    title: 'علاج مرضى الفشل الكلوي',
    image: '/images/home/background.png',
    category: 'صحة',
    date: 'تم نشر في 15/1/2025',
    createdAt: '2025-01-15',
    description:
      'دعم تكاليف جلسات الغسيل الكلوي للمرضى غير القادرين، وتوفير الأدوية اللازمة لهم.',
    raised: 78000,
    goal: 250000,
    daysLeft: 8,
    executor: 'trusted_org',
    scope: 'regional',
    shares: 90,
    views: 620,
    location: 'غزة',
    creatorName: 'جمعية الرحمة',
    about:
      'يقدم الدعم الطبي للمرضى لضمان استمرار العلاج وتخفيف الأعباء المالية.',
    highlights: ['تغطية جلسات غسيل الكلى.', 'توفير الأدوية الأساسية.'],
  },
  {
    id: 5,
    title: 'الحقيبة المدرسية',
    image: '/images/home/background.png',
    category: 'تعليم',
    date: 'تم نشر في 20/1/2025',
    createdAt: '2025-01-20',
    description:
      'توفير الحقائب المدرسية والقرطاسية للطلاب والطالبات من الأسر ذوي الدخل المحدود.',
    raised: 12000,
    goal: 50000,
    daysLeft: 10,
    executor: 'official_org',
    scope: 'international',
    shares: 60,
    views: 410,
    location: 'المحافظات',
    creatorName: 'مؤسسة التعليم',
    about: 'نساعد الطلاب على بدء عامهم الدراسي بوسائل تعليمية متكاملة.',
    highlights: ['حقائب مدرسية.', 'قرطاسية كاملة.'],
  },
  {
    id: 6,
    title: 'حماية الحياة البرية المحلية',
    image: '/images/home/background.png',
    category: 'بيئة',
    date: 'تم نشر في 11/2/2025',
    createdAt: '2025-02-11',
    description:
      'برنامج توعوي وميداني لحماية الموائل الطبيعية والحياة البرية في المنطقة.',
    raised: 48000,
    goal: 130000,
    daysLeft: 6,
    executor: 'international_partner',
    scope: 'international',
    shares: 200,
    views: 840,
    location: 'الساحل',
    creatorName: 'بيئة مستدامة',
    about:
      'نعمل على الحفاظ على التنوع الحيوي من خلال حملات توعية وأنشطة ميدانية.',
    highlights: ['حملات توعوية.', 'تنظيف الشواطئ.'],
  },
  {
    id: 7,
    title: 'إنقاذ الحيوانات المصابة',
    image: '/images/home/background.png',
    category: 'حيوانات',
    date: 'تم نشر في 14/2/2025',
    createdAt: '2025-02-14',
    description:
      'توفير الرعاية البيطرية للحيوانات المصابة وإعادة تأهيلها وإطلاقها.',
    raised: 37000,
    goal: 95000,
    daysLeft: 4,
    executor: 'community_initiative',
    scope: 'local',
    shares: 180,
    views: 760,
    location: 'غزة',
    creatorName: 'فريق الإنقاذ',
    about: 'تقديم رعاية بيطرية عاجلة للحيوانات المصابة وإعادة دمجها في بيئتها.',
    highlights: ['علاج بيطري عاجل.', 'تأهيل وإطلاق.'],
  },
  {
    id: 8,
    title: 'ترميم مدرسة الأمل (مكتملة)',
    image: '/images/home/background.png',
    category: 'تعليم',
    date: 'تم نشر في 22/2/2025',
    createdAt: '2025-02-22',
    description:
      'حملة مكتملة لترميم مدرسة الأمل وتأمين بيئة تعليمية آمنة للطلاب.',
    raised: 300000,
    goal: 300000,
    daysLeft: 0,
    executor: 'official_org',
    scope: 'local',
    shares: 420,
    views: 2300,
    location: 'الوسطى',
    creatorName: 'مبادرة التعليم الآمن',
    about:
      'تم تنفيذ أعمال الترميم وتأمين الفصول والمرافق الأساسية لضمان استمرارية التعليم.',
    highlights: [
      'ترميم الصفوف المتضررة.',
      'تجهيز المرافق الصحية.',
      'تحديث التجهيزات الأساسية.',
    ],
  },
];
