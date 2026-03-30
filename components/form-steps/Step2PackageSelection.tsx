'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { PackageCard } from '../ui/PackageCard';
import { Button } from '../ui/Button';

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

      {selectedServices.map((service) => (
        <div key={service.id} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {service.name}
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="secondary">
          Back
        </Button>
        <Button onClick={nextStep} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
