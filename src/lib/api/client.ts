/**
 * API Client
 */

import { API_BASE_URL } from './config';

const REQUEST_TIMEOUT_MS = 45_000;

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const getHeaders = (includeAuth: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const apiClient = {
  post: async <T>(endpoint: string, data: unknown, useAuth: boolean = false): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(useAuth),
        body: JSON.stringify(data),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error('الخادم لم يرد في الوقت المحدد. تحقق من الاتصال أو حاول لاحقاً.');
      }
      throw err;
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string; error?: string; statusCode?: number };
      let errorMessage =
        errorData.message ||
        errorData.error ||
        (response.status === 500 ? `خطأ من الخادم (500). تحقق من سجلات الخادم.` : 'حدث خطأ غير متوقع');
      if (response.status === 409) {
        errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /** POST as multipart/form-data for file uploads (e.g. institution campaign creator profile). Do not set Content-Type; browser sets it with boundary. */
  postFormData: async <T>(endpoint: string, formData: FormData, useAuth: boolean = false): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const headers: HeadersInit = {};
    if (useAuth) {
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error('الخادم لم يرد في الوقت المحدد. تحقق من الاتصال أو حاول لاحقاً.');
      }
      throw err;
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string; error?: string; statusCode?: number };
      let errorMessage =
        errorData.message ||
        errorData.error ||
        (response.status === 500 ? `خطأ من الخادم (500). تحقق من سجلات الخادم.` : 'حدث خطأ غير متوقع');
      if (response.status === 404) {
        errorMessage = `المسار غير موجود (404). تحقق من أن المسار ${endpoint} موجود في الخادم.`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  get: async <T>(endpoint: string, useAuth: boolean = true): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(useAuth),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'حدث خطأ غير متوقع');
    }

    return response.json();
  },

  patch: async <T>(endpoint: string, data: unknown, useAuth: boolean = true): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: getHeaders(useAuth),
        body: JSON.stringify(data),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error('الخادم لم يرد في الوقت المحدد. تحقق من الاتصال أو حاول لاحقاً.');
      }
      throw err;
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string; error?: string; statusCode?: number };
      const errorMessage =
        errorData.message ||
        errorData.error ||
        (response.status === 500 ? `خطأ من الخادم (500). تحقق من سجلات الخادم.` : 'حدث خطأ غير متوقع');
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /** PATCH as multipart/form-data for file uploads (e.g. updating institution campaign creator profile). */
  patchFormData: async <T>(endpoint: string, formData: FormData, useAuth: boolean = true): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const headers: HeadersInit = {};
    if (useAuth) {
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers,
        body: formData,
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error('الخادم لم يرد في الوقت المحدد. تحقق من الاتصال أو حاول لاحقاً.');
      }
      throw err;
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string; error?: string; statusCode?: number };
      const errorMessage =
        errorData.message ||
        errorData.error ||
        (response.status === 500 ? `خطأ من الخادم (500). تحقق من سجلات الخادم.` : 'حدث خطأ غير متوقع');
      throw new Error(errorMessage);
    }

    return response.json();
  },
};
