'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import Logo from '@/shared/ui/components/Logo';

import { FaUser, FaBuilding, FaCheck, FaTint, FaHome, FaHeart, FaLeaf, FaAppleAlt, FaPaw, FaGraduationCap, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { CategoryButton } from '@/components/shared/CategoryButton';
import { useCreateCampaignCreatorProfile, useCreateCampaignCreatorProfileFormData, CreateCampaignCreatorDto } from '@/lib/api';

type CreatorType = 'individual' | 'organization' | null;
type CampaignCategory = 'water' | 'shelter' | 'health' | 'environment' | 'food' | 'animals' | 'education' | null;
type ExperienceLevel = 'first_time' | 'previous_experience' | 'organization_representative' | null;

interface OrganizationData {
  name: string;
  type: string;
  country: string;
  establishmentDate: string;
  legalStatus: string;
  taxId: string;
  registrationNumber: string;
  representativeName: string;
  representativePosition: string;
  representativePhone: string;
  representativeEmail: string;
  registrationFile: File | null;
  commercialLicenseFile: File | null;
  idPhotoFile: File | null;
  representativePhotoFile: File | null;
  authorizationLetterFile: File | null;
  website: string;
  socialMedia: string;
}

interface IndividualData {
  name: string;
  country: string;
  contact: string;
  profileImage: File | null;
}

const WIZARD_STORAGE_KEY = 'grow-fund-wizard-state';

const ProfileSetupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [creatorType, setCreatorType] = useState<CreatorType>('individual'); 
  const [campaignCategory, setCampaignCategory] = useState<CampaignCategory>('water');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: '',
    type: 'منظمة غير ربحية',
    country: '',
    establishmentDate: '',
    legalStatus: 'منظمة غير ربحية مسجلة',
    taxId: '',
    registrationNumber: '',
    representativeName: '',
    representativePosition: '',
    representativePhone: '',
    representativeEmail: '',
    registrationFile: null,
    commercialLicenseFile: null,
    idPhotoFile: null,
    representativePhotoFile: null,
    authorizationLetterFile: null,
    website: '',
    socialMedia: '',
  });

  const [individualData, setIndividualData] = useState<IndividualData>({
    name: '',
    country: '',
    contact: '',
    profileImage: null,
  });

  const handleFileChange = (field: 'registrationFile' | 'commercialLicenseFile' | 'idPhotoFile' | 'representativePhotoFile' | 'authorizationLetterFile', file: File | null) => {
    setOrganizationData(prev => ({ ...prev, [field]: file }));
  };

  const handleIndividualFileChange = (file: File | null) => {
    setIndividualData(prev => ({ ...prev, profileImage: file }));
  };

  const handleIndividualDataChange = (field: keyof IndividualData, value: string) => {
    setIndividualData(prev => ({ ...prev, [field]: value }));
  };

  // Load saved state from localStorage on mount
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

    const savedState = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.currentStep) setCurrentStep(state.currentStep);
        if (state.creatorType) setCreatorType(state.creatorType);
        if (state.campaignCategory) setCampaignCategory(state.campaignCategory);
        if (state.experienceLevel) setExperienceLevel(state.experienceLevel);
        if (state.organizationData) {
          setOrganizationData(prev => ({
            ...prev,
            ...state.organizationData,
            registrationFile: null, 
            commercialLicenseFile: null,
            idPhotoFile: null,
            representativePhotoFile: null,
            authorizationLetterFile: null
          }));
        }
        if (state.individualData) {
          setIndividualData(prev => ({
            ...prev,
            ...state.individualData,
            profileImage: null // Files cannot be persisted easily in localStorage
          }));
        }
      } catch (e) {
        console.error('Failed to parse saved wizard state', e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save if we have some data or are past step 1
    const stateToSave = {
      currentStep,
      creatorType,
      campaignCategory,
      experienceLevel,
      organizationData: {
        ...organizationData,
        registrationFile: null,
        commercialLicenseFile: null,
        idPhotoFile: null,
        representativePhotoFile: null,
        authorizationLetterFile: null
      },
      individualData: {
        ...individualData,
        profileImage: null
      }
    };
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [currentStep, creatorType, campaignCategory, experienceLevel, organizationData, individualData]);

  // Clear error whenever the step changes
  useEffect(() => {
    setError(null);
  }, [currentStep]);

  // API Hook: JSON for both individual and institution
  const { mutate: createProfile, isPending } = useCreateCampaignCreatorProfile();

  const isSubmitting = isPending;

  // Submit profile to backend
  const handleSubmitProfile = () => {
    if (!userId) {
      setError('لم يتم العثور على بيانات المستخدم. يرجى تسجيل الدخول مجدداً.');
      return;
    }

    const onSuccess = () => {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
      setIsSubmitted(true);
    };
    const onError = (err: Error) => {
      setError(err.message || 'حدث خطأ أثناء حفظ الملف الشخصي');
    };

    if (creatorType === 'organization') {
      // Institution: send JSON with text fields only. Date as ISO. Omit file fields to avoid 500 (backend may require multipart for files).
      const establishmentDate = organizationData.establishmentDate
        ? new Date(organizationData.establishmentDate).toISOString()
        : undefined;

      const payload: CreateCampaignCreatorDto = {
        userId,
        type: 'INSTITUTION',
        institutionName: organizationData.name || undefined,
        institutionType: organizationData.type || undefined,
        institutionCountry: organizationData.country || undefined,
        institutionDateOfEstablishment: establishmentDate,
        institutionLegalStatus: organizationData.legalStatus || undefined,
        institutionTaxIdentificationNumber: organizationData.taxId || undefined,
        institutionRegistrationNumber: organizationData.registrationNumber || undefined,
        institutionRepresentativeName: organizationData.representativeName || undefined,
        institutionRepresentativePosition: organizationData.representativePosition || undefined,
        institutionRepresentativePhone: organizationData.representativePhone || undefined,
        institutionRepresentativeEmail: organizationData.representativeEmail || undefined,
        institutionWebsite: organizationData.website || undefined,
        institutionRepresentativeSocialMedia: organizationData.socialMedia || undefined,
      };

      createProfile(payload, { onSuccess, onError });
    } else {
      // Individual: send JSON
      const payload: CreateCampaignCreatorDto = {
        userId,
        type: 'INDIVIDUAL',
        experience: experienceLevel ?? undefined,
        individualName: individualData.name,
        individualCountry: individualData.country,
        individualContact: individualData.contact,
        individualProfileImage: individualData.profileImage?.name,
      };

      createProfile(payload, { onSuccess, onError });
    }
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
    { number: 3, label: 'التسجيل القانوني والوثائق' },
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

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle continue button click
  const handleContinue = () => {
    // Validation for Individual Step 2
    if (currentStep === 2 && creatorType === 'individual') {
      if (!campaignCategory) {
        setError('يرجى اختيار نوع الحملة');
        return;
      }
      setError(null);
    }

    // Validation for Individual Step 3
    if (currentStep === 3 && creatorType === 'individual') {
      if (!experienceLevel) {
        setError('يرجى اختيار مستوى الخبرة');
        return;
      }
      setError(null);
    }

    // Validation for Organization Step 2
    if (currentStep === 2 && creatorType === 'organization') {
      const { name, type, country, establishmentDate, legalStatus, taxId } = organizationData;
      if (!name || !type || !country || !establishmentDate || !legalStatus || !taxId) {
        setError('يرجى تعبئة جميع الحقول المطلوبة');
        return;
      }
      setError(null); // Clear error if validation passes
    }

    // Validation for Organization Step 3
    if (currentStep === 3 && creatorType === 'organization') {
      const { registrationNumber, representativeName, representativePosition, representativePhone, representativeEmail, registrationFile, commercialLicenseFile } = organizationData;
      if (!registrationNumber || !representativeName || !representativePosition || !representativePhone || !representativeEmail || !registrationFile || !commercialLicenseFile) {
        setError('يرجى تعبئة جميع الحقول المطلوبة ورفع الملفات');
        return;
      }
      if (!isValidEmail(representativeEmail)) {
        setError('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      setError(null);
    }

    // Validation for Individual Step 4
    if (currentStep === 4 && creatorType === 'individual') {
      const { name, country, contact } = individualData;
      if (!name || !country || !contact) {
        setError('يرجى تعبئة جميع الحقول المطلوبة');
        return;
      }
      if (!isValidEmail(contact)) {
        setError('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      setError(null);
    }

    // Validation for Organization Step 4
    if (currentStep === 4 && creatorType === 'organization') {
      const { idPhotoFile, representativePhotoFile, authorizationLetterFile } = organizationData;
      if (!idPhotoFile || !representativePhotoFile || !authorizationLetterFile) {
        setError('يرجى رفع جميع الوثائق المطلوبة');
        return;
      }
      setError(null);
    }

    if (isFinalStep) {
      handleSubmitProfile();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };


  if (isSubmitted) {
    if (creatorType === 'individual') {
      return (
        <div 
          className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-4 md:p-8 box-border"
          dir="rtl"
        >
          <div className="w-full max-w-[1440px] flex items-center justify-center p-6 md:p-20">
            <div className="w-full max-w-[900px] bg-white border border-[#E5E7EB] rounded-[40px] p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-sm animate-in fade-in zoom-in-95 duration-700">
               {/* Success Icon (3D Thumbs up vibe) */}
               <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 flex items-center justify-center">
                   <div className="absolute inset-0 bg-[#EFF6FF] rounded-full animate-pulse opacity-50"></div>
                   <div className="relative z-10 text-6xl md:text-8xl">
                       👍
                   </div>
               </div>

               <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                   تم إعداد ملفك بنجاح ✨
               </h1>
               <p className="text-[#64748B] text-lg md:text-xl leading-relaxed max-w-[500px] mb-12">
                   يمكنك الآن إنشاء حملتك الأولى. سيتم مراجعتها قبل النشر لضمان الجودة والشفافية.
               </p>

               <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
                   <Button 
                      variant="primary" 
                      className="px-12 !h-14 text-lg rounded-xl shadow-lg shadow-blue-100 min-w-[240px]"
                      onClick={() => router.push('/campaigns/create')}
                   >
                       انشئ حملتك الأولى
                   </Button>
                   <Button 
                      variant="subtle" 
                      className="px-10 !h-14 text-lg rounded-xl !bg-[#F1F5F9] border border-[#E2E8F0] min-w-[240px]"
                      onClick={() => router.push('/dashboard')}
                   >
                       تخطي إلى لوحة التحكم
                   </Button>
               </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Organization Success View
    return (
      <div 
        className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-4 md:p-8 box-border"
        dir="rtl"
      >
        <div className="w-full max-w-[1440px] flex items-center justify-center p-6 md:p-20">
          <div className="w-full max-w-[900px] bg-white border border-[#E5E7EB] rounded-[40px] p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-sm animate-in fade-in zoom-in-95 duration-700">
             {/* Success Icon (Stylized Clock/Stopwatch) */}
             <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-[#F1F5F9] rounded-full animate-pulse opacity-50"></div>
                 <div className="relative z-10 w-full h-full text-[#B59410] flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 shadow-xl border-4 border-[#F1F5F9]">
                          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 3C7.02944 3 3 7.02944 3 12M21 12C21 7.02944 16.9706 3 12 3M3 12C3 16.9706 7.02944 21 12 21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                              <path d="M16.5 3.5L19 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M7.5 3.5L5 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                      </div>
                 </div>
                 {/* Decorative Arrows */}
                 <div className="absolute -top-2 -right-2 rotate-45 text-[#D4AF37]">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M16 12L20 16L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </div>
                 <div className="absolute -bottom-2 -left-2 rotate-225 text-[#D4AF37]">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M16 12L20 16L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </div>
             </div>

             <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                 طلب المراجعة قيد التقدم
             </h1>
             <p className="text-[#64748B] text-lg md:text-xl leading-relaxed max-w-[500px] mb-12">
                 سنبلغك بإرسال ايميل الموجود بالنموذج بمجرد الموافقة على مؤسستك أو اذا كنا بحاجة إلى معلومات إضافية
             </p>

             <Button 
                variant="primary" 
                className="px-12 !h-14 text-lg rounded-xl shadow-lg shadow-blue-100 min-w-[240px]"
                onClick={() => router.push('/campaigns')}
             >
                 إستكشاف الحملات
             </Button>
          </div>
        </div>
      </div>
    );
  }

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
          
          {/* Logo inside Content - Steps 1-4 for Individual ONLY */}
          {creatorType === 'individual' && (
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

              {/* Step 3: Organization - Legal & Representative */}
              {currentStep === 3 && creatorType === 'organization' && (
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

                      {/* Content Container */}
                      <div className="flex-1 overflow-auto flex flex-col gap-6">
                          
                          {/* Section 1: Legal Registration */}
                          <div className="border border-[#E5E7EB] rounded-2xl">
                              <div className="flex items-center gap-3 p-5 border-b border-[#E5E7EB]">
                                  {/* Icon (Scale or Document) */}
                                   <div className="w-12 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
                                      <FaBuilding className="text-[#64748B]" size={20} /> 
                                  </div>
                                  <div>
                                      <h2 className="text-lg font-bold text-[#0F172A]">التسجيل القانوني والوثائق</h2>
                                      <p className="text-sm text-[#94A3B8]">قدم معلومات التسجيل الضريبي وقم بتحميل المطلوب</p>
                                  </div>
                              </div>
                              
                              <div className="p-6 flex flex-col gap-5">
                                  {/* Registration Number */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">رقم التسجيل</label>
                                      <input
                                          type="text"
                                          value={organizationData.registrationNumber}
                                          onChange={(e) => handleOrgDataChange('registrationNumber', e.target.value)}
                                          placeholder="مثال: REG-2018-12343"
                                          required
                                          className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                      />
                                  </div>

                                  {/* File Upload 1: Registration Certificate */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">شهادة التسجيل</label>
                                      <div 
                                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${organizationData.registrationFile ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                        onClick={() => document.getElementById('registrationFile')?.click()}
                                      >
                                          <input 
                                            type="file" 
                                            id="registrationFile" 
                                            className="hidden" 
                                            onChange={(e) => handleFileChange('registrationFile', e.target.files?.[0] || null)}
                                            accept=".png,.jpg,.jpeg,.docx,.pdf"
                                          />
                                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${organizationData.registrationFile ? 'bg-[#3B82F6] text-white' : 'bg-[#E0F2FE] text-[#0284C7]'}`}>
                                              {organizationData.registrationFile ? <FaCheck size={16} /> : <FaBuilding size={16} />}
                                          </div>
                                          <p className={`text-sm mb-1 ${organizationData.registrationFile ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                            {organizationData.registrationFile ? organizationData.registrationFile.name : 'اسحب الملف وأفلته أو انقر للتحميل'}
                                          </p>
                                          {!organizationData.registrationFile && (
                                            <p className="text-xs text-[#94A3B8]">(الصيغة المقبولة: PNG, JPG, DOCX, PDF)</p>
                                          )}
                                      </div>
                                  </div>

                                  {/* File Upload 2: Commercial License */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">رخصة تجارية</label>
                                      <div 
                                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${organizationData.commercialLicenseFile ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                        onClick={() => document.getElementById('commercialLicenseFile')?.click()}
                                      >
                                          <input 
                                            type="file" 
                                            id="commercialLicenseFile" 
                                            className="hidden" 
                                            onChange={(e) => handleFileChange('commercialLicenseFile', e.target.files?.[0] || null)}
                                            accept=".png,.jpg,.jpeg,.docx,.pdf"
                                          />
                                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${organizationData.commercialLicenseFile ? 'bg-[#3B82F6] text-white' : 'bg-[#E0F2FE] text-[#0284C7]'}`}>
                                              {organizationData.commercialLicenseFile ? <FaCheck size={16} /> : <FaBuilding size={16} />}
                                          </div>
                                          <p className={`text-sm mb-1 ${organizationData.commercialLicenseFile ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                            {organizationData.commercialLicenseFile ? organizationData.commercialLicenseFile.name : 'اسحب الملف وأفلته أو انقر للتحميل'}
                                          </p>
                                          {!organizationData.commercialLicenseFile && (
                                            <p className="text-xs text-[#94A3B8]">(الصيغة المقبولة: PNG, JPG, DOCX, PDF)</p>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Section 2: Authorized Representative */}
                          <div className="border border-[#E5E7EB] rounded-2xl">
                              <div className="flex items-center gap-3 p-5 border-b border-[#E5E7EB]">
                                   <div className="w-12 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
                                      <FaUser className="text-[#64748B]" size={20} /> 
                                  </div>
                                  <div>
                                      <h2 className="text-lg font-bold text-[#0F172A]">الممثل المعتمد</h2>
                                      <p className="text-sm text-[#94A3B8]">تقديم معلومات الاتصال بالشخص المخول بتمثيل هذه المنظمة</p>
                                  </div>
                              </div>

                              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                  {/* Name */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الاسم الكامل</label>
                                      <input
                                          type="text"
                                          value={organizationData.representativeName}
                                          onChange={(e) => handleOrgDataChange('representativeName', e.target.value)}
                                          placeholder="كما هو مسجل في الوثيقة"
                                          required
                                          className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                      />
                                  </div>
                                  {/* Position */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">المنصب / اللقب</label>
                                      <input
                                          type="text"
                                          value={organizationData.representativePosition}
                                          onChange={(e) => handleOrgDataChange('representativePosition', e.target.value)}
                                          placeholder="الرئيس التنفيذي"
                                          required
                                          className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
                                      />
                                  </div>
                                  {/* Phone */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">رقم الهاتف</label>
                                      <input
                                          type="text"
                                          value={organizationData.representativePhone}
                                          onChange={(e) => handleOrgDataChange('representativePhone', e.target.value)}
                                          placeholder="+970 569929247"
                                          required
                                          className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-left"
                                          dir="ltr"
                                      />
                                  </div>
                                  {/* Email */}
                                  <div>
                                      <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">البريد الإلكتروني</label>
                                      <input
                                          type="email"
                                          value={organizationData.representativeEmail}
                                          onChange={(e) => handleOrgDataChange('representativeEmail', e.target.value)}
                                          placeholder="AliMohammed@gmail.com"
                                          required
                                          className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-left"
                                          dir="ltr"
                                      />
                                  </div>
                              </div>
                          </div>

                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mt-6 justify-end">
                           <Button 
                               variant="subtle" 
                               className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                               onClick={() => setCurrentStep(2)}
                           >
                                السابق
                           </Button>
                           <Button 
                               variant="primary" 
                               className="px-8 !h-11 min-w-[140px]"
                               onClick={handleContinue}
                           >
                               إرسال للمراجعة
                           </Button>
                      </div>
                  </div>
              )}

              {/* Step 3: Individual - Experience */}
              {currentStep === 3 && creatorType === 'individual' && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full justify-center">
                      <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl md:text-[32px] font-bold text-[#0F172A] mb-12 text-center">
                             هل لديك خبرة سابقة؟
                        </h1>

                        <div className="flex flex-col gap-4 mb-20">
                            {/* Option 1 */}
                            <div 
                                onClick={() => setExperienceLevel('first_time')}
                                className={`
                                    cursor-pointer flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 h-[72px]
                                    ${experienceLevel === 'first_time' 
                                        ? 'bg-[#EFF6FF] border-[#3B82F6]' 
                                        : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'}
                                `}
                            >
                                 <span className={`text-base font-medium ${experienceLevel === 'first_time' ? 'text-[#1E3A8A]' : 'text-[#475569]'}`}>
                                    هذه أول مرة لي
                                </span>
                                <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${experienceLevel === 'first_time' ? 'border-[#3B82F6]' : 'border-[#CBD5E1]'}
                                 `}>
                                     {experienceLevel === 'first_time' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
                                 </div>
                            </div>
                            
                            {/* Option 2 */}
                            <div 
                                onClick={() => setExperienceLevel('previous_experience')}
                                className={`
                                    cursor-pointer flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 h-[72px]
                                    ${experienceLevel === 'previous_experience' 
                                        ? 'bg-[#EFF6FF] border-[#3B82F6]' 
                                        : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'}
                                `}
                            >
                                 <span className={`text-base font-medium ${experienceLevel === 'previous_experience' ? 'text-[#1E3A8A]' : 'text-[#475569]'}`}>
                                    لدي تجربة سابقة
                                </span>
                                <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${experienceLevel === 'previous_experience' ? 'border-[#3B82F6]' : 'border-[#CBD5E1]'}
                                 `}>
                                     {experienceLevel === 'previous_experience' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
                                 </div>
                            </div>

                            {/* Option 3 */}
                            <div 
                                onClick={() => setExperienceLevel('organization_representative')}
                                className={`
                                    cursor-pointer flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 h-[72px]
                                    ${experienceLevel === 'organization_representative' 
                                        ? 'bg-[#EFF6FF] border-[#3B82F6]' 
                                        : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'}
                                `}
                            >
                                 <span className={`text-base font-medium ${experienceLevel === 'organization_representative' ? 'text-[#1E3A8A]' : 'text-[#475569]'}`}>
                                    أمثل جهة منظمة
                                </span>
                                <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${experienceLevel === 'organization_representative' ? 'border-[#3B82F6]' : 'border-[#CBD5E1]'}
                                 `}>
                                     {experienceLevel === 'organization_representative' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />}
                                 </div>
                            </div>
                        </div>

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
                               onClick={() => setCurrentStep(2)}
                           >
                                الخلف
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

              {/* Step 4: Individual - Basic Information */}
              {currentStep === 4 && creatorType === 'individual' && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                       {/* Header Banner */}
                       <div className="bg-[#E2E8F0] rounded-full py-5 px-8 mb-6 text-right">
                          <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">
                              معلومات أساسية
                          </h1>
                      </div>

                      {/* Error Message */}
                      {error && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center animate-in fade-in slide-in-from-top-2">
                              {error}
                          </div>
                      )}

                      <div className="flex-1 overflow-auto flex flex-col gap-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {/* Name */}
                               <div>
                                   <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الاسم</label>
                                   <input
                                       type="text"
                                       value={individualData.name}
                                       onChange={(e) => handleIndividualDataChange('name', e.target.value)}
                                       placeholder="محمد"
                                       required
                                       className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                   />
                               </div>
                               {/* Country */}
                               <div>
                                   <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الدولة</label>
                                   <input
                                       type="text"
                                       value={individualData.country}
                                       onChange={(e) => handleIndividualDataChange('country', e.target.value)}
                                       placeholder="فلسطين"
                                       required
                                       className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                   />
                               </div>
                           </div>

                           {/* Contact Method */}
                           <div>
                               <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">وسيلة التواصل</label>
                               <input
                                   type="text"
                                   value={individualData.contact}
                                   onChange={(e) => handleIndividualDataChange('contact', e.target.value)}
                                   placeholder="eng.mohammeduiux@gmail.com"
                                   required
                                   className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-left"
                                   dir="ltr"
                               />
                           </div>

                           {/* Profile Image */}
                           <div>
                               <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الصورة الشخصية</label>
                               <div 
                                 className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${individualData.profileImage ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                 onClick={() => document.getElementById('profileImage')?.click()}
                               >
                                   <input 
                                     type="file" 
                                     id="profileImage" 
                                     className="hidden" 
                                     onChange={(e) => handleIndividualFileChange(e.target.files?.[0] || null)}
                                     accept=".png,.jpg,.jpeg,.pdf"
                                   />
                                   <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${individualData.profileImage ? 'bg-[#3B82F6] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                                        {individualData.profileImage ? <FaCheck size={16} /> : <div className="text-2xl">+</div>} 
                                   </div>
                                   <p className={`text-sm mb-1 ${individualData.profileImage ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                     {individualData.profileImage ? individualData.profileImage.name : 'اضغط للرفع أو اسحب الملفات هنا'}
                                   </p>
                                   {!individualData.profileImage && (
                                     <p className="text-xs text-[#94A3B8]">(MB حتى 5 - PDF / JPG / PNG)</p>
                                   )}
                               </div>
                           </div>
                      </div>

                       {/* Buttons */}
                       <div className="flex gap-4 mt-auto justify-end">
                           <Button 
                               variant="subtle" 
                               className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                               onClick={() => setCurrentStep(prev => prev - 1)}
                               disabled={isSubmitting}
                           >
                               الخلف
                           </Button>
                           <Button 
                               variant="primary" 
                               className="px-8 !h-11 min-w-[120px]"
                               onClick={handleContinue}
                               disabled={isSubmitting}
                           >
                               {isSubmitting ? (
                                   <FaSpinner className="animate-spin" size={18} />
                               ) : (
                                   'حفظ وإنهاء'
                               )}
                           </Button>
                       </div>
                  </div>
              )}

              {/* Step 4: Organization - General Information */}
              {currentStep === 4 && creatorType === 'organization' && (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                       {/* Header Banner */}
                       <div className="bg-[#E2E8F0] rounded-full py-5 px-8 mb-6 text-right">
                          <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">
                              معلومات المنظمة
                          </h1>
                          <p className="text-[#64748B] text-sm">يوفر تفاصيل المنظمة للتحقق من الحملة</p>
                      </div>

                      {/* Error Message */}
                      {error && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center animate-in fade-in slide-in-from-top-2">
                              {error}
                          </div>
                      )}

                      <div className="flex-1 overflow-auto flex flex-col gap-6">
                           
                           {/* Main Section */}
                           <div className="border border-[#E5E7EB] rounded-2xl">
                               <div className="flex items-center gap-3 p-5 border-b border-[#E5E7EB]">
                                    <div className="w-12 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
                                       <FaBuilding className="text-[#64748B]" size={20} /> 
                                   </div>
                                   <div className="text-right">
                                       <h2 className="text-lg font-bold text-[#0F172A]">معلومات عامة</h2>
                                       <p className="text-sm text-[#94A3B8]">تقديم معلومات إضافية لبناء الثقة مع الداعمين</p>
                                   </div>
                               </div>

                               <div className="p-6 flex flex-col gap-5">
                                   {/* Registration Number - Displayed again as per design */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">رقم التسجيل</label>
                                       <input
                                           type="text"
                                           value={organizationData.registrationNumber}
                                           onChange={(e) => handleOrgDataChange('registrationNumber', e.target.value)}
                                           placeholder="REG-2018-12343"
                                           required
                                           className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                       />
                                   </div>

                                   {/* ID Photo */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">صورة الهوية</label>
                                       <div 
                                         className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${organizationData.idPhotoFile ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                         onClick={() => document.getElementById('idPhotoFile')?.click()}
                                       >
                                           <input 
                                             type="file" 
                                             id="idPhotoFile" 
                                             className="hidden" 
                                             onChange={(e) => handleFileChange('idPhotoFile', e.target.files?.[0] || null)}
                                             accept=".png,.jpg,.jpeg,.docx,.pdf"
                                           />
                                           <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${organizationData.idPhotoFile ? 'bg-[#3B82F6] text-white' : 'bg-[#E0F2FE] text-[#0284C7]'}`}>
                                               {organizationData.idPhotoFile ? <FaCheck size={16} /> : <FaBuilding size={16} />}
                                           </div>
                                           <p className={`text-sm mb-1 ${organizationData.idPhotoFile ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                             {organizationData.idPhotoFile ? organizationData.idPhotoFile.name : 'اسحب الملف وأفلته أو انقر للتحميل'}
                                           </p>
                                           {!organizationData.idPhotoFile && (
                                             <p className="text-xs text-[#94A3B8]">(الصيغة المقبولة: PNG, JPG, DOCX, PDF)</p>
                                           )}
                                       </div>
                                   </div>

                                   {/* Representative Photo */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">صورة شخصية للمفوض</label>
                                       <div 
                                         className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${organizationData.representativePhotoFile ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                         onClick={() => document.getElementById('representativePhotoFile')?.click()}
                                       >
                                           <input 
                                             type="file" 
                                             id="representativePhotoFile" 
                                             className="hidden" 
                                             onChange={(e) => handleFileChange('representativePhotoFile', e.target.files?.[0] || null)}
                                             accept=".png,.jpg,.jpeg,.docx,.pdf"
                                           />
                                           <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${organizationData.representativePhotoFile ? 'bg-[#3B82F6] text-white' : 'bg-[#E0F2FE] text-[#0284C7]'}`}>
                                               {organizationData.representativePhotoFile ? <FaCheck size={16} /> : <FaUser size={16} />}
                                           </div>
                                           <p className={`text-sm mb-1 ${organizationData.representativePhotoFile ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                             {organizationData.representativePhotoFile ? organizationData.representativePhotoFile.name : 'اسحب الملف وأفلته أو انقر للتحميل'}
                                           </p>
                                           {!organizationData.representativePhotoFile && (
                                             <p className="text-xs text-[#94A3B8]">(الصيغة المقبولة: PNG, JPG, DOCX, PDF)</p>
                                           )}
                                       </div>
                                   </div>

                                   {/* Authorization Letter */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">خطاب التفويض</label>
                                       <div 
                                         className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-[#F8FAFC] cursor-pointer ${organizationData.authorizationLetterFile ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}`}
                                         onClick={() => document.getElementById('authorizationLetterFile')?.click()}
                                       >
                                           <input 
                                             type="file" 
                                             id="authorizationLetterFile" 
                                             className="hidden" 
                                             onChange={(e) => handleFileChange('authorizationLetterFile', e.target.files?.[0] || null)}
                                             accept=".png,.jpg,.jpeg,.pdf"
                                           />
                                           <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${organizationData.authorizationLetterFile ? 'bg-[#3B82F6] text-white' : 'bg-[#E0F2FE] text-[#0284C7]'}`}>
                                               {organizationData.authorizationLetterFile ? <FaCheck size={16} /> : <FaCheck size={16} />}
                                           </div>
                                           <p className={`text-sm mb-1 ${organizationData.authorizationLetterFile ? 'text-[#1E3A8A] font-medium' : 'text-[#64748B]'}`}>
                                             {organizationData.authorizationLetterFile ? organizationData.authorizationLetterFile.name : 'ارفق خطاب التفويض الرسمي للمؤسسة'}
                                           </p>
                                           {!organizationData.authorizationLetterFile && (
                                             <p className="text-xs text-[#94A3B8]">(MB الحد الأقصى 5) JPG أو PDF</p>
                                           )}
                                       </div>
                                   </div>

                                   {/* Website */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">الموقع الالكتروني ( اختياري )</label>
                                       <input
                                           type="text"
                                           value={organizationData.website}
                                           onChange={(e) => handleOrgDataChange('website', e.target.value)}
                                           placeholder="www.starry.org"
                                           className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                       />
                                   </div>

                                   {/* Social Media */}
                                   <div>
                                       <label className="block text-sm font-medium text-[#0F172A] mb-2 text-right">روابط وسائل التواصل الاجتماعي (اختياري)</label>
                                       <input
                                           type="text"
                                           value={organizationData.socialMedia}
                                           onChange={(e) => handleOrgDataChange('socialMedia', e.target.value)}
                                           placeholder="https://facebook.com/username"
                                           className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white text-right"
                                       />
                                   </div>
                               </div>
                           </div>
                      </div>

                       {/* Buttons */}
                       <div className="flex gap-4 mt-auto justify-end">
                           <Button 
                               variant="subtle" 
                               className="!bg-white border border-[#E2E8F0] px-8 !h-11 min-w-[100px]"
                               onClick={() => setCurrentStep(prev => prev - 1)}
                               disabled={isSubmitting}
                           >
                               الخلف
                           </Button>
                           <Button 
                               variant="primary" 
                               className="px-8 !h-11 min-w-[150px]"
                               onClick={handleContinue}
                               disabled={isSubmitting}
                           >
                               {isSubmitting ? (
                                   <FaSpinner className="animate-spin" size={18} />
                               ) : (
                                   'إرسال للمراجعة'
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
