"use client";

import { QuizQuestion } from "@/types/quiz";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isMarked: boolean;
  onToggleMark: () => void;
  showCorrectAnswer?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  isMarked,
  onToggleMark,
  showCorrectAnswer = false,
}: QuestionCardProps) {
  const options = Object.entries(question.options);

  const getOptionStyle = (optionValue: string) => {
    if (!showCorrectAnswer) {
      return selectedAnswer === optionValue
        ? "border-[#f3c554] bg-[#f3c554]/10 text-white"
        : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10";
    }

    // Show correct/incorrect when reviewing
    const isCorrect = optionValue === question.answer;
    const isSelected = optionValue === selectedAnswer;

    if (isCorrect) {
      return "border-green-500 bg-green-500/10 text-green-400";
    }
    if (isSelected && !isCorrect) {
      return "border-red-500 bg-red-500/10 text-red-400";
    }
    return "border-white/10 bg-white/5 text-white/50";
  };

  const getOptionIcon = (optionValue: string) => {
    if (!showCorrectAnswer) {
      return selectedAnswer === optionValue ? (
        <div className="h-5 w-5 rounded-full bg-[#f3c554] flex items-center justify-center">
          <svg
            className="h-3 w-3 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <div className="h-5 w-5 rounded-full border-2 border-white/30" />
      );
    }

    const isCorrect = optionValue === question.answer;
    const isSelected = optionValue === selectedAnswer;

    if (isCorrect) {
      return (
        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg
            className="h-3 w-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
    if (isSelected && !isCorrect) {
      return (
        <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
          <svg
            className="h-3 w-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
    return <div className="h-5 w-5 rounded-full border-2 border-white/20" />;
  };

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-linear-to-br  from-white/5 to-white/0 p-6 lg:p-8">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[#f3c554]/20 px-3 py-1 text-xs font-bold text-[#f3c554]">
              Câu {questionNumber}/{totalQuestions}
            </span>
            {isMarked && (
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-400">
                🔖 Đã đánh dấu
              </span>
            )}
          </div>
          <h3 className="font-quicksand text-lg font-semibold leading-relaxed text-white lg:text-xl">
            {question.question}
          </h3>
        </div>
        <button
          onClick={onToggleMark}
          className={`shrink-0 rounded-lg p-2 transition-colors ${
            isMarked
              ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
          }`}
          title={isMarked ? "Bỏ đánh dấu" : "Đánh dấu câu hỏi"}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map(([key, value]) => (
          <button
            key={key}
            onClick={() => !showCorrectAnswer && onSelectAnswer(value)}
            disabled={showCorrectAnswer}
            className={`group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${getOptionStyle(
              value
            )} ${!showCorrectAnswer ? "cursor-pointer" : "cursor-default"}`}
          >
            {getOptionIcon(value)}
            <div className="flex-1">
              <span className="font-inter text-xs font-bold uppercase text-current opacity-60">
                {key}.
              </span>
              <p className="mt-1 font-quicksand text-sm font-medium leading-relaxed lg:text-base">
                {value}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
