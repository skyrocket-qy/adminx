export default function SkillPage() {
    const skills = [
      {
        title: "Lang & Framework",
        items: [
          "Go (Gin)",
          "Python (Flask, FastAPI)",
          "JavaScript, TypeScript",
          "React (Next.js)",
          "HTML, CSS, Tailwind CSS",
          "C/C++",
          "PHP",
          "Shell",
        ],
        tags: ["Go", "Python", "C", "JavaScript", "PHP", "C++", "Node.js", "CSS", "ReactJS", "HTML"],
      },
      {
        title: "DevOps",
        items: [
          "AWS: EC2, RDS, S3, Cognito, SES, KMS...etc",
          "Ansible",
          "Helm",
          "Docker",
          "Kubernetes (K8S)",
          "CI/CD",
          "Prometheus",
          "Fluentd",
          "Loki",
          "K6",
          "Grafana",
          "Terraform",
        ],
        tags: ["Git", "Github", "AWS"],
      },
      {
        title: "Database & OS",
        items: [
          "MySQL",
          "PostgreSQL",
          "Redis",
          "MongoDB",
          "NebulaGraph",
          "Linux",
          "versioned-migration",
        ],
        tags: ["PostgreSQL", "資料庫程式設計", "Shell", "MySQL", "Linux", "UNIX", "RDBMS"],
      },
      {
        title: "Protocol",
        items: [
          "RESTful",
          "gRPC",
          "ConnectRPC",
          "D-Bus",
          "WebSocket",
          "GraphQL",
        ],
        tags: ["Git", "Django", "Linux", "系統架構規劃", "軟體程式設計", "軟體工程系統開發", "模組化系統設計", "Shell", "UNIX"],
      },
      {
        title: "Project Management & Architecture",
        items: [
          "Jira",
          "Git, GitLab, GitHub",
          "Object-Oriented Programming",
          "Domain-Driven Design",
          "Test-Driven Design",
          "Dependency Injection",
          "Clean Architecture",
        ],
        tags: ["Git", "Github", "Version Control", "OOP", "SaaS"],
      },
      {
        title: "Machine Learning",
        items: [
          "Machine Learning",
          "Deep Learning",
          "Natural Language Processing",
        ],
        tags: ["Machine Learning", "深度學習", "TensorFlow", "NLP", "機器學習"],
      },
    ];
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">專長技能</h1>
        <div className="space-y-10">
          {skills.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <ul className="list-disc list-inside mb-3 text-sm space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-xs text-blue-800">
                {section.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 px-2 py-0.5 rounded-full">
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
  