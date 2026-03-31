'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { PackageCard } from '../ui/PackageCard';
import { Button } from '../ui/Button';
import { PricingSummaryInline } from '../PricingSummaryInline';

export function Step2PackageSelection() {
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const selectedPackages = useFormStore((state) => state.selectedPackages);
  const selectPackage = useFormStore((state) => state.selectPackage);
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);

  const selectedServices = services.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const canContinue = selectedServiceIds.every(
    (serviceId) => selectedPackages[serviceId]
  );

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
        {/* Left Column - Package Selection */}
        <div className="space-y-6 mr-10">
          {selectedServices.length > 0 ? (
            selectedServices.map((service) => (
              <div key={service.id} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
                <div className="mb-4">
                  <h2 className="text-2xl font-mono font-semibold text-foreground mb-3">
                    {service.name}
                  </h2>
                  <p className="text-sm font-mono text-text leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {service.packages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      name={pkg.name}
                      price={pkg.price}
                      timeline={pkg.timeline}
                      prepaidHours={pkg.prepaidHours}
                      included={pkg.included}
                      notIncluded={pkg.notIncluded}
                      isSelected={selectedPackages[service.id] === pkg.id}
                      onClick={() => selectPackage(service.id, pkg.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-text font-mono text-sm">
              No services selected. Please go back and select at least one service.
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <PricingSummaryInline />
            <div className="mt-6">
              <Button onClick={nextStep} disabled={!canContinue}>
                Next →
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
