// Données NON traduisibles (noms propres, technologies, liens, fichiers).
// Tous les textes (résumé, rôles, périodes, intitulés...) sont dans src/messages/{fr,en,ar}.json.
export const profile = {
  name: "Abdenour Foudhaili",
  email: "Abdenour.Foudhaili@esprit.tn",
  phone: "+216 27 662 406",
  github: "https://github.com/Abdenour-foudhaili",
  linkedin: "https://linkedin.com/in/abdenour-foudhaili",
  photo: "/media/profile/abdenour.webp",
  /** Un CV par langue. Les fichiers doivent exister dans public/cv/. */
  cv: {
    fr: "/cv/CV_Abdenour_Foudhaili_FR.pdf",
    en: "/cv/CV_Abdenour_Foudhaili_EN.pdf",
    ar: "/cv/CV_Abdenour_Foudhaili_AR.pdf",
  },
  /** Niveau 1 des compétences : technologies principales et ce qui les accompagne (tout figure dans le CV). */
  core: [
    { name: "Java / Spring Boot", parts: ["Java", "Spring Boot"], related: ["Spring Cloud", "JPA/Hibernate", "JUnit", "Mockito"] },
    { name: "NestJS", parts: ["NestJS"], related: ["Node.js", "TypeScript", "MongoDB", "REST API"] },
    { name: "Angular", parts: ["Angular"], related: ["TypeScript", "WebSocket"] },
    { name: "Docker / Kubernetes", parts: ["Docker", "Kubernetes"], related: ["Jenkins (CI/CD)", "SonarQube", "Prometheus", "Grafana"] },
  ],
  skills: [
    { id: "languages", items: ["Java", "TypeScript", "JavaScript", "SQL", "PHP"] },
    { id: "frameworks", items: ["Spring Boot", "Spring Cloud", "NestJS", "Node.js", "Next.js", "Angular", "JPA/Hibernate", "Symfony", "JavaFX"] },
    { id: "architecture", items: ["Microservices", "API Gateway", "REST API", "WebSocket", "RabbitMQ", "OpenFeign", "Keycloak"] },
    { id: "databases", items: ["PostgreSQL", "Redis", "MySQL", "MongoDB"] },
    { id: "devops", items: ["Docker", "Kubernetes", "Jenkins (CI/CD)", "SonarQube", "Semgrep (SAST)", "Prometheus", "Grafana"] },
    { id: "tools", items: ["Git", "Maven", "Vitest", "Selenium (Katalon Recorder)", "JUnit", "Mockito", "Tree-sitter", "Agile", "Scrum", "Power BI"] },
  ],
  experience: [
    { id: "dsi", stack: ["NestJS", "MongoDB", "Node.js", "RabbitMQ", "Scrum"], link: "https://github.com/ESPRIT-DSI-INTERS/DigiFederation_finance_licence_competition" },
    { id: "beecoders", stack: ["Docker", "Jenkins", "Kubernetes", "Grafana", "SonarQube"], link: null as string | null },
  ],
  education: [
    { id: "esprit", school: "École Supérieure Privée d’Ingénierie et de Technologies (ESPRIT)" },
    { id: "isik", school: "Institut Supérieur d’Informatique du Kef (ISIK)" },
  ],
};
