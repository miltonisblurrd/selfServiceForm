'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
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
    // TODO: Wire up PDF generation, email, and payment redirect
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
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Contract self-service
        </h2>
        <p className="text-gray-600">
          Send yourself a ${totalPrice.toLocaleString()} contract for the list service below:
        </p>
      </div>

      <div className="space-y-2">
        {selectedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item.packageName} {item.serviceName}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Your Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Your Details</h3>
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
          <h3 className="text-xl font-semibold text-gray-900">Contract Details</h3>
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
      <div className="flex justify-center gap-6 pt-6">
        <div className="text-gray-400 text-sm font-semibold">Wized</div>
        <div className="text-gray-400 text-sm font-semibold">Webflow</div>
        <div className="text-gray-400 text-sm font-semibold">HubSpot</div>
        <div className="text-gray-400 text-sm font-semibold">PandaDoc</div>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="secondary">
          Back
        </Button>
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
