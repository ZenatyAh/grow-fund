import useIsMobile from '@/hooks/useIsMobile';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const useToast = () => {
  const isMobile = useIsMobile();

  const getBaseConfig = (): ToastOptions => ({
    position: isMobile ? 'top-center' : 'top-right',
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    className:
      '!max-w-[90vw] !w-auto !min-w-[250px] sm:!min-w-[300px] !z-[9999] font-bold text-lg',
    style: {
      top: isMobile ? '40px' : undefined,
    },
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    const config = getBaseConfig();
    toast[type](message, config);
  };

  return { showToast };
};
