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
    <div className="space-y-12">
      <div>
        <h2 className="text-heading font-mono font-semibold text-foreground mb-4">
          Select the services you need
        </h2>
        <p className="text-base font-mono text-text">
          More details of each service will be show in the next steps
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
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

      <div className="flex justify-between items-center pt-8">
        <PricingSummaryInline />
        <Button onClick={nextStep} disabled={!canContinue}>
          Next →
        </Button>
      </div>
    </div>
  );
}
