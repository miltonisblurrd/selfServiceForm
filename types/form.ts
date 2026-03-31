export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  packages: Package[];
  disabled?: boolean;
  disabledMessage?: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  timeline: string;
  prepaidHours: boolean;
  included: string[];
  notIncluded: string[];
}

export interface SelectedService {
  serviceId: string;
  packageId: string;
  serviceName: string;
  packageName: string;
  price: number;
  timeline: string;
}

export interface UserDetails {
  fullName: string;
  email: string;
}

export interface ContractDetails {
  signersName: string;
  address: string;
  unitNumber: string;
  companyName: string;
  companyLegalName: string;
}

export interface FormData {
  step: number;
  selectedServiceIds: string[];
  selectedPackages: Record<string, string>;
  userDetails: UserDetails;
  contractDetails: ContractDetails;
  isUserTheSigner: boolean;
}
