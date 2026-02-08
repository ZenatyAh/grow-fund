import { Star, UserPlus, Heart, Sparkles } from 'lucide-react';

const STEPS = [
    {
        id: 1,
        title: 'كن نجماً معنا',
        description: 'أنشئ حسابك وانضم لمجتمع النجوم في دقائق.',
        icon: UserPlus,
    },
    {
        id: 2,
        title: 'اختر مجرة الخير',
        description: 'تصفح الحملات واختر المشروع الذي يلامس قلبك.',
        icon: Heart,
    },
    {
        id: 3,
        title: 'اصنع أثراً يلمع',
        description: 'تبرع وشارك الخير، وشاهد أثرك يضيء حياة الآخرين.',
        icon: Sparkles,
    }
];

const JoinSteps = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" />
                    كيف تضيء نجماً؟
                </h2>
                <p className="text-gray-600">ثلاث خطوات بسيطة لتكون جزءاً من التغيير</p>
            </div>

            <div className="relative">
                {/* Connecting Line (Dashed) - Only visible on desktop */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-white rounded-full border-2 border-blue-100 flex items-center justify-center shadow-sm mb-6 group-hover:border-blue-500 group-hover:shadow-blue-200 transition-all duration-300 relative">
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                                    {index + 1}
                                </span>
                                <step.icon className="h-10 w-10 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-700 transition-colors">{step.title}</h3>
                            <p className="text-gray-600 max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JoinSteps;
