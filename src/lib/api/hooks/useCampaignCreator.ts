import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

// DTO types based on API documentation
export interface CreateCampaignCreatorDto {
  userId: string;
  type: 'INDIVIDUAL' | 'INSTITUTION';
  experience?: 'first_time' | 'previous_experience' | 'organization_representative';
  institutionCountry?: string;
  institutionName?: string;
  institutionType?: string;
  institutionDateOfEstablishment?: string;
  institutionLegalStatus?: string;
  institutionTaxIdentificationNumber?: string;
  institutionRegistrationNumber?: string;
  institutionRepresentativeName?: string;
  institutionRepresentativePosition?: string;
  institutionRepresentativeRegistrationNumber?: string;
  institutionRepresentativePhone?: string;
  institutionRepresentativeEmail?: string;
  institutionRegistrationDocument?: string;
  institutionCommercialLicense?: string;
  institutionWebsite?: string;
  institutionRepresentativeSocialMedia?: string;
  institutionIdPhoto?: string;
  institutionRepresentativePhoto?: string;
  institutionAuthorizationLetter?: string;
  // Individual fields
  individualName?: string;
  individualCountry?: string;
  individualContact?: string;
  individualProfileImage?: string;
}

export interface CampaignCreatorResponseDto {
  id: string;
  userId: string;
  type: string;
  institutionCountry: string;
  createdAt: string;
}

export interface CreateCreatorResponseWrapper {
  message: string;
  creator: CampaignCreatorResponseDto;
}

// Hook to create campaign creator profile (JSON body, e.g. for INDIVIDUAL)
export const useCreateCampaignCreatorProfile = () => {
  return useMutation({
    mutationFn: (data: CreateCampaignCreatorDto) =>
      apiClient.post<CreateCreatorResponseWrapper>(
        API_ENDPOINTS.campaignCreator.create,
        data,
        true // useAuth
      ),
  });
};

// Hook to create campaign creator profile with file uploads (multipart/form-data, e.g. for INSTITUTION)
export const useCreateCampaignCreatorProfileFormData = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.postFormData<CreateCreatorResponseWrapper>(
        API_ENDPOINTS.campaignCreator.create,
        formData,
        true // useAuth
      ),
  });
};

// Hook to update campaign creator profile (JSON)
export const useUpdateCampaignCreatorProfile = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCampaignCreatorDto> }) =>
      apiClient.patch<CampaignCreatorResponseDto>(
        API_ENDPOINTS.campaignCreator.update(id),
        data,
        true // useAuth
      ),
  });
};

// Hook to update campaign creator profile with file uploads (FormData)
export const useUpdateCampaignCreatorProfileFormData = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      apiClient.patchFormData<CampaignCreatorResponseDto>(
        API_ENDPOINTS.campaignCreator.update(id),
        formData,
        true // useAuth
      ),
  });
};
