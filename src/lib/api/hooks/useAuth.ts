

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface RegisterCampaignCreatorDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
  country: string;
  type: 'INDIVIDUAL' | 'INSTITUTION' | 'individual' | 'institution';
  dateOfBirth?: string;
}

export const useRegisterCampaignCreator = () => {
  return useMutation({
    mutationFn: (data: RegisterCampaignCreatorDto) =>
      apiClient.post(API_ENDPOINTS.auth.registerCampaignCreator, data),
  });
};
