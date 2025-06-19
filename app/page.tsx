import { TalentAcquisitionForm } from "@/components/talentAcquisition"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Talent Acquisition Form</h1>
          <p className="mt-2 text-gray-600">Complete all sections to submit your application</p>
        </header>
        <TalentAcquisitionForm />
      </div>
    </div>
  )
}
