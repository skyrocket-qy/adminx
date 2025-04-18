const jobs = [
    {
      period: "2024/11 ~ Now",
      title: "Senior Backend Engineer",
      company: "Fontech（1~30 people）",
      location: "台北市大同區",
      highlights: [
        "Built a real-time, high-throughput, multi-tenant SaaS alarm management service from the ground up (>1000 RPS)",
        "Spearheaded a team of 3 backend engineers, implementing robust library with clean architecture to improve team's 50% delivery velocity",
        "Architected critical system components focusing on horizontal scalability",
        "Integrated various AWS infrastructure (Cognito, EC2, KMS, RDS...etc) to reduce operational overhead",
        "Developed advanced SQL query optimizations that reduced complex query times from 60s to 0.1s",
      ],
    },
    {
      period: "2024/10~2025/3 ・6 months",
      title: "BMC Firmware Engineer II",
      company: "American Megatrends (500 people up)",
      location: "新北市汐止區",
      highlights: [
        "Independently Operates in BMC",
        "Proficient in D-Bus usage",
        "Experienced and skilled in developing with Redfish APIs",
        "Implemented optimization library for REP architecture, saving up to 50% time and code",
        "Resolved multiple defects across different level modules",
        "Collaborated with India and US teams using English communication",
      ],
    },
    {
      period: "2024/3~2024/9 ・7 months",
      title: "Backend Developer",
      company: "Taihe (30~100 people",
      location: "台北市中山區",
      highlights: [
        "Implemented and maintained microservices using PHP and Go",
        "Developed new payment and management system using GoFrame and gRPC",
        "Quickly familiarized with custom ORM and architecture",
        "Assisted juniors resolving backend and frontend issues",
      ],
    },
    {
      period: "2023/9~2024/3 ・7 months",
      title: "Software Engineer (On-site at Google)",
      company: "Cienet（100~500 people）",
      location: "新北市新店區",
      highlights: [
        "Developed test scripts to increase Pixel camera test coverage from 85% to 95%",
        "Analyzed test data and resolved issues",
        "Maintained automated testing pipeline",
      ],
    },
    {
      period: "2022/6~2023/8 ・1 year 3 months",
      title: "Backend Developer",
      company: "Ubitus（100~500 people）",
      location: "台北市松山區",
      highlights: [
        "Built microservices on K8s with Go, Python, Node.js",
        "Set up cloud services via Docker, Ansible, Helm",
        "Maintained CMS and real-time comment system",
        "Developed AI-related services",
        "Built log collectors and CI/CD pipelines",
      ],
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
    },
  ];
  
  export default function WorkPage() {
    return (
      <main className=" w-full p-8 h-full overflow-y-auto flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Working experience</h1>
        <p className="mb-6 text-gray-600">Total : 3~4 years</p>
  
        <div className="space-y-8 h-full">
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
            </div>
          ))}
        </div>
      </main>
    );
  }
  