export default function Page() {
    return (
      <main className="h-full w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Gender</span>
            <span className="text-lg font-semibold">Male</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Age</span>
            <span className="text-lg font-semibold">32</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Military Service</span>
            <span className="text-lg font-semibold">Completed (2020/01)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-lg font-semibold break-all">rivendinner@gmail.com</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Chinese Name</span>
            <span className="text-lg font-semibold">黃青雲</span>
          </div>
          <div className="flex flex-col ">
            <span className="text-sm font-medium text-gray-500">English Name</span>
            <span className="text-lg font-semibold">HUANG, QING YUN</span>
          </div>
        </div>
      </main>
    );
  }
  