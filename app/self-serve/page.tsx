'use client';

import { FormProvider } from '@/components/FormProvider';
import { Sidebar } from '@/components/Sidebar';
import { PricingSummary } from '@/components/PricingSummary';
import { MultiStepForm } from '@/components/MultiStepForm';
import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';

export default function SelfServePage() {
  return (
    <FormProvider>
      <div className="flex min-h-screen bg-background">
        {/* Left Sidebar - Slimmer */}
        <Sidebar />
        
        {/* Main Content - Clean 2 column layout */}
        <main className="flex-1 lg:ml-64 p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <MultiStepForm />
          </div>
        </main>
        
        {/* Right Sticky Sidebar removed - pricing is part of main content now */}
        
        {/* Mobile Pricing Summary */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 p-4 shadow-lg">
          <MobilePricingSummary />
        </div>
      </div>
    </FormProvider>
  );
}

function MobilePricingSummary() {
  const selectedServiceIds = useFormStore((state) => state.selectedServiceIds);
  const selectedPackages = useFormStore((state) => state.selectedPackages);
  
  const total = selectedServiceIds.reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    const packageId = selectedPackages[serviceId];
    const pkg = service?.packages.find(p => p.id === packageId);
    return sum + (pkg?.price || 0);
  }, 0);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-3xl font-mono font-bold text-foreground">
          ${total.toLocaleString()}
        </div>
        <div className="text-body font-mono text-text">Total</div>
      </div>
    </div>
  );
}
