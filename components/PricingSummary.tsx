'use client';

import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';
import { useMemo } from 'react';

export function PricingSummary() {
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

  if (selectedServiceIds.length === 0) {
    return null;
  }

  return (
    <aside className="fixed right-0 top-0 h-screen w-96 bg-white border-l-2 border-gray-300 p-8 hidden lg:block overflow-y-auto">
      <div className="space-y-6">
        <h3 className="text-heading font-mono font-semibold text-foreground">Resume</h3>

        <div>
          <div className="text-5xl font-mono font-bold text-foreground">
            ${summary.total.toLocaleString()}
          </div>
          <div className="text-body font-mono text-text mt-1">
            {summary.items.some(i => i.price > 0) && 'in prepaid hours'}
          </div>
        </div>

        {summary.hasAllPackagesSelected && (
          <div className="text-body font-mono text-text">
            Ready to start. Estimated{' '}
            {summary.items[0]?.timeline || '1 Week'}
          </div>
        )}

        <div className="space-y-3 pt-4 border-t-2 border-gray-200">
          {summary.items.map((item) => (
            <div key={item.serviceId} className="flex items-start gap-2">
              <div className="text-green-500 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-body font-mono font-semibold text-foreground">
                  {item.packageName} {item.serviceName}
                </div>
                {item.price > 0 && (
                  <div className="text-body font-mono text-text">
                    ${item.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-2 text-body font-mono">
          <a href="#" className="text-text hover:text-foreground flex items-center gap-1">
            How does the payment process work?
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
          <a href="#" className="text-text hover:text-foreground flex items-center gap-1">
            How is the timeline of work?
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}
