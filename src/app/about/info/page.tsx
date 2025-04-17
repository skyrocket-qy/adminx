export default function Page() {
    return (
      <main className="h-full w-full p-8">
        <h1 className="text-2xl font-bold mb-6">個人資料</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
          <div>
            <span className="font-semibold">性別：</span>男
          </div>
          <div>
            <span className="font-semibold">年齡：</span>32 歲
          </div>
          <div>
            <span className="font-semibold">役畢：</span>2020/1
          </div>
          <div>
            <span className="font-semibold">就業狀態：</span>在職中
          </div>
          <div>
            <span className="font-semibold">主要手機：</span>0911-111-111
          </div>
          <div>
            <span className="font-semibold">E-mail：</span>rivendinner@gmail.com
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">通訊地址：</span>台北市松山區八德路***
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">英文姓名：</span>HUANG, QING YUN
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">聯絡方式：</span>電話聯絡（10:00~21:00）
          </div>
          <div>
            <span className="font-semibold">駕駛執照：</span>
            <ul className="list-disc ml-5">
              <li>普通重型機車駕照</li>
              <li>普通小型車駕照</li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">交通工具：</span>普通重型機車
          </div>
        </div>
      </main>
    );
  }
  