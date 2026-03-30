'use client';

import { useFormStore } from '@/store/form-store';
import { Step1ServiceSelection } from './form-steps/Step1ServiceSelection';
import { Step2PackageSelection } from './form-steps/Step2PackageSelection';
import { Step3ContractGeneration } from './form-steps/Step3ContractGeneration';

export function MultiStepForm() {
  const step = useFormStore((state) => state.step);

  return (
    <div className="max-w-4xl mx-auto">
      {step === 1 && <Step1ServiceSelection />}
      {step === 2 && <Step2PackageSelection />}
      {step === 3 && <Step3ContractGeneration />}
    </div>
  );
}
