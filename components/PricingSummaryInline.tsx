'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { useMemo } from 'react';

export function PricingSummaryInline() {
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const selectedPackages = useFormStore((state) => state.selectedPackages);

  const summary = useMemo(() => {
    const items = selectedServiceIds.map(serviceId => {
      const service = services.find(s => s.id === serviceId);
      const packageId = selectedPackages[serviceId];
      const pkg = service?.packages.find(p => p.id === packageId);
      
      return {
        serviceId,
        serviceName: service?.name || '',
        packageName: pkg?.name || '',
        price: pkg?.price || 0,
        timeline: pkg?.timeline || '',
      };
    });

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const hasAllPackagesSelected = selectedServiceIds.every(
      id => selectedPackages[id]
    );

    return { items, total, hasAllPackagesSelected };
  }, [selectedServiceIds, selectedPackages]);

  if (selectedServiceIds.length === 0 || summary.total === 0) {
    return <div />;
  }

  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="text-lg font-mono font-bold text-foreground">
          ${summary.total.toLocaleString()}
        </div>
        <div className="text-xs font-mono text-text">
          {summary.items.some(i => i.price > 0) && 'in prepaid hours'}
        </div>
      </div>
      
      {summary.hasAllPackagesSelected && (
        <div className="text-xs font-mono text-text">
          Ready to start. Estimated{' '}
          {summary.items[0]?.timeline || '1 Week'}
        </div>
      )}
    </div>
  );
}
