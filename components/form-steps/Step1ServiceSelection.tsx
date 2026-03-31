'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { ServiceCard } from '../ui/ServiceCard';
import { Button } from '../ui/Button';
import { PricingSummaryInline } from '../PricingSummaryInline';

export function Step1ServiceSelection() {
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const toggleService = useFormStore((state) => state.toggleService);
  const nextStep = useFormStore((state) => state.nextStep);

  const canContinue = selectedServiceIds.length > 0;

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-mono font-semibold text-foreground mb-2">
          Select the services you need
        </h2>
        <p className="text-sm font-mono text-text">
          More details of each service will be show in the next steps
        </p>
      </div>

      <div className="grid grid-cols-[700px_1fr] gap-10">
        {/* Left Column - Service Selection */}
        <div className="flex flex-col gap-5 mr-10">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              name={service.name}
              isSelected={selectedServiceIds.includes(service.id)}
              onClick={() => toggleService(service.id)}
              disabled={service.disabled}
              disabledMessage={service.disabledMessage}
            />
          ))}
          
          {/* Details Section */}
          {selectedServiceIds.length > 0 && (
            <div style={{ marginTop: '60px' }}>
              <h3 className="text-lg font-mono font-semibold text-foreground mb-4">Details</h3>
              <div className="space-y-4">
                {selectedServiceIds.map((serviceId) => {
                  const service = services.find(s => s.id === serviceId);
                  if (!service || service.disabled) return null;
                  return (
                    <div key={serviceId} className="text-sm font-mono text-text leading-relaxed">
                      <div className="font-semibold text-foreground mb-1">{service.name}</div>
                      <div>{service.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Button Section */}
          <div style={{ marginTop: '100px' }}>
            <PricingSummaryInline />
            <div className="mt-6">
              <Button onClick={nextStep} disabled={!canContinue}>
                {selectedServiceIds.length > 0 
                  ? `Choose your Package for ${services.filter(s => selectedServiceIds.includes(s.id)).map(s => s.name).join(" & ")}`
                  : 'Choose your Package'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Video/Image Placeholder */}
        <div className="border rounded-lg sticky top-8 h-fit overflow-hidden" style={{ borderColor: '#113293', borderWidth: '1px', width: '400px' }}>
          {/* Blue Header */}
          <div className="bg-[#003399] px-4" style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
            <h3 className="text-sm font-mono font-semibold leading-none" style={{ color: '#ffffff', margin: 0 }}>pick the services</h3>
          </div>
          
          {/* Beige/Cream Content Area */}
          <div className="bg-[#FBFAF6] p-6">
            <div className="flex items-center justify-center" style={{ height: '600px' }}>
              <div className="text-center">
                <div className="text-gray-500 text-sm font-mono mb-2">Video Preview</div>
                <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
