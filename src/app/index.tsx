import React from 'react';
import { useRouter } from 'expo-router';
import CaptureScreen from '@/screens/CaptureScreen';

export default function IndexRoute() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the Vault tab
    router.replace('/vault');
  };

  return <CaptureScreen onNext={handleNext} />;
}
