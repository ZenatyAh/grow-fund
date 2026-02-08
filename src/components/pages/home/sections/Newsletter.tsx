import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming Input exists, if not I'll need to check/create.
import { Mail } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="bg-blue-50 py-16">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            اشترك في نشرة النجوم
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            كن أول من يعرف عن حملاتنا الجديدة وقصص النجاح التي نصنعها معاً. نعدك بمحتوى ملهم فقط.
                        </p>

                        <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <Input 
                                type="email" 
                                placeholder="أدخل بريدك الإلكتروني" 
                                className="h-12 text-right bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <Button type="submit" size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                                اشتراك
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
