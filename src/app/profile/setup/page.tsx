'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import Logo from '@/shared/ui/components/Logo';
import { FaUser, FaBuilding, FaCheck, FaTint, FaHome, FaHeart, FaLeaf, FaAppleAlt, FaPaw, FaGraduationCap, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { CategoryButton } from '@/components/shared/CategoryButton';
import { useCreateCampaignCreatorProfile, CreateCampaignCreatorDto } from '@/lib/api';

type CreatorType = 'individual' | 'organization' | null;
type CampaignCategory = 'water' | 'shelter' | 'health' | 'environment' | 'food' | 'animals' | 'education' | null;

interface OrganizationData {
  name: string;
  type: string;
  country: string;
  establishmentDate: string;
  legalStatus: string;
  taxId: string;
}

const ProfileSetupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [creatorType, setCreatorType] = useState<CreatorType>('individual'); 
  const [campaignCategory, setCampaignCategory] = useState<CampaignCategory>('water');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: '',
    type: 'منظمة غير ربحية',
    country: '',
    establishmentDate: '',
    legalStatus: 'منظمة غير ربحية مسجلة',
    taxId: '',
  });

  // Get userId from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserId(userData.id);
      } catch {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  // API Hook
  const { mutate: createProfile, isPending } = useCreateCampaignCreatorProfile();

  // Submit profile to backend
  const handleSubmitProfile = () => {
    if (!userId) {
      setError('لم يتم العثور على بيانات المستخدم. يرجى تسجيل الدخول مجدداً.');
      return;
    }

    const payload: CreateCampaignCreatorDto = {
      userId,
      type: creatorType === 'organization' ? 'INSTITUTION' : 'INDIVIDUAL',
      institutionCountry: creatorType === 'organization' ? organizationData.country : undefined,
      institutionName: creatorType === 'organization' ? organizationData.name : undefined,
      institutionType: creatorType === 'organization' ? organizationData.type : undefined,
      institutionDateOfEstablishment: creatorType === 'organization' ? organizationData.establishmentDate : undefined,
      institutionLegalStatus: creatorType === 'organization' ? organizationData.legalStatus : undefined,
      institutionTaxIdentificationNumber: creatorType === 'organization' ? organizationData.taxId : undefined,
    };

    createProfile(payload, {
      onSuccess: () => {
        // Redirect to dashboard on success
        router.push('/dashboard');
      },
      onError: (err) => {
        setError(err.message || 'حدث خطأ أثناء حفظ الملف الشخصي');
      },
    });
  };

  // Different steps based on creator type
  const individualSteps = [
    { number: 1, label: 'نوع المنشئ' },
    { number: 2, label: 'نوع الحملات' },
    { number: 3, label: 'الخبرة والنية' },
    { number: 4, label: 'معلومات أساسية للثقة' },
  ];

  const organizationSteps = [
    { number: 1, label: 'نوع المنشئ' },
    { number: 2, label: 'إعداد الحساب' },
    { number: 3, label: 'الممثل المعتمد' },
    { number: 4, label: 'معلومات عامة' },
  ];

  const steps = creatorType === 'organization' ? organizationSteps : individualSteps;

  const categories = [
    { id: 'water', label: 'مياه', icon: <FaTint size={20} /> },
    { id: 'shelter', label: 'إيواء', icon: <FaHome size={20} /> },
    { id: 'health', label: 'صحة', icon: <FaHeart size={20} /> },
    { id: 'environment', label: 'بيئة', icon: <FaLeaf size={20} /> },
    { id: 'food', label: 'إغاثة غذائية', icon: <FaAppleAlt size={20} /> },
    { id: 'animals', label: 'حيوانات', icon: <FaPaw size={20} /> },
    { id: 'education', label: 'تعليم', icon: <FaGraduationCap size={20} /> },
  ];

  const organizationTypes = ['منظمة غير ربحية', 'جمعية خيرية', 'مؤسسة عامة', 'شركة اجتماعية'];
  const legalStatuses = ['منظمة غير ربحية مسجلة', 'جمعية مرخصة', 'مؤسسة حكومية', 'أخرى'];

  const handleOrgDataChange = (field: keyof OrganizationData, value: string) => {
    setOrganizationData(prev => ({ ...prev, [field]: value }));
  };

  // Check if we're on the final step
  const isFinalStep = currentStep === 4;

  // Handle continue button click
  const handleContinue = () => {
    // Validation for Organization Step 2
    if (currentStep === 2 && creatorType === 'organization') {
      const { name, type, country, establishmentDate, legalStatus, taxId } = organizationData;
      if (!name || !type || !country || !establishmentDate || !legalStatus || !taxId) {
        setError('يرجى تعبئة جميع الحقول المطلوبة');
        return;
      }
      setError(null); // Clear error if validation passes
    }

    if (isFinalStep) {
      handleSubmitProfile();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };


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
          
          {/* Logo inside Content - Top Right - Hide for Organization Step 2 */}
          {!(currentStep === 2 && creatorType === 'organization') && (
            <div className="absolute top-8 right-8 z-10">
               <Logo />
            </div>
          )}

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

              {/* Step 2: Individual - Campaign Type */}
              {currentStep === 2 && creatorType === 'individual' && (
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

              {/* Step 2: Organization - Account Setup */}
              {currentStep === 2 && creatorType === 'organization' && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                      {/* Header Banner */}
                      <div className="bg-[#E2E8F0] rounded-full py-5 px-8 mb-6 text-right">
                          <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">
                              معلومات المنظمة
                          </h1>
                          <p className="text-[#64748B] text-sm">
                              يوفر تفاصيل المنظمة للتحقق من الحملة
                          </p>
                      </div>

                      {/* Error Message */}
                      {error && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center animate-in fade-in slide-in-from-top-2">
                              {error}
                          </div>
                      )}

                      {/* Form Section */}
                      <div className="border border-[#E5E7EB] rounded-2xl flex-1 overflow-auto">
                          {/* Form Header with matching top border */}
                          <div className="flex items-center gap-3 p-5 border-b border-[#E5E7EB]">
                              <div className="w-12 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
                                  <FaBuilding className="text-[#64748B]" size={20} />
                              </div>
                              <div>
                                  <h2 className="text-lg font-bold text-[#0F172A]">إعداد الحساب</h2>
                                  <p className="text-sm text-[#94A3B8]">يوفر معلومات أساسية عن منظمتك</p>
                              </div>
                          </div>

                          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                              {/* Row 1: Organization Name & Organization Type */}
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">اسم المنظمة</label>
                                  <input
                                      type="text"
                                      value={organizationData.name}
                                      onChange={(e) => handleOrgDataChange('name', e.target.value)}
                                      placeholder="أدخل اسم المنظمة"
                                      required
                                      className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">نوع المنظمة</label>
                                  <select
                                      value={organizationData.type}
                                      onChange={(e) => handleOrgDataChange('type', e.target.value)}
                                      required
                                      className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm bg-white focus:outline-none focus:border-[#3B82F6] transition-colors appearance-none cursor-pointer"
                                  >
                                      {organizationTypes.map(type => (
                                          <option key={type} value={type}>{type}</option>
                                      ))}
                                  </select>
                              </div>

                              {/* Row 2: Country & Establishment Date */}
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الدولة</label>
                                  <input
                                      type="text"
                                      value={organizationData.country}
                                      onChange={(e) => handleOrgDataChange('country', e.target.value)}
                                      placeholder="اختر الدولة"
                                      required
                                      className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">تاريخ التأسيس</label>
                                  <div className="relative">
                                      <input
                                          type="date"
                                          value={organizationData.establishmentDate}
                                          onChange={(e) => handleOrgDataChange('establishmentDate', e.target.value)}
                                          required
                                          className="w-full h-11 px-4 pr-10 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                      />
                                      <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" size={14} />
                                  </div>
                              </div>

                              {/* Row 3: Legal Status & Tax ID */}
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الوضع القانوني</label>
                                  <select
                                      value={organizationData.legalStatus}
                                      onChange={(e) => handleOrgDataChange('legalStatus', e.target.value)}
                                      required
                                      className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm bg-white focus:outline-none focus:border-[#3B82F6] transition-colors appearance-none cursor-pointer"
                                  >
                                      {legalStatuses.map(status => (
                                          <option key={status} value={status}>{status}</option>
                                      ))}
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">رقم التعريفي الضريبي</label>
                                  <input
                                      type="text"
                                      value={organizationData.taxId}
                                      onChange={(e) => handleOrgDataChange('taxId', e.target.value)}
                                      placeholder="مثال: 12-3456789"
                                      required
                                      className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                  />
                              </div>
                          </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mt-6 justify-end">
                           <Button 
                               variant="subtle" 
                               className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                               onClick={() => setCurrentStep(1)}
                           >
                                إلغاء
                           </Button>
                           <Button 
                               variant="primary" 
                               className="px-8 !h-11 min-w-[100px]"
                               onClick={handleContinue}
                           >
                               متابعة
                           </Button>
                      </div>
                  </div>
              )}

              {/* Placeholder for steps 3 and 4 */}
              {currentStep > 2 && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                      <div className="flex-1 flex flex-col justify-center items-center">
                          <h2 className="text-2xl font-bold mb-4 text-[#0F172A]">
                              {currentStep === 3 
                                  ? (creatorType === 'organization' ? 'الممثل المعتمد' : 'الخبرة والنية')
                                  : (creatorType === 'organization' ? 'معلومات عامة' : 'معلومات أساسية للثقة')
                              }
                          </h2>
                          <p className="text-[#64748B] mb-8">هذه الخطوة قيد التطوير</p>
                          
                          {/* Error Message */}
                          {error && (
                              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
                                  {error}
                              </div>
                          )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mt-auto justify-end">
                          <Button 
                              variant="subtle" 
                              className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                              onClick={() => setCurrentStep(prev => prev - 1)}
                              disabled={isPending}
                          >
                              الخلف
                          </Button>
                          <Button 
                              variant="primary" 
                              className="px-8 !h-11 min-w-[120px]"
                              onClick={handleContinue}
                              disabled={isPending}
                          >
                              {isPending ? (
                                  <FaSpinner className="animate-spin" size={18} />
                              ) : isFinalStep ? (
                                  'حفظ وإنهاء'
                              ) : (
                                  'متابعة'
                              )}
                          </Button>
                      </div>
                  </div>
              )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
