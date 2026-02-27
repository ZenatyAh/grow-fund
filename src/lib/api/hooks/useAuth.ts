

import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

// =========
// DTOs
// =========

export interface RegisterDonorProfileDto {
  areasOfInterest: string;
  preferredCampaignTypes: string;
  geographicScope: string;
  targetAudience: string;
  preferredCampaignSize: number;
  preferredCampaignVisibility: string;
}

export interface RegisterDonorDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber?: string;
  country?: string;
  notes?: string;
  donorProfile?: RegisterDonorProfileDto;
}

export interface RegisterDonorUserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'DONOR';
  country: string;
  phoneNumber: string;
  notes: string | null;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
}

export interface RegisterDonorResponseDto {
  user: RegisterDonorUserResponseDto;
  token: string;
}

export interface RegisterCampaignCreatorDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  type: 'INDIVIDUAL' | 'INSTITUTION' | 'individual' | 'institution';
  phoneNumber?: string;
  country?: string;
  notes?: string;
  institutionName?: string;
  institutionType?: string;
  institutionCountry?: string;
  institutionDateOfEstablishment?: string;
  institutionLegalStatus?: string;
  institutionTaxIdentificationNumber?: string;
  institutionRegistrationNumber?: string;
  institutionRepresentativeName?: string;
  institutionRepresentativePosition?: string;
  institutionRepresentativeRegistrationNumber?: string;
  institutionWebsite?: string;
  institutionRepresentativeSocialMedia?: string;
  // Note: File fields (registrationCertificate, commercialLicense, representativeIdPhoto, commissionerImage, authorizationLetter)
  // are sent as FormData, not included in JSON DTO
}

export interface CampaignCreatorUserDataResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'CAMPAIGN_CREATOR';
  country: string | null;
  phoneNumber: string | null;
  notes: string | null;
  dateOfBirth: string | null;
  isDeleted: boolean;
  isVerified: boolean;
  verificationStatus: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface RegisterCampaignCreatorResponseDto {
  token: string;
  userData: CampaignCreatorUserDataResponseDto;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'DONOR' | 'CAMPAIGN_CREATOR';
  country: string;
}

export interface LoginResponse {
  user: LoginUserDto;
  token: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  resetToken: string;
}

export interface ResetPasswordDto {
  resetToken: string;
  password: string;
}

// =========
// Mutations
// =========

export const useRegisterDonor = () => {
  return useMutation({
    mutationFn: (data: RegisterDonorDto) =>
      apiClient.post<RegisterDonorResponseDto>(
        API_ENDPOINTS.auth.registerDonor,
        data
      ),
  });
};

export const useRegisterCampaignCreator = () => {
  return useMutation({
    mutationFn: (data: RegisterCampaignCreatorDto) =>
      apiClient.post<RegisterCampaignCreatorResponseDto>(
        API_ENDPOINTS.auth.registerCampaignCreator,
        data
      ),
  });
};

// Hook for registering campaign creator with FormData (for institution with file uploads)
export const useRegisterCampaignCreatorFormData = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.postFormData<RegisterCampaignCreatorResponseDto>(
        API_ENDPOINTS.auth.registerCampaignCreator,
        formData
      ),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDto) =>
      apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, data),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordDto) =>
      apiClient.post(API_ENDPOINTS.auth.forgotPassword, data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpDto) =>
      apiClient.post<VerifyOtpResponse>(API_ENDPOINTS.auth.verifyOtp, data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) =>
      apiClient.post(API_ENDPOINTS.auth.resetPassword, data),
  });
};

// =========
// Queries
// =========

export const useUserById = (userId: string | null) => {
  return useQuery({
    queryKey: ['user', userId],
    enabled: !!userId,
    queryFn: () =>
      apiClient.get<LoginUserDto>(
        API_ENDPOINTS.user.getById(userId as string),
        true
      ),
  });
};
