

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

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDto) =>
      apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, data),
  });
};

export interface ForgotPasswordDto {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordDto) =>
      apiClient.post(API_ENDPOINTS.auth.forgotPassword, data),
  });
};

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  resetToken: string;
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpDto) =>
      apiClient.post<VerifyOtpResponse>(API_ENDPOINTS.auth.verifyOtp, data),
  });
};

export interface ResetPasswordDto {
  resetToken: string;
  password: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) =>
      apiClient.post(API_ENDPOINTS.auth.resetPassword, data),
  });
};
