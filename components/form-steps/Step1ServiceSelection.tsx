'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { ServiceCard } from '../ui/ServiceCard';
import { Button } from '../ui/Button';

export function Step1ServiceSelection() {
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const toggleService = useFormStore((state) => state.toggleService);
  const nextStep = useFormStore((state) => state.nextStep);

  const canContinue = selectedServiceIds.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Select the services you need
        </h2>
        <p className="text-gray-600">
          More details of each service will be shown in the next steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            name={service.name}
            isSelected={selectedServiceIds.includes(service.id)}
            onClick={() => toggleService(service.id)}
          />
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={nextStep} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
