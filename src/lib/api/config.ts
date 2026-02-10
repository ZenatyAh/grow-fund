

export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://gsg-project-group-2-production.up.railway.app';

export const API_ENDPOINTS = {
  auth: {
    registerCampaignCreator: '/api/v1/auth/register/campaign-creator',
    login: '/api/v1/auth/login',
    forgotPassword: '/api/v1/auth/password/forgot',
    verifyOtp: '/api/v1/auth/password/verify-otp',
    resetPassword: '/api/v1/auth/password/reset',
  },
  campaignCreator: {
    create: '/api/v1/campaign-creator',
    getById: (id: string) => `/api/v1/campaign-creator/${id}`,
    update: (id: string) => `/api/v1/campaign-creator/${id}`,
  },
};
