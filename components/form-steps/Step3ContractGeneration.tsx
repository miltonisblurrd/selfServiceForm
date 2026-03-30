'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { PricingSummaryInline } from '../PricingSummaryInline';
import { useState } from 'react';

export function Step3ContractGeneration() {
  const prevStep = useFormStore((state) => state.prevStep);
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const selectedPackages = useFormStore((state) => state.selectedPackages);
  const userDetails = useFormStore((state) => state.userDetails);
  const contractDetails = useFormStore((state) => state.contractDetails);
  const isUserTheSigner = useFormStore((state) => state.isUserTheSigner);
  const setUserDetails = useFormStore((state) => state.setUserDetails);
  const setContractDetails = useFormStore((state) => state.setContractDetails);
  const setIsUserTheSigner = useFormStore((state) => state.setIsUserTheSigner);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedItems = selectedServiceIds.map((serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    const packageId = selectedPackages[serviceId];
    const pkg = service?.packages.find((p) => p.id === packageId);
    return {
      serviceName: service?.name || '',
      packageName: pkg?.name || '',
      price: pkg?.price || 0,
    };
  });

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleGenerateContract = async () => {
    setIsSubmitting(true);
    alert('Contract generation will be wired up next! For now, this is just the UI.');
    setIsSubmitting(false);
  };

  const isFormValid =
    userDetails.fullName &&
    userDetails.email &&
    contractDetails.signersName &&
    contractDetails.address &&
    contractDetails.companyName &&
    contractDetails.companyLegalName;

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={prevStep}
          className="text-text hover:text-foreground flex items-center gap-2 text-base font-mono"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div>
        <h2 className="text-heading font-mono font-semibold text-foreground mb-4">
          Contract self-service
        </h2>
        <p className="text-base font-mono text-text mb-6">
          Send yourself a ${totalPrice.toLocaleString()} contract for the list service below:
        </p>
        
        <div className="space-y-2 mb-8">
          {selectedItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-base font-mono text-text">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item.packageName} {item.serviceName}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
        <Checkbox
          label="I'm the signer"
          checked={isUserTheSigner}
          onChange={(checked) => {
            setIsUserTheSigner(checked);
            if (checked) {
              setContractDetails({ signersName: userDetails.fullName });
            }
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Your Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-mono font-semibold text-foreground mb-6">Your Details</h3>
          <Input
            label="Your Full Name"
            value={userDetails.fullName}
            onChange={(value) => {
              setUserDetails({ fullName: value });
              if (isUserTheSigner) {
                setContractDetails({ signersName: value });
              }
            }}
            placeholder="Your Full Name"
            required
          />
          <Input
            label="E-Mail"
            type="email"
            value={userDetails.email}
            onChange={(value) => setUserDetails({ email: value })}
            placeholder="E-Mail"
            required
          />
        </div>

        {/* Contract Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-mono font-semibold text-foreground mb-6">Contract Details</h3>
          <Input
            label="Signers Name"
            value={contractDetails.signersName}
            onChange={(value) => setContractDetails({ signersName: value })}
            placeholder="Signers Name"
            required
            disabled={isUserTheSigner}
          />
          <Input
            label="Address"
            value={contractDetails.address}
            onChange={(value) => setContractDetails({ address: value })}
            placeholder="Address"
            required
          />
          <Input
            label="Unit Number, Building Number or Special Note"
            value={contractDetails.unitNumber}
            onChange={(value) => setContractDetails({ unitNumber: value })}
            placeholder="Unit Number, Building Number or Special Note"
          />
          <Input
            label="Company Name"
            value={contractDetails.companyName}
            onChange={(value) => setContractDetails({ companyName: value })}
            placeholder="Company Name"
            required
          />
          <Input
            label="Company Legal Name"
            value={contractDetails.companyLegalName}
            onChange={(value) => setContractDetails({ companyLegalName: value })}
            placeholder="Company Legal Name"
            required
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-8 pt-8 pb-4">
        <div className="text-text text-base font-mono font-semibold opacity-60">Wized</div>
        <div className="text-text text-base font-mono font-semibold opacity-60">Webflow</div>
        <div className="text-text text-base font-mono font-semibold opacity-60">HubSpot</div>
        <div className="text-text text-base font-mono font-semibold opacity-60">PandaDoc</div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <PricingSummaryInline />
        <Button
          onClick={handleGenerateContract}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Generating...' : 'Generate Contract'}
        </Button>
      </div>
    </div>
  );
}
