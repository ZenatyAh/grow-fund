import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Star } from 'lucide-react';

const MediaGallery = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" />
                    شاهد كيف تصنع النجوم الفرق
                </h2>
                <Button variant="link" className="text-blue-600">كل الفيديوهات</Button>
            </div>

            {/* Main Video Feature */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                    src="/images/home/video-thumb.png"
                    alt="Community Impact Video"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white p-6 rounded-full hover:scale-110 transition-transform duration-300 hover:bg-white hover:text-blue-600 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        <Play className="h-10 w-10 ml-1 fill-current" />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-2xl font-bold mb-2">قصة نجاح: بناء مدرسة الأمل</h3>
                    <p className="text-gray-200 text-lg">شاهد كيف حولت تبرعاتكم حلم قرية كاملة إلى حقيقة.</p>
                </div>
            </div>

            {/* Small Thumbnails Row (Mockup for carousel) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="relative h-32 rounded-lg overflow-hidden cursor-pointer group opacity-70 hover:opacity-100 transition-opacity">
                         <Image
                            src="/images/home/hero-classroom.png" // Reusing hero image for thumbnails
                            alt="Gallery Thumbnail"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                             <Play className="h-6 w-6 text-white opacity-80" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MediaGallery;
