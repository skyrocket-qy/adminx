const jobs = [
    {
      period: "2024/11~仍在職",
      title: "Senior Backend Engineer",
      company: "方客特股份有限公司（電腦軟體服務業 1~30人）",
      location: "台北市大同區",
      highlights: [
        "Built a real-time, high-throughput, multi-tenant SaaS alarm management service from the ground up (>1000 RPS)",
        "Spearheaded a team of 3 backend engineers, implementing robust library with clean architecture to improve team's 50% delivery velocity",
        "Architected critical system components focusing on horizontal scalability",
        "Integrated various AWS infrastructure (Cognito, EC2, KMS, RDS...etc) to reduce operational overhead",
        "Developed advanced SQL query optimizations that reduced complex query times from 60s to 0.1s",
      ],
      tags: ["Github", "Go", "AWS", "SaaS", "系統架構規劃", "Microservice"],
    },
    {
      period: "2024/10~2025/3 ・6個月",
      title: "BMC Firmware Engineer II",
      company: "美商安邁科技股份有限公司台灣分公司（電腦軟體服務業 500人以上）",
      location: "新北市汐止區",
      highlights: [
        "Independently Operates in BMC",
        "Proficient in D-Bus usage",
        "Experienced and skilled in developing with Redfish APIs",
        "Implemented optimization library for REP architecture, saving up to 50% time and code",
        "Resolved multiple defects across different level modules",
        "Collaborated with India and US teams using English communication",
      ],
      tags: ["C++", "BMC", "Redfish", "dbus", "Yocto", "Linux"],
    },
    {
      period: "2024/3~2024/9 ・7個月",
      title: "Backend Developer",
      company: "太禾科技有限公司（電腦軟體服務業 30~100人）",
      location: "台北市中山區",
      highlights: [
        "Implemented and maintained microservices using PHP and Go",
        "Developed new payment and management system using GoFrame and gRPC",
        "Quickly familiarized with custom ORM and architecture",
        "Assisted juniors resolving backend and frontend issues",
      ],
      tags: ["Go", "PHP", "MySQL", "mongo", "singlestore", "MemSQL"],
    },
    {
      period: "2023/9~2024/3 ・7個月",
      title: "Software Engineer (On-site at Google)",
      company: "瞬聯科技股份有限公司（電腦軟體服務業 100~500人）",
      location: "新北市新店區",
      highlights: [
        "Developed test scripts to increase Pixel camera test coverage from 85% to 95%",
        "Analyzed test data and resolved issues",
        "Maintained automated testing pipeline",
      ],
      tags: ["Python", "Shell", "Linux", "Test Scripts"],
    },
    {
      period: "2022/6~2023/8 ・1年3個月",
      title: "Backend Developer",
      company: "Ubitus（網際網路相關業 100~500人）",
      location: "台北市松山區",
      highlights: [
        "Built microservices on K8s with Go, Python, Node.js",
        "Set up cloud services via Docker, Ansible, Helm",
        "Maintained CMS and real-time comment system",
        "Developed AI-related services",
        "Built log collectors and CI/CD pipelines",
      ],
      tags: ["Go", "Python", "Kubernetes", "Docker", "PostgreSQL", "Linux"],
    },
    {
      period: "2020/9~2022/6 ・1年10個月",
      title: "Teaching Assistant",
      company: "Chung Yuan Christian University",
      location: "",
      highlights: [
        "OOP & Data Science TA",
        "Wrote automation scripts for grading",
      ],
      tags: ["Shell", "Python", "OOP", "Machine Learning", "Linux"],
    },
  ];
  
  export default function WorkPage() {
    return (
      <main className="h-full w-full p-8">
        <h1 className="text-2xl font-bold mb-6">工作經驗</h1>
        <p className="mb-6 text-gray-600">總年資：3~4年工作經驗</p>
  
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-xl shadow-sm text-gray-800"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-500">{job.period}</p>
              </div>
              <p className="text-sm text-gray-700">{job.company}</p>
              {job.location && (
                <p className="text-sm text-gray-500 mb-2">{job.location}</p>
              )}
              <ul className="list-disc pl-5 mb-3 text-sm space-y-1">
                {job.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-xs text-blue-800">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  