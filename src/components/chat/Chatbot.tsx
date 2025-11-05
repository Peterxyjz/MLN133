"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledgeBase, systemPrompt } from "@/lib/knowledge-base";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Nhà nước XHCN là gì?",
  "Đặc trưng của dân chủ XHCN?",
  "Cách mạng Tháng Tám có ý nghĩa gì?",
  "Nhà nước pháp quyền là gì?",
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("API key not configured");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      // Allow overriding model and api version via env vars for easier changes and testing
      const modelName =
        process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash-lite";
      const apiVersion = process.env.NEXT_PUBLIC_GEMINI_API_VERSION || "v1";
      const model = genAI.getGenerativeModel(
        { model: modelName },
        { apiVersion }
      );

      const prompt = `${systemPrompt}

TÀI LIỆU THAM KHẢO:
${knowledgeBase}

CÂU HỎI CỦA SINH VIÊN: ${messageText}

HÃY TRẢ LỜI (ngắn gọn, dễ hiểu, có emoji phù hợp):`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Xin lỗi, có lỗi xảy ra. ";

      // Helpful guidance for common Google Generative AI errors
      if (error instanceof Error) {
        const msg = error.message || "";

        if (msg.includes("API key")) {
          errorMessage +=
            "Chưa cấu hình API key. Vui lòng xem hướng dẫn setup.";
        } else if (msg.toLowerCase().includes("quota")) {
          errorMessage += "Đã vượt quota API. Vui lòng thử lại sau.";
        } else if (
          msg.includes("is not found for API version") ||
          msg.includes("not supported for generateContent") ||
          msg.includes("is not found")
        ) {
          // Model not available or method not supported for the model.
          errorMessage += `Model \"${
            process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash-lite"
          }\" không khả dụng hoặc không hỗ trợ phương thức này.`;

          // Try to list available models for debugging and show a short list to the user
          // Many SDK versions don't expose a `listModels()` helper. Suggest actions
          // to the developer instead of trying to call an unavailable method.
          console.info(
            "Model appears unsupported or missing. Consider verifying available models and permissions."
          );
          errorMessage +=
            " Vui lòng kiểm tra model bạn đang dùng (env `NEXT_PUBLIC_GEMINI_MODEL`) hoặc xem tài liệu models tại https://ai.google.dev/gemini-api/docs/models.";
        } else {
          errorMessage += "Vui lòng thử lại sau vài giây.";
        }
      }

      const errorMsg: Message = {
        role: "assistant",
        content: errorMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const clearChat = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử chat?")) {
      setMessages([]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 left-8 z-50 flex items-center gap-3 rounded-full bg-linear-to-r from-[#f3c554] to-[#ffd966] px-6 py-4 font-bold text-black shadow-2xl transition-all hover:scale-110 hover:shadow-[#f3c554]/50 animate-bounce-in"
          aria-label="Mở trợ lý AI"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>Trợ lý AI</span>
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
            !
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1510] shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-[#f3c554]/20 to-[#ffd966]/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3c554] text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-quicksand font-bold text-white">
                  Trợ lý MLN131
                </h3>
                <p className="text-xs text-white/60">
                  {isLoading ? "Đang suy nghĩ..." : "Online • Sẵn sàng trả lời"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20"
                  title="Xóa lịch sử chat"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20"
                title="Đóng chat"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4 text-6xl">👋</div>
                <h4 className="mb-2 font-quicksand text-lg font-bold text-white">
                  Xin chào! Tôi là trợ lý AI
                </h4>
                <p className="mb-6 text-sm text-white/60">
                  Tôi có thể giúp bạn về các chủ đề:
                </p>

                <div className="w-full space-y-2">
                  {[
                    "🏛️ Nhà nước XHCN",
                    "🗳️ Dân chủ XHCN",
                    "📚 Lịch sử phát triển",
                    "⚖️ Nhà nước pháp quyền",
                  ].map((topic, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-left text-sm text-white/80"
                    >
                      {topic}
                    </div>
                  ))}
                </div>

                <div className="mt-6 w-full">
                  <p className="mb-2 text-xs font-semibold text-[#f3c554]">
                    💡 CÂU HỎI GỢI Ý:
                  </p>
                  <div className="space-y-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="w-full rounded-lg border border-[#f3c554]/30 bg-[#f3c554]/10 p-2 text-left text-xs text-white transition-all hover:bg-[#f3c554]/20"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in-up`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-linear-to-r from-[#f3c554] to-[#ffd966] text-black font-semibold"
                      : "border border-white/10 bg-white/5 text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
                    {msg.content}
                  </div>
                  <div
                    className={`mt-2 text-[10px] ${
                      msg.role === "user" ? "text-black/60" : "text-white/40"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-white">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#f3c554]" />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-[#f3c554]"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-[#f3c554]"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                    <span className="text-xs text-white/60">
                      Đang trả lời...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-[#1a1510]/50 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi về Nhà nước XHCN..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 transition-all focus:border-[#f3c554] focus:outline-none focus:ring-2 focus:ring-[#f3c554]/20 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center rounded-xl bg-linear-to-r from-[#f3c554] to-[#ffd966] px-4 py-3 font-bold text-black transition-all hover:shadow-lg hover:shadow-[#f3c554]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Gửi tin nhắn"
              >
                <svg
                  className="h-5 w-5 rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-white/40">
              AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
