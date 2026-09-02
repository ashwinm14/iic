"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  X,
  Minus,
  Maximize2,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  ShieldCheck,
  Calendar,
  Rocket,
  Lightbulb,
  Trophy,
  ClipboardList,
  Users,
  Phone,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { IICEvent } from "@/lib/knowledgeBase";
import EventCard from "./EventCard";
import styles from "./Chatbot.module.css";

function MessengerIcon({ size = 20, className, color = "currentColor" }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.736 7.202V22l3.39-1.86c.91.252 1.874.388 2.874.388 5.523 0 10-4.145 10-9.27S17.523 2 12 2zm1.066 12.443l-2.584-2.756-5.044 2.756 5.547-5.89 2.65 2.756 4.978-2.756-5.547 5.89z" />
    </svg>
  );
}

interface ChatAction {
  label: string;
  url: string;
  external?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  events?: IICEvent[];
  actions?: ChatAction[];
  suggestions?: string[];
  sources?: string[];
}

const QUICK_QUESTIONS = [
  { label: "📅 Upcoming Events", query: "What are the upcoming IIC events?" },
  { label: "🚀 IIC Activities", query: "Tell me about IIC activities and initiatives" },
  { label: "💡 Innovation Programs", query: "What innovation and startup programs does IIC offer?" },
  { label: "🏆 Competitions", query: "What hackathons and idea competitions are available?" },
  { label: "📝 How to Register?", query: "How do I register for an IIC event?" },
  { label: "👥 IIC Team", query: "Who are the IIC coordinators and team leadership?" },
  { label: "📞 Contact IIC", query: "How can I contact the IIC team?" },
  { label: "❓ FAQs", query: "What is IIC and who can participate?" }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle keyboard shortcut ESC to minimize/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setHasInteracted(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: getCurrentTime()
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: "iic-web-session",
          history: newHistory.slice(-8)
        })
      });

      if (!response.ok) {
        throw new Error("Chat service returned an error.");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "I am here to help with all IIC initiatives!",
        timestamp: getCurrentTime(),
        events: data.events,
        actions: data.actions,
        suggestions: data.suggestions,
        sources: data.sources
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chatbot request error:", err);
      const fallbackMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        sender: "assistant",
        text: "I'm having a brief connection issue. Please check your internet connection or email the IIC team directly at **`iic@institution.edu.in`**.",
        timestamp: getCurrentTime(),
        actions: [{ label: "Contact IIC Team →", url: "#footer" }]
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setHasInteracted(false);
    setInputValue("");
  };

  // Basic safe markdown parser for bold, headers, bullet points, links, and code
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith("### ")) {
        return <h3 key={idx}>{parseInlineStyles(line.replace("### ", ""))}</h3>;
      }
      // Header 4
      if (line.startsWith("#### ")) {
        return <h4 key={idx}>{parseInlineStyles(line.replace("#### ", ""))}</h4>;
      }
      // Bullet list item
      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
        const itemText = line.replace(/^[•\-\*]\s+/, "");
        return (
          <li key={idx} style={{ marginLeft: "1.2rem", listStyleType: "disc" }}>
            {parseInlineStyles(itemText)}
          </li>
        );
      }
      // Numbered list item
      const numMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <li key={idx} style={{ marginLeft: "1.2rem", listStyleType: "decimal" }}>
            {parseInlineStyles(numMatch[2])}
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} style={{ height: "6px" }} />;
      }
      // Regular paragraph
      return <p key={idx}>{parseInlineStyles(line)}</p>;
    });
  };

  // Helper for **bold**, `code`, and [link](url)
  const parseInlineStyles = (content: string) => {
    const parts: (string | React.ReactNode)[] = [];
    let remaining = content;
    let keyCounter = 0;

    while (remaining.length > 0) {
      // Check for bold **text**
      const boldMatch = remaining.match(/^([^*]*)\*\*([^*]+)\*\*(.*)$/);
      // Check for code `code`
      const codeMatch = remaining.match(/^([^`]*)\`([^`]+)\`(.*)$/);
      // Check for link [title](url)
      const linkMatch = remaining.match(/^([^[]*)\[([^\]]+)\]\(([^)]+)\)(.*)$/);

      if (boldMatch) {
        if (boldMatch[1]) parts.push(boldMatch[1]);
        parts.push(<strong key={`b-${keyCounter++}`}>{boldMatch[2]}</strong>);
        remaining = boldMatch[3];
      } else if (codeMatch) {
        if (codeMatch[1]) parts.push(codeMatch[1]);
        parts.push(<code key={`c-${keyCounter++}`}>{codeMatch[2]}</code>);
        remaining = codeMatch[3];
      } else if (linkMatch) {
        if (linkMatch[1]) parts.push(linkMatch[1]);
        parts.push(
          <a
            key={`a-${keyCounter++}`}
            href={linkMatch[3]}
            target={linkMatch[3].startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline", fontWeight: 600 }}
          >
            {linkMatch[2]}
          </a>
        );
        remaining = linkMatch[4];
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts;
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className={styles.launcher}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open IIC Assistant Chatbot"
          id="iic-chatbot-launcher"
        >
          <div className={styles.launcherIconWrapper}>
            <MessengerIcon size={20} color="#ffffff" />
            <span className={styles.livePulseDot} />
          </div>
          <div className={styles.launcherLabel}>
            <span className={styles.launcherTitle}>IIC Assistant</span>
            <span className={styles.launcherSubtitle}>Ask events & startups</span>
          </div>
        </button>
      )}

      {/* Floating Chat Window Panel */}
      {isOpen && (
        <div
          className={`${styles.chatbotContainer} ${isMinimized ? styles.minimized : ""}`}
          role="dialog"
          aria-label="IIC Assistant Chatbot"
        >
          {/* Header */}
          <div
            className={styles.header}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className={styles.headerLeft}>
              <div className={styles.avatarWrapper}>
                <Image
                  src="/iic-logo.png"
                  alt="IIC Logo"
                  width={28}
                  height={28}
                  className={styles.avatarImage}
                />
                <span className={styles.livePulseDot} style={{ top: "-1px", right: "-1px" }} />
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.headerTitleRow}>
                  <h3 className={styles.headerTitle}>IIC Assistant</h3>
                  <span className={styles.onlineBadge}>
                    <span className={styles.onlineDot} /> Online
                  </span>
                </div>
                <span className={styles.headerSubtitle}>
                  Your guide to Innovation, Entrepreneurship & IIC activities
                </span>
              </div>
            </div>

            <div className={styles.headerActions} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.headerBtn}
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Maximize window" : "Minimize window"}
                aria-label={isMinimized ? "Maximize window" : "Minimize window"}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minus size={15} />}
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Body content when not minimized */}
          {!isMinimized && (
            <>
              {/* Message Stream */}
              <div className={styles.messagesArea}>
                {/* Welcome Card on start or reset */}
                {messages.length === 0 && (
                  <div className={styles.welcomeCard}>
                    <div className={styles.welcomeHeader}>
                      <div className={styles.welcomeAvatar}>
                        <MessengerIcon size={18} color="#ffffff" />
                      </div>
                      <div>
                        <div className={styles.welcomeGreeting}>
                          Hi! 👋 I&apos;m the IIC Assistant.
                        </div>
                        <div className={styles.welcomePrompt}>
                          How can I help you with Institution&apos;s Innovation Council today?
                        </div>
                      </div>
                    </div>

                    <div className={styles.quickActionsGrid}>
                      {QUICK_QUESTIONS.map((item, index) => (
                        <button
                          key={index}
                          className={styles.quickChip}
                          onClick={() => handleSendMessage(item.query)}
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message items */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.messageRow} ${msg.sender === "user" ? styles.user : styles.assistant}`}
                  >
                    {msg.sender === "assistant" && (
                      <div className={styles.msgAvatar}>
                        <Bot size={16} />
                      </div>
                    )}

                    <div className={styles.msgContentWrapper}>
                      <div className={styles.messageBubble}>
                        <div className={styles.markdownContent}>
                          {renderMarkdown(msg.text)}
                        </div>

                        {/* Attached Event Cards */}
                        {msg.events && msg.events.length > 0 && (
                          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            {msg.events.map((ev) => (
                              <EventCard
                                key={ev.id}
                                event={ev}
                                onAskDetails={(query) => handleSendMessage(query)}
                                onRegisterClick={() => {
                                  // Optional close or smooth scroll to events
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className={styles.actionButtons}>
                            {msg.actions.map((act, aIdx) => (
                              <a
                                key={aIdx}
                                href={act.url}
                                target={act.external ? "_blank" : "_self"}
                                rel={act.external ? "noopener noreferrer" : undefined}
                                className={styles.actionBtn}
                              >
                                {act.label}
                                {act.external && <ExternalLink size={12} />}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Follow-up suggestions */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className={styles.suggestionChips}>
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              className={styles.suggestionChip}
                              onClick={() => handleSendMessage(sug)}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Sources / Verification label */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className={styles.sourceBadge}>
                          <ShieldCheck size={12} color="#10b981" />
                          <span>Verified from {msg.sources.join(", ")}</span>
                        </div>
                      )}

                      <span className={styles.msgTime}>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {/* Loading / Typing indicator */}
                {isLoading && (
                  <div className={`${styles.messageRow} ${styles.assistant}`}>
                    <div className={styles.msgAvatar}>
                      <Bot size={16} />
                    </div>
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form Bar */}
              <div className={styles.inputContainer}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={styles.inputForm}
                >
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about IIC events, hackathons, funding..."
                    className={styles.inputField}
                    rows={1}
                    aria-label="Message input for IIC assistant"
                    id="iic-chat-input"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className={styles.sendBtn}
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>

                <div className={styles.footerNote}>
                  <ShieldCheck size={12} color="var(--primary-vibrant)" />
                  <span>Ministry of Education Verified • Zero Hallucination AI</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
