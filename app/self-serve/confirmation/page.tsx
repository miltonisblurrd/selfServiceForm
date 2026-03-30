export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600">
          Thank you for choosing Blurrd Studio. Your contract has been emailed to you, 
          and we'll be in touch shortly to kick off your project.
        </p>

        <div className="bg-white p-6 rounded-lg border border-gray-200 text-left space-y-4">
          <h2 className="font-semibold text-gray-900">What happens next?</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>You'll receive a payment receipt from Stripe</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Your contract is in your email inbox</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Our team will reach out within 24 hours to schedule kickoff</span>
            </li>
          </ul>
        </div>

        <a
          href="https://blurrdstudio.com"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
