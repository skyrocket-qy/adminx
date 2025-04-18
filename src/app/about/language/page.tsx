export default function LanguagePage() {
    const languages = [
        {
          name: "English",
          skills: {
            listening: "Intermediate",
            speaking: "Intermediate",
            reading: "Proficient",
            writing: "Intermediate",
          },
          tip: "Challenge yourself with TOEIC mock tests to evaluate your English proficiency",
        },
        {
          name: "Mandarin",
          skills: {
            listening: "Proficient",
            speaking: "Proficient",
            reading: "Proficient",
            writing: "Proficient",
          },
        },
      ];
      
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Language</h1>
        <div className="space-y-6">
          {languages.map((lang, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{lang.name}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Listen：{lang.skills.listening}</div>
                <div>Speak：{lang.skills.speaking}</div>
                <div>Read：{lang.skills.reading}</div>
                <div>Write：{lang.skills.writing}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  