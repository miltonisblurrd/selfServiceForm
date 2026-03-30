'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData, UserDetails, ContractDetails } from '@/types/form';

interface FormStore extends FormData {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleService: (serviceId: string) => void;
  selectPackage: (serviceId: string, packageId: string) => void;
  setUserDetails: (details: Partial<UserDetails>) => void;
  setContractDetails: (details: Partial<ContractDetails>) => void;
  setIsUserTheSigner: (value: boolean) => void;
  reset: () => void;
}

const initialState: FormData = {
  step: 1,
  selectedServiceIds: [],
  selectedPackages: {},
  userDetails: {
    fullName: '',
    email: '',
  },
  contractDetails: {
    signersName: '',
    address: '',
    unitNumber: '',
    companyName: '',
    companyLegalName: '',
  },
  isUserTheSigner: true,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setStep: (step) => set({ step }),
      
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      
      toggleService: (serviceId) => 
        set((state) => {
          const isSelected = state.selectedServiceIds.includes(serviceId);
          if (isSelected) {
            const newSelectedPackages = { ...state.selectedPackages };
            delete newSelectedPackages[serviceId];
            return {
              selectedServiceIds: state.selectedServiceIds.filter(id => id !== serviceId),
              selectedPackages: newSelectedPackages,
            };
          } else {
            return {
              selectedServiceIds: [...state.selectedServiceIds, serviceId],
            };
          }
        }),
      
      selectPackage: (serviceId, packageId) =>
        set((state) => ({
          selectedPackages: {
            ...state.selectedPackages,
            [serviceId]: packageId,
          },
        })),
      
      setUserDetails: (details) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            ...details,
          },
        })),
      
      setContractDetails: (details) =>
        set((state) => ({
          contractDetails: {
            ...state.contractDetails,
            ...details,
          },
        })),
      
      setIsUserTheSigner: (value) =>
        set((state) => ({
          isUserTheSigner: value,
          contractDetails: value
            ? { ...state.contractDetails, signersName: state.userDetails.fullName }
            : state.contractDetails,
        })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'blurrd-form-storage',
    }
  )
);
