/**
 * API Client
 */

import { API_BASE_URL } from './config';

export const apiClient = {
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      let errorMessage = errorData.message || 'حدث خطأ غير متوقع';
      
      if (response.status === 409) {
        errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },
};
