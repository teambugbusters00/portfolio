import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const AISkillCard = ({ index, title, description }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#111522] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col"
      >
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>

        <p className="text-secondary text-[14px] text-center mt-4">
          {description}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

const AISkills = () => {
  const aiSkills = [
    {
      title: "RAG",
      description: "Retrieval-Augmented Generation for enhanced AI responses with contextual information retrieval.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/langchain/langchain-original.svg",
    },
    {
      title: "LLMs",
      description: "Large Language Models for advanced natural language processing and generation.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    },
    {
      title: "GenAI",
      description: "Generative AI systems creating new content like text, images, and code from learned patterns.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    },
    {
      title: "AIML",
      description: "Artificial Intelligence and Machine Learning for intelligent systems and data-driven solutions.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
  ];

  const interactiveElements = [
    {
      title: "Animated Avatar",
      description: "3D holographic assistant with realistic animations, blinking eyes, and mouth movements.",
      icon: "https://img.icons8.com/fluency/48/3d-model.png",
    },
    {
      title: "Interactive Keyboard",
      description: "3D skill keyboard with dynamic animations and real-time skill information display.",
      icon: "https://img.icons8.com/fluency/48/keyboard.png",
    },
    {
      title: "Cursor Tracking",
      description: "Intelligent cursor guidance providing contextual hints and navigation assistance.",
      icon: "https://img.icons8.com/fluency/48/cursor.png",
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>AI & ML Expertise</p>
        <h2 className={styles.sectionHeadText}>Skills in AIML</h2>
      </motion.div>

      <div className="mt-12">
        <h3 className="text-white text-[24px] font-bold text-center mb-8">
          AI/ML Expertise
        </h3>
        <div className="flex flex-wrap gap-10 justify-center">
          {aiSkills.map((skill, index) => (
            <AISkillCard key={skill.title} index={index} {...skill} />
          ))}
        </div>
      </div>

    </>
  );
};

export default SectionWrapper(AISkills, "aiskills");