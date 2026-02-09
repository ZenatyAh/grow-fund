'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import Logo from '@/shared/ui/components/Logo';
import { FaUser, FaBuilding, FaCheck, FaTint, FaHome, FaHeart, FaLeaf, FaAppleAlt, FaPaw, FaGraduationCap } from 'react-icons/fa';
import { CategoryButton } from '@/components/shared/CategoryButton';

type CreatorType = 'individual' | 'organization' | null;
type CampaignCategory = 'water' | 'shelter' | 'health' | 'environment' | 'food' | 'animals' | 'education' | null;

const ProfileSetupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [creatorType, setCreatorType] = useState<CreatorType>('individual'); 
  const [campaignCategory, setCampaignCategory] = useState<CampaignCategory>('water'); // Default to water based on image

  const steps = [
    { number: 1, label: 'نوع المنشئ' },
    { number: 2, label: 'نوع الحملات' },
    { number: 3, label: 'الخبرة والنية' },
    { number: 4, label: 'معلومات أساسية للثقة' },
  ];

  const categories = [
    { id: 'water', label: 'مياه', icon: <FaTint size={20} /> },
    { id: 'shelter', label: 'إيواء', icon: <FaHome size={20} /> },
    { id: 'health', label: 'صحة', icon: <FaHeart size={20} /> },
    { id: 'environment', label: 'بيئة', icon: <FaLeaf size={20} /> },
    { id: 'food', label: 'إغاثة غذائية', icon: <FaAppleAlt size={20} /> },
    { id: 'animals', label: 'حيوانات', icon: <FaPaw size={20} /> },
    { id: 'education', label: 'تعليم', icon: <FaGraduationCap size={20} /> },
  ];

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-4 md:p-8 box-border"
      dir="rtl"
    >
      <div className="w-full max-w-[1440px] min-h-[700px] flex gap-6 relative items-stretch">
        
        {/* Sidebar (Stepper) - Right Card */}
        <div className="w-[30%] lg:w-[25%] bg-white border border-[#E5E7EB] rounded-[32px] md:rounded-[40px] hidden md:flex flex-col items-center justify-center p-8 relative shadow-sm">
           <div className="flex flex-col gap-10 w-full max-w-[200px]">
               {steps.map((step) => (
                   <div key={step.number} className="flex items-center gap-4 relative">
                       {/* Step Circle */}
                       <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 shrink-0
                          ${currentStep === step.number 
                              ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200' 
                              : currentStep > step.number 
                                  ? 'bg-[#2563EB] text-white' 
                                  : 'bg-[#94A3B8] text-white'}
                       `}>
                          {currentStep > step.number ? <FaCheck size={16} /> : step.number}
                       </div>

                       {/* Step Label */}
                       <span className={`
                          text-base font-medium transition-colors duration-300
                          ${currentStep === step.number 
                              ? 'text-[#2563EB]' 
                              : currentStep > step.number 
                                  ? 'text-[#0F172A]' 
                                  : 'text-[#64748B]'}
                       `}>
                          {step.label}
                       </span>
                   </div>
               ))}
           </div>
        </div>

        {/* Main Content Area (Form) - Left Card */}
        <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[32px] md:rounded-[40px] flex flex-col p-8 md:p-14 overflow-hidden relative shadow-sm">
          
          {/* Logo inside Content - Top Right */}
          <div className="absolute top-8 right-8 z-10">
             <Logo />
          </div>

          <div className="flex-1 flex flex-col justify-center mt-12 md:mt-0">
              
              {/* Step 1: Creator Type */}
              {currentStep === 1 && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full justify-center">
                      <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl md:text-[32px] font-bold text-[#0F172A] mb-12 text-center">
                            كيف تود إنشاء الحملات على نجومي؟
                        </h1>

                        <div className="flex flex-col gap-4 mb-20">
                            {/* Individual Option */}
                            <div 
                                onClick={() => setCreatorType('individual')}
                                className={`
                                    cursor-pointer flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 h-[88px]
                                    ${creatorType === 'individual' 
                                        ? 'bg-[#EFF6FF] border-[#3B82F6]' 
                                        : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'}
                                `}
                            >
                                 <div className="flex items-center gap-4">
                                     <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                        ${creatorType === 'individual' ? 'bg-[#3B82F6] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}
                                     `}>
                                         <FaUser size={18} />
                                     </div>
                                     <span className={`text-base font-medium ${creatorType === 'individual' ? 'text-[#1E3A8A]' : 'text-[#475569]'}`}>
                                        فردي
                                    </span>
                                 </div>

                                 <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${creatorType === 'individual' ? 'border-[#3B82F6]' : 'border-[#CBD5E1]'}
                                 `}>
                                     {creatorType === 'individual' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
                                 </div>
                            </div>

                            {/* Organization Option */}
                            <div 
                                onClick={() => setCreatorType('organization')}
                                className={`
                                    cursor-pointer flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 h-[88px]
                                    ${creatorType === 'organization' 
                                        ? 'bg-[#EFF6FF] border-[#3B82F6]' 
                                        : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'}
                                `}
                            >
                                 <div className="flex items-center gap-4">
                                     <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                        ${creatorType === 'organization' ? 'bg-[#3B82F6] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}
                                     `}>
                                         <FaBuilding size={18} />
                                     </div>
                                     <span className={`text-base font-medium ${creatorType === 'organization' ? 'text-[#1E3A8A]' : 'text-[#475569]'}`}>
                                        مؤسسة / جمعية
                                    </span>
                                 </div>

                                 <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${creatorType === 'organization' ? 'border-[#3B82F6]' : 'border-[#CBD5E1]'}
                                 `}>
                                     {creatorType === 'organization' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
                                 </div>
                            </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mt-auto justify-end">
                           <Link href="/auth/choose-role">
                              <Button variant="subtle" className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]">
                                  إلغاء
                              </Button>
                           </Link>
                           <Button 
                              variant="primary" 
                              className="px-8 !h-11 min-w-[100px]"
                              onClick={() => setCurrentStep(2)}
                           >
                              متابعة
                           </Button>
                      </div>
                  </div>
              )}

              {/* Step 2: Campaign Type */}
              {currentStep === 2 && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full justify-center">
                      <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl md:text-[32px] font-bold text-[#0F172A] mb-12 text-center">
                             ما نوع الحملات التي تخطط لإنشائها؟
                        </h1>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                            {categories.map((cat) => (
                                <CategoryButton 
                                    key={cat.id}
                                    label={cat.label}
                                    icon={cat.icon}
                                    selected={campaignCategory === cat.id}
                                    onClick={() => setCampaignCategory(cat.id as CampaignCategory)}
                                    className="w-full h-[60px] justify-between"
                                />
                            ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mt-auto justify-end">
                           <Button 
                              variant="subtle" 
                              className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                              onClick={() => setCurrentStep(1)}
                           >
                               الخلف
                           </Button>
                           <Button 
                              variant="primary" 
                              className="px-8 !h-11 min-w-[100px]"
                              onClick={() => setCurrentStep(3)}
                           >
                              متابعة
                           </Button>
                      </div>
                  </div>
              )}

              {/* Placeholder for other steps */}
              {currentStep > 2 && (
                  <div className="text-center">
                      <h2 className="text-xl font-bold mb-4">Step {currentStep} Content Placeholder</h2>
                      <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="subtle">Back</Button>
                  </div>
              )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
