

// On the client, we use an empty string so requests go to `/api/...` and hit Next.js rewrites (bypassing CORS).
// On the server, we need the absolute URL because Node.js fetch doesn't support relative URLs.
export const API_BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gsg-project-group-2-production.up.railway.app'
    : '';

export const API_ENDPOINTS = {
  auth: {
    registerDonor: '/api/v1/auth/register/donor',
    registerCampaignCreator: '/api/v1/auth/register/campaign-creator',
    login: '/api/v1/auth/login',
    forgotPassword: '/api/v1/auth/password/forgot',
    verifyOtp: '/api/v1/auth/password/verify-otp',
    resetPassword: '/api/v1/auth/password/reset',
  },
  user: {
    getById: (id: string) => `/api/v1/user/${id}`,
  },
  campaignCreator: {
    create: '/api/v1/campaign-creator',
    getById: (id: string) => `/api/v1/campaign-creator/${id}`,
    update: (id: string) => `/api/v1/campaign-creator/${id}`,
  },
};
