import { Card } from "@/components/shared/Card";
import { Share2, Star, ArrowLeft } from "lucide-react";

export default function ComponentsTestPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#09090b] font-sans p-8" >
            <main className="flex w-full max-w-7xl flex-col gap-10">
                <h1 className="text-3xl font-bold text-white mb-6">components examples</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <Card key={item} className="p-0 overflow-hidden bg-[#1c1c1e] border-0 text-zinc-100 shadow-2xl rounded-3xl group transition-transform duration-300 hover:-translate-y-1">

                            <div className="relative h-56 w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
                                    alt="Campaign"
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-transparent to-transparent opacity-60"></div>

                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/10">
                                    التعليم
                                </div>
                            </div>

                            <div className="px-5 pb-6 pt-2 space-y-5">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-white leading-tight">لوازم مدرسية للأطفال</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed max-w-[95%]">
                                        حملة تهدف لتوفير لوازم مدرسية أساسية للأطفال، لدعم تعليمهم ومنحهم بداية دراسية أفضل.
                                    </p>
                                </div>

                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-medium text-zinc-400">
                                        <span>الهدف : 5000 نجمة</span>
                                        <div className="flex items-center gap-1.5 text-amber-500">
                                            <span className="text-base font-bold text-amber-500">50</span>
                                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-[50%] rounded-full shadow-[0_0_12px_-2px_rgba(245,158,11,0.6)]"></div>
                                    </div>
                                </div>

                                
                                <div className="pt-2 flex items-center justify-between gap-3">
                                    <span className="text-xs font-medium text-zinc-500">منذ أسبوع</span>

                                    <div className="flex items-center gap-2 flex-1 justify-end">
                                        <button className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors flex items-center justify-center border border-zinc-700/50 cursor-pointer">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button className="flex-1 max-w-[140px] bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-900/20 cursor-pointer">
                                            <span>عرض الحملة</span>
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
