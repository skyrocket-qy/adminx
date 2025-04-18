export default function SkillPage() {
    const skills = [
      {
        title: "Languages & Frameworks",
        items: ["Go (Gin)", "Python (Flask, FastAPI)", "JavaScript / TypeScript", "React (Next.js)", "HTML, CSS, Tailwind", "C / C++", "PHP", "Shell"],
      },
      {
        title: "DevOps & Cloud",
        items: ["AWS (EC2, RDS, S3, Cognito, etc.)", "Docker & Kubernetes", "Helm, Terraform, Ansible", "Prometheus, Fluentd, Loki", "Grafana", "CI/CD pipelines", "K6"],
      },
      {
        title: "Database & OS",
        items: ["MySQL / PostgreSQL", "Redis, MongoDB", "NebulaGraph", "Linux / UNIX", "Schema versioning"],
      },
      {
        title: "Protocols",
        items: ["RESTful API", "gRPC / ConnectRPC", "GraphQL", "WebSocket", "D-Bus"],
      },
      {
        title: "Architecture & PM",
        items: ["Git, GitHub, Jira", "OOP", "DDD", "TDD", "Dependency Injection", "Clean Architecture"],
      },
      {
        title: "Machine Learning",
        items: ["Machine Learning", "Deep Learning", "NLP (Natural Language Processing)"],
      },
    ];
  
    return (
      <main className="p-8 bg-[#f5f7fa] min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Skill Set</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700">{skill.title}</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {skill.items.map((item, i) => (
                  <li key={i} className="pl-2 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-blue-500 before:rounded-full">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    );
  }
  