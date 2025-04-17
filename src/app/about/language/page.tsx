export default function LanguagePage() {
    const languages = [
      {
        name: "英文",
        skills: {
          listening: "中等",
          speaking: "中等",
          reading: "精通",
          writing: "中等",
        },
        tip: "挑戰模擬多益試題，測測你的英文能力",
      },
      {
        name: "中文",
        skills: {
          listening: "精通",
          speaking: "精通",
          reading: "精通",
          writing: "精通",
        },
      },
    ];
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">語文能力</h1>
        <div className="space-y-6">
          {languages.map((lang, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{lang.name}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>聽：{lang.skills.listening}</div>
                <div>說：{lang.skills.speaking}</div>
                <div>讀：{lang.skills.reading}</div>
                <div>寫：{lang.skills.writing}</div>
              </div>
              {lang.tip && (
                <p className="mt-3 text-xs text-gray-600 italic">{lang.tip}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    );
  }
  