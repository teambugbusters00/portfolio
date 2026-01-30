import {
  novalearn,
  ponggame,
  portfolio,
  backend,
  creator,
  coursera,
  hr,
  cp,
  fcc,
  mobile,
  web,
  github,
  ideas,
  concepts,
  designs,
  code,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "achievement",
    title: "Achievement",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Developer",
    icon: web,
  },
  {
    title: "Web Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full Stack Web Developer",
    icon: creator,
  },
  {
    title: "AI-ML Developer",
    icon: creator,
  },
];

const achievements = [
  {
    title: ["Fullstack MERN"],
    company_name: "Underrated Coder",
    icon: fcc,
    iconBg: "#383E56",
    date: "2024",
    points: ["Complete MERN Stack Development Course"],
    credential: [
      "https://drive.google.com/file/d/1JWdXi4MoXwSy5JrRb1ra8wyo7nwufPh2/view?usp=drive_link",
    ],
  },
  {
    title: ["Java with OOPs"],
    company_name: "Infosys Springboard",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "2024",
    points: ["Object-Oriented Programming in Java"],
    credential: [
      "https://drive.google.com/file/d/1JXWzuZ95zf0Q-Zl8iUunJktu_ttvAISu/view?usp=drive_link",
    ],
  },
  {
    title: ["C Programming"],
    company_name: "Infosys Springboard",
    icon: cp,
    iconBg: "#383E56",
    date: "2024",
    points: ["Fundamental C Programming Concepts"],
    credential: [
      "https://drive.google.com/file/d/1JYMwmmTv67vqxp0Rf8BvpL3hvmM2Gdvx/view",
    ],
  },
  {
    title: ["Power BI Fundamentals"],
    company_name: "Coursera",
    icon: coursera,
    iconBg: "#0056d2",
    date: "2024",
    points: ["Power BI Fundamentals"],
    credential: ["https://certx.in/certificate/36a28147-6eed-47a5-8342-e5f926ebba61536110"],
  },
  {
    title: ["Google AI Apps with Gemini"],
    company_name: "Google",
    icon: coursera,
    iconBg: "#0056d2",
    date: "2024",
    points: ["Building Real World AI Applications with Gemini"],
    credential: ["https://drive.google.com/file/d/1JX3QrwVFA-3VEK4xLpStY-CiWUW75M1j/view?usp=drive_link"],
  },
  {
    title: ["Docker & Kubernetes"],
    company_name: "Scaler",
    icon: fcc,
    iconBg: "#383E56",
    date: "2024",
    points: ["Containerization and Orchestration"],
    credential: [
      "https://drive.google.com/file/d/1GIdqbdO_0m4wkcMDGvCo2z85g3x70AVh/view?usp=drive_link",
    ],
  },
  {
    title: ["IIT G Summer Analytics"],
    company_name: "IIT Guwahati",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "2025",
    points: ["Data Analytics and Machine Learning"],
    credential: [
      "https://drive.google.com/file/d/1d9hRHivuOz7VYRCz3PxQ2pK8PWFnLrA8/view?usp=drive_link",
    ],
  },
  {
    title: ["Agentic AI Course"],
    company_name: "Microsoft Learn",
    icon: cp,
    iconBg: "#383E56",
    date: "2024",
    points: ["Advanced AI Agent Development"],
    credential: [
      "https://drive.google.com/file/d/1jNlRArRUOVWspYBw5C_LCjnMmxoocwxs/view?usp=drive_link",
    ],
  },
  {
   title: ["SDE Intern"],
   company_name: "Some Company",
   icon: fcc,
   iconBg: "#383E56",
   date: "2024",
   points: ["Software Development Engineering Internship"],
   credential: [
     "https://drive.google.com/file/d/1ppQR0-f-FKOnQhWXxwW6109a9wQfEdvR/view",
   ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Jha Zen Z Codrr proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Jha Zen Z Codrr does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Jha Zen Z Codrr boosted our website traffic by 50% through his smart optimization. We are Truly grateful!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Exoplanet Detection using AI & ML",
    description:
      "Developed a deep learning-based system to detect and classify exoplanets using NASA's Kepler dataset. Implemented data preprocessing, noise filtering, and CNN models achieving 94% detection accuracy. Created a visualization dashboard to display planetary transits and confidence scores. Integrated explainable AI to highlight key detection regions within stellar light curves.",
    tags: [
      {
        name: "deeplearning",
        color: "blue-text-gradient",
      },
      {
        name: "machinelearning",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
      {
        name: "tensorflow",
        color: "violet-text-gradient",
      },
      {
        name: "nasa",
        color: "orange-text-gradient",
      },
    ],
    image: novalearn,
    source_code_link: "https://github.com/teambugbusters00/Exoplanet-Detection-U-using-ai-and-ml",
  },
  {
    name: "More Projects on GitHub",
    description:
      "For more projects, visit my GitHub profile",
    tags: [
      {
        name: "github",
        color: "blue-text-gradient",
      },
    ],
    image: github,
    source_code_link: "https://github.com/teambugbusters00",
  },
];

const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  {
    text: "Concepts",
    imgPath: concepts,
    font: "'Courier New', Courier, monospace",
  },
  {
    text: "Designs",
    imgPath: designs,
    font: "'Times New Roman', Times, serif",
  },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  {
    text: "Ideas",
    imgPath: ideas,
    font: "'Comic Sans MS', cursive, sans-serif",
  },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];

export { achievements, projects, services, testimonials, words };
