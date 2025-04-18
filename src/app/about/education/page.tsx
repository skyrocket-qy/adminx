export default function EducationPage() {
  return (
    <main className="h-full w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Education</h1>

      <div className="flex flex-col gap-6 text-gray-800 text-base">
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">Chung Yuan Christian University</h2>
          <p className="text-sm text-blue-600 mb-1">Master</p>
          <p className="text-sm text-gray-600">Applied Mathematics</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">Chang Jung Christian University</h2>
          <p className="text-sm text-blue-600 mb-1">Bachelor</p>
          <p className="text-sm text-gray-600">Accounting and Information Science</p>
        </div>
      </div>
    </main>
  );
}
