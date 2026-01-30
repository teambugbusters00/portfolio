import React, { useEffect, useRef, useState } from "react";
import Avatar3D from "./Avatar3D";
import "./virtualAssistant.css"; // styles below
import { usePreloader } from "./preloader";

export default function VirtualAssistant({ onGuidanceChange }) {
  const { isLoading } = usePreloader();

  if (isLoading) return null;
  const [showCard, setShowCard] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [userName, setUserName] = useState(null);
  const [asked, setAsked] = useState(false);
  const utteranceRef = useRef(null);

  // speak helper that toggles speaking state
  const speak = (text, withVoiceTone = true) =>
    new Promise((resolve) => {
      if (!withVoiceTone) {
        resolve();
        return;
      }
      // cancel any current
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.pitch = 1.1; // slightly higher for female tone
      u.rate = 1;
      u.volume = 1;

      // Function to select and set female voice
      const setFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        // Expanded voice selection for better compatibility
        const femaleVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('hazel') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('victoria') ||
          voice.name.toLowerCase().includes('alex') ||
          (voice.name.toLowerCase().includes('english') && voice.name.toLowerCase().includes('us'))
        );
        if (femaleVoice) {
          u.voice = femaleVoice;
        }
      };

      // Try to set voice immediately
      setFemaleVoice();

      // Also listen for voices changed event (for async loading)
      const handleVoicesChanged = () => {
        setFemaleVoice();
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

      utteranceRef.current = u;

      u.onstart = () => setSpeaking(true);
      u.onend = () => {
        setSpeaking(false);
        resolve();
      };
      u.onerror = () => {
        setSpeaking(false);
        resolve();
      };
      window.speechSynthesis.speak(u);
    });

  // show card and auto-play intro on mount
  useEffect(() => {
    const doIntro = async () => {
      // small delay so the page loads and preloader finishes in your app before this mounts
      await new Promise((r) => setTimeout(r, 350));
      setAsked(true);
      // introduction text (single speak)
      await speak(
        "Hi, my name is Kara. I am Vijay's assistant, like Tony has Jarvis, I am for Vijay. I am here to guide you. I know sir is not here to guide so I am here to guide you. May I know your name?",
        true
      );
    };
    doIntro();
    // cleanup on unmount
    return () => window.speechSynthesis.cancel();
  }, []);

  // user submits a name (or null when skip)
  const handleNameSubmit = async (name) => {
    if (name === null) {
      // skip: don't play tone (per your spec). But give a short silent text by visual/hint
      setUserName(null);
      setShowCard(false);
      // show short visual hint (no voice)
      showHint("Alright — I'll guide you without a name.");
      return;
    }

    const trimmed = name.trim();
    if (!trimmed) {
      // same as skip
      setUserName(null);
      setShowCard(false);
      showHint("Alright — I'll guide you without a name.");
      return;
    }

    // Close card immediately
    setUserName(trimmed);
    setShowCard(false);
    // Visual hint
    showHint(`Nice to meet you, ${trimmed}.`);
    // Play a short voice greeting with name (in background)
    speak(`Nice to meet you, ${trimmed}. I will guide you.`);
  };

  // small helper to display a short on-screen hint
  const hintTimeout = useRef();
  const showHint = (text) => {
    const box = document.getElementById("kara-hint");
    if (!box) return;
    box.innerText = text;
    box.style.opacity = "1";
    clearTimeout(hintTimeout.current);
    hintTimeout.current = setTimeout(() => {
      box.style.opacity = "0";
    }, 4000);
  };

  // Silent guiding based on cursor location
  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.elementFromPoint(e.clientX, e.clientY);
      const hintBox = document.getElementById("kara-hint");

      if (!section || !hintBox) return;

      let message = null;

      if (section.closest("#contact")) {
        message = userName
          ? `${userName}, you can use the form to contact Vijay.`
          : `You can use the form to contact Vijay.`;
      }

      if (section.closest("#about")) {
        message = userName
          ? `${userName}, this is the About section.`
          : `This is the About section.`;
      }

      if (section.closest("#projects")) {
        message = userName
          ? `${userName}, here are Vijay’s projects.`
          : `Here are Vijay’s projects.`;
      }

      if (section.closest("#hero")) {
        message = userName
          ? `${userName}, you are on the Home section.`
          : `You are on the Home section.`;
      }

      if (section.closest("#skills")) {
        message = userName
          ? `${userName}, this is the Skills section.`
          : `This is the Skills section.`;
      }

      if (section.closest("#achievements")) {
        message = userName
          ? `${userName}, this is the Achievements section.`
          : `This is the Achievements section.`;
      }

      if (section.closest("#testimonials")) {
        message = userName
          ? `${userName}, this is the Testimonials section.`
          : `This is the Testimonials section.`;
      }

      if (section.closest("#aiskills")) {
        message = userName
          ? `${userName}, explore my AI and interactive 3D skills.`
          : `Explore AI and interactive 3D skills.`;
      }

      // Check for navbar links
      if (section.closest('a[href="#about"]')) {
        message = userName
          ? `${userName}, click to go to About section.`
          : `Click to go to About section.`;
      }

      if (section.closest('a[href="#projects"]')) {
        message = userName
          ? `${userName}, click to view Projects.`
          : `Click to view Projects.`;
      }

      if (section.closest('a[href="#skills"]')) {
        message = userName
          ? `${userName}, click to see Skills.`
          : `Click to see Skills.`;
      }

      if (section.closest('a[href="#achievements"]')) {
        message = userName
          ? `${userName}, click to view Achievements.`
          : `Click to view Achievements.`;
      }

      if (section.closest('a[href="#contact"]')) {
        message = userName
          ? `${userName}, click to go to Contact.`
          : `Click to go to Contact.`;
      }

      // Check for interactive buttons
      if (section.closest('button') && section.textContent?.includes('Download Resume')) {
        message = userName
          ? `${userName}, download Vijay's resume.`
          : `Download Vijay's resume.`;
      }

      if (section.closest('input[type="email"]') || section.closest('textarea') || section.closest('input[type="text"]')) {
        message = userName
          ? `${userName}, fill out the contact form.`
          : `Fill out the contact form.`;
      }

      if (message) {
        hintBox.innerText = message;
        hintBox.style.left = `${e.clientX + 10}px`;
        hintBox.style.top = `${e.clientY + 10}px`;
        hintBox.style.opacity = "1";
      } else {
        hintBox.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [userName]);

  // Card markup (simple)
  const AssistantCard = () => {
    const [name, setName] = useState("");
    return (
      <div className="assistant-card">
        <div className="assistant-inner">
          <div className="avatar-wrapper">
            <Avatar3D speaking={speaking} />
          </div>

          <div className="assistant-content">
            <h3>Kara — Vijay's Assistant</h3>
            <p className="intro">
              Hi, I'm Kara. May I know your name?
            </p>

            <input
              className="name-input"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNameSubmit(name);
                }
              }}
            />

            <div className="assistant-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleNameSubmit(name)}
                aria-label="Submit name"
              >
                Submit
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => handleNameSubmit(null)}
                aria-label="Skip"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showCard && (
        <>
          {/* Backdrop to prevent interaction with other elements */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99998,
            }}
          />
          <AssistantCard />
        </>
      )}

      {/* Hint box for cursor guidance */}
      <div id="kara-hint" className="kara-hint-box" style={{ opacity: 0 }} />

      {/* You can later hook `onGuidanceChange` to enable cursor guidance */}
    </>
  );
}