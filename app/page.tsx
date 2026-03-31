'use client';

import { FormProvider } from '@/components/FormProvider';
import { Sidebar } from '@/components/Sidebar';
import { MultiStepForm } from '@/components/MultiStepForm';
import { useFormStore } from '@/store/form-store';
import { services } from '@/config/services';

export default function SelfServiceProjectRequestPage() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Left Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-56">
            <div className="mx-auto px-8 py-8">
              <MultiStepForm />
            </div>
          </main>
        </div>
        
        {/* Mobile Pricing Summary */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 p-4 shadow-lg z-50">
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
