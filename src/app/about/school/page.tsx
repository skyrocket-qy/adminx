export default function EducationPage() {
    return (
      <main className="h-full w-full p-8">
        <h1 className="text-2xl font-bold mb-6">學歷</h1>
  
        <div className="flex flex-col gap-6 text-gray-800 text-base">
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold">Chung Yuan Christian University</h2>
            <p className="text-sm text-gray-600">應用數學系碩士</p>
          </div>
  
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold">Chang Jung Christian University</h2>
            <p className="text-sm text-gray-600">會計與資訊學系大學</p>
          </div>
        </div>
      </main>
    );
  }
  