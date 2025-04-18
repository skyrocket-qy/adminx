export default function ProjectPage() {
    const projects = [
      {
        title: "HRBAC",
        duration: "2025/1~2025/2",
        description: [
          "Comparison of Different Database Solutions for Implementing HRBAC",
          "Compare between tradition SQL vs CTE vs Graph-based methods",
          "Clarify the Pros and Cons for Different Business Scales",
        ],
        linkText: "前往查看",
        href: "https://github.com/skyrocket-qy/hrbacx"
      },
      {
        title: "The application of tree-based model for well interpretation strategy -Taking League of Legends as an example-",
        duration: "2021/1~2022/6",
        description: [
          "Using Machine Learning methods to explore effective strategies for winning during MOBA game play.",
          "Use data augument methods to increase the model accuracy also decrease the label times.",
        ],
      },
      {
        title: "Alarm management system",
        duration: "2024/11~仍在進行",
        description: [
          "Built a real-time, high-throughput, multi-tenant SaaS alarm management service from the ground up(>1000 RPS)",
          "Spearheaded a team of 3 backend engineers, implementing robust library with clean architecture to improve team's 50% delivery velocity",
          "Architected critical system components focusing on horizontal scalability",
          "Integrated various AWS infrastructure(Cognito, EC2, KMS, RDS...etc) to reduce operational overhead",
          "Developed advanced SQL query optimizations that reduced complex query times from 60s to 0.1s",
        ], 
      },
    ];
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Project</h1>
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <span className="text-sm text-gray-500 whitespace-nowrap">{project.duration}</span>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                {project.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {project.linkText !== "" && (
                <div className="mt-3 text-right">
                    <a
                    href={project.href}
                    className="text-blue-600 hover:underline text-sm"
                    >
                    {project.linkText}
                    </a>
                </div>
                )}
            </div>
          ))}
        </div>
      </main>
    );
  }
  