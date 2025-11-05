"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModeCard } from "@/components/quiz/ModeCard";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { Timer } from "@/components/quiz/Timer";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { QuestionNavigator } from "@/components/quiz/QuestionNavigator";
import { ResultScreen } from "@/components/quiz/ResultScreen";
import { ReviewMode } from "@/components/quiz/ReviewMode";
import { QuizHistory } from "@/components/quiz/QuizHistory";
import { QuizMode, QuizQuestion } from "@/types/quiz";
import {
  getQuestionsByMode,
  calculateResult,
  saveQuizHistory,
  getModeName,
} from "@/lib/quizHelpers";
import quizData from "@/quiz/quiz.json";

type QuizStage = "mode-selection" | "quiz" | "result" | "review";

export default function QuizPage() {
  const [stage, setStage] = useState<QuizStage>("mode-selection");
  const [mode, setMode] = useState<QuizMode>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const allQuestions = quizData as unknown as QuizQuestion[];

  // Start quiz with selected mode
  const startQuiz = useCallback(
    (selectedMode: QuizMode, topic?: string) => {
      const quizQuestions = getQuestionsByMode(
        allQuestions,
        selectedMode,
        topic
      );

      if (quizQuestions.length === 0) {
        alert("Không tìm thấy câu hỏi phù hợp!");
        return;
      }

      setMode(selectedMode);
      setSelectedTopic(topic || "");
      setQuestions(quizQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setMarkedQuestions(new Set());
      setTimeElapsed(0);
      setIsTimerRunning(true);
      setStage("quiz");
    },
    [allQuestions]
  );

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  // Toggle mark question
  const handleToggleMark = () => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  // Navigate to question
  const handleNavigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Go to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit quiz
  const handleSubmit = () => {
    const unansweredCount = questions.length - Object.keys(userAnswers).length;

    if (unansweredCount > 0) {
      const confirm = window.confirm(
        `Bạn còn ${unansweredCount} câu chưa trả lời. Bạn có chắc muốn nộp bài?`
      );
      if (!confirm) return;
    }

    setIsTimerRunning(false);
    const result = calculateResult(questions, userAnswers, timeElapsed);

    // Save to history
    saveQuizHistory({
      date: new Date().toISOString(),
      mode,
      result,
    });

    setStage("result");
  };

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  const answeredQuestions = new Set(
    questions
      .map((q, idx) => (userAnswers[q.id] !== undefined ? idx : -1))
      .filter((idx) => idx !== -1)
  );

  // Calculate result when needed
  const result =
    stage === "result"
      ? calculateResult(questions, userAnswers, timeElapsed)
      : null;

  return (
    <div
      className="min-h-screen bg-[#0a0a0a]"
      style={{
        backgroundImage:
          "url('/assets/ban-co-biet/4a22a5e0295e170d8bbbfa3301b17b33dd1e379a.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Header currentPath="/quiz" />

      <main className="relative min-h-[calc(100vh-180px)]">
        <div className="absolute inset-0 bg-[#0a0a0a]/95" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Mode Selection Stage */}
          {stage === "mode-selection" && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center">
                <h1 className="font-quicksand text-4xl font-bold text-white lg:text-5xl">
                  Quiz ôn tập
                </h1>
                <p className="mt-4 text-lg text-white/70">
                  Chọn chế độ luyện tập phù hợp với bạn
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ModeCard
                  mode="all"
                  title="Luyện tập tất cả"
                  description="Ôn tập toàn bộ 61 câu hỏi với thời gian không giới hạn"
                  icon="📝"
                  questionCount={allQuestions.length}
                  onSelect={() => startQuiz("all")}
                />

                <ModeCard
                  mode="quick"
                  title="Ôn nhanh"
                  description="20 câu hỏi ngẫu nhiên để ôn tập nhanh"
                  icon="⚡"
                  questionCount={20}
                  onSelect={() => startQuiz("quick")}
                />

                <ModeCard
                  mode="challenge"
                  title="Thử thách"
                  description="15 câu hỏi trong 10 phút, thử thách bản thân!"
                  icon="🎯"
                  questionCount={15}
                  timeLimit="10 phút"
                  onSelect={() => startQuiz("challenge")}
                />
              </div>

              {/* Topic Selection */}
              <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-8">
                <div className="mb-6 text-center">
                  <h2 className="font-quicksand text-2xl font-bold text-white">
                    Hoặc chọn theo chủ đề
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Luyện tập theo từng chủ đề cụ thể
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    onClick={() => startQuiz("topic", "nha-nuoc")}
                    className="group rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-[#f3c554]/50 hover:bg-white/10"
                  >
                    <div className="mb-3 text-3xl">🏛️</div>
                    <h3 className="font-quicksand text-lg font-bold text-white">
                      Nhà nước XHCN
                    </h3>
                    <p className="mt-2 text-sm text-white/60">
                      Câu hỏi về nhà nước, quyền lực, chức năng
                    </p>
                  </button>

                  <button
                    onClick={() => startQuiz("topic", "dan-chu")}
                    className="group rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-[#f3c554]/50 hover:bg-white/10"
                  >
                    <div className="mb-3 text-3xl">🗳️</div>
                    <h3 className="font-quicksand text-lg font-bold text-white">
                      Dân chủ XHCN
                    </h3>
                    <p className="mt-2 text-sm text-white/60">
                      Câu hỏi về dân chủ, quyền làm chủ của nhân dân
                    </p>
                  </button>

                  <button
                    onClick={() => startQuiz("topic", "xay-dung")}
                    className="group rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-[#f3c554]/50 hover:bg-white/10"
                  >
                    <div className="mb-3 text-3xl">🏗️</div>
                    <h3 className="font-quicksand text-lg font-bold text-white">
                      Xây dựng & phát huy
                    </h3>
                    <p className="mt-2 text-sm text-white/60">
                      Câu hỏi về xây dựng nhà nước pháp quyền
                    </p>
                  </button>
                </div>
              </div>

              {/* Quiz History Button */}
              <QuizHistory />
            </div>
          )}

          {/* Quiz Stage */}
          {stage === "quiz" && currentQuestion && (
            <div className="space-y-6">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-4">
                <div className="flex items-center gap-4">
                  <span className="rounded-lg bg-[#f3c554]/20 px-3 py-1 text-sm font-bold text-[#f3c554]">
                    {getModeName(mode)}
                  </span>
                  <Timer
                    isRunning={isTimerRunning}
                    onTick={setTimeElapsed}
                    countDown={mode === "challenge"}
                    initialSeconds={mode === "challenge" ? 600 : 0}
                    maxSeconds={mode === "challenge" ? 600 : undefined}
                  />
                </div>

                <button
                  onClick={() => {
                    const confirm = window.confirm(
                      "Bạn có chắc muốn thoát? Tiến trình sẽ không được lưu."
                    );
                    if (confirm) {
                      setStage("mode-selection");
                      setIsTimerRunning(false);
                    }
                  }}
                  className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
                >
                  Thoát
                </button>
              </div>

              {/* Progress Bar */}
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />

              {/* Main Content */}
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Question Card */}
                <div className="space-y-6">
                  <QuestionCard
                    question={currentQuestion}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={userAnswers[currentQuestion.id] || null}
                    onSelectAnswer={handleSelectAnswer}
                    isMarked={markedQuestions.has(currentQuestionIndex)}
                    onToggleMark={handleToggleMark}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Câu trước
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#f3c554] to-[#ffd966] px-8 py-3 font-semibold text-black transition-all hover:shadow-2xl hover:shadow-[#f3c554]/50"
                      >
                        Nộp bài
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#f3c554] to-[#ffd966] px-6 py-3 font-semibold text-black transition-all hover:shadow-2xl hover:shadow-[#f3c554]/50"
                      >
                        Câu tiếp theo
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Navigator - Desktop Only */}
                <div className="hidden lg:block">
                  <QuestionNavigator
                    totalQuestions={questions.length}
                    currentQuestion={currentQuestionIndex}
                    answeredQuestions={answeredQuestions}
                    markedQuestions={markedQuestions}
                    onNavigate={handleNavigateToQuestion}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Result Stage */}
          {stage === "result" && result && (
            <ResultScreen
              result={result}
              onRestart={() => startQuiz(mode, selectedTopic || undefined)}
              onReview={() => setStage("review")}
              onBackToHome={() => setStage("mode-selection")}
            />
          )}

          {/* Review Stage */}
          {stage === "review" && (
            <ReviewMode
              questions={questions}
              userAnswers={userAnswers}
              onClose={() => setStage("result")}
            />
          )}
        </div>
      </main>

      <Footer backgroundImage="/assets/home/111_183.svg" />
    </div>
  );
}
