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
      <div className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar - Hidden on mobile */}
        <Sidebar />
        
        {/* Main Content - Full width on mobile, constrained on desktop */}
        <main className="flex-1 lg:ml-80 lg:mr-96 p-4 md:p-8">
          <MultiStepForm />
        </main>
        
        {/* Right Sticky Sidebar - Hidden on mobile */}
        <PricingSummary />
        
        {/* Mobile Pricing Summary - Shows at bottom on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
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
        <div className="text-2xl font-bold text-gray-900">
          ${total.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
    </div>
  );
}
