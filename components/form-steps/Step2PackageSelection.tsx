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

      {selectedServices.map((service) => (
        <div key={service.id} className="space-y-6">
          <div>
            <h2 className="text-heading font-mono font-semibold text-foreground mb-4">
              {service.name}
            </h2>
            <p className="text-base font-mono text-text max-w-3xl leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
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
      ))}

      <div className="flex justify-between items-center pt-8">
        <PricingSummaryInline />
        <Button onClick={nextStep} disabled={!canContinue}>
          Next →
        </Button>
      </div>
    </div>
  );
}
