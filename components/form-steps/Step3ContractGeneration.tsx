'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { muxVideos } from '@/config/mux-videos';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { PricingSummaryInline } from '../PricingSummaryInline';
import { useState } from 'react';
import { MuxVideoPlayer } from '../MuxVideoPlayer';

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
    <div className="w-full space-y-6">
      <button
        onClick={prevStep}
        className="text-text hover:text-foreground flex items-center gap-1.5 text-xs font-mono mb-2"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-[700px_1fr] gap-10">
        {/* Left Column - Contract Form */}
        <div className="space-y-6 mr-10">
          <div>
            <h2 className="text-2xl font-mono font-semibold text-foreground mb-2">
              Contract self-service
            </h2>
            <p className="text-sm font-mono text-text mb-3">
              Send yourself a ${totalPrice.toLocaleString()} contract for the list service below:
            </p>
            
            <ul className="space-y-1.5 mt-3 pl-0">
              {selectedItems.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5 text-sm font-mono text-text">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{item.packageName} {item.serviceName}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
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

          <div className="space-y-6">
            {/* Your Details */}
            <div className="space-y-3">
              <h3 className="text-base font-mono font-semibold text-foreground mb-3">Your Details</h3>
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
            <div className="space-y-3">
              <h3 className="text-base font-mono font-semibold text-foreground mb-3">Contract Details</h3>
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
          <div className="flex flex-wrap justify-center gap-6 py-4 border-t border-b border-gray-200">
            <div className="text-text text-xs font-mono font-semibold opacity-50">Wized</div>
            <div className="text-text text-xs font-mono font-semibold opacity-50">Webflow</div>
            <div className="text-text text-xs font-mono font-semibold opacity-50">HubSpot</div>
            <div className="text-text text-xs font-mono font-semibold opacity-50">PandaDoc</div>
          </div>

          <div className="pt-4">
            <PricingSummaryInline />
            <div className="mt-6">
              <Button
                onClick={handleGenerateContract}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Generating...' : 'Generate Contract'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Video Placeholder */}
        <div className="border rounded-lg sticky top-8 h-fit overflow-hidden" style={{ borderColor: '#113293', borderWidth: '1px', width: '400px' }}>
          {/* Blue Header */}
          <div className="bg-[#003399] px-4" style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
            <h3 className="text-sm font-mono font-semibold leading-none" style={{ color: '#ffffff', margin: 0 }}>pick the services</h3>
          </div>
          
          {/* Beige/Cream Content Area */}
          <div className="bg-[#FBFAF6] p-6">
            <MuxVideoPlayer 
              playbackId={muxVideos.step3.playbackId}
              title={muxVideos.step3.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
