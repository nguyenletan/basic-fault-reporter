import { useState } from 'react';
import { Alert } from 'react-native';

export interface CapturedPhoto {
  uri: string;
  id: string;
}

interface UseInspectionStepsProps {
  hasAbnormalNoise: boolean;
  minPhotos: number;
}

export const useInspectionSteps = ({ hasAbnormalNoise, minPhotos }: UseInspectionStepsProps) => {
  const totalSteps = hasAbnormalNoise ? 3 : 2;
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [step1Photos, setStep1Photos] = useState<CapturedPhoto[]>([]);
  const [step2Photos, setStep2Photos] = useState<CapturedPhoto[]>([]);
  const [step3VideoUri, setStep3VideoUri] = useState<string | null>(null);

  const photos = currentStep === 1 ? step1Photos : currentStep === 2 ? step2Photos : [];
  const setPhotos =
    currentStep === 1 ? setStep1Photos : currentStep === 2 ? setStep2Photos : () => {};

  const handleNextStep = () => {
    if (currentStep === 1 && photos.length < minPhotos) {
      Alert.alert(
        'Photos Required',
        `Please capture at least ${minPhotos} photo(s) for the equipment overview.`
      );
      return false;
    }
    if (currentStep === 2 && photos.length < minPhotos) {
      Alert.alert(
        'Photos Required',
        `Please capture at least ${minPhotos} photo(s) for the close-up photos.`
      );
      return false;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      return true;
    } else if (currentStep === 2 && hasAbnormalNoise) {
      setCurrentStep(3);
      return true;
    }
    return false;
  };

  const handlePreviousStep = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const resetSteps = () => {
    setStep1Photos([]);
    setStep2Photos([]);
    setStep3VideoUri(null);
    setCurrentStep(1);
  };

  const getStepTitle = () => {
    if (currentStep === 1) return 'Full Equipment Overview';
    if (currentStep === 2) return 'Close-Up of Key Components';
    return 'Record Abnormal Sound';
  };

  const getStepDescription = (maxVideoDuration: number) => {
    if (currentStep === 1) return 'Capture overall view of the equipment (1-5 photos)';
    if (currentStep === 2) return 'Capture detailed close-ups of important components (1-5 photos)';
    return `Record a short video of the abnormal sound (max ${maxVideoDuration}s)`;
  };

  return {
    currentStep,
    totalSteps,
    step1Photos,
    step2Photos,
    step3VideoUri,
    photos,
    setPhotos,
    setStep1Photos,
    setStep2Photos,
    setStep3VideoUri,
    handleNextStep,
    handlePreviousStep,
    resetSteps,
    getStepTitle,
    getStepDescription,
  };
};
