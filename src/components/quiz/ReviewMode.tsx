"use client";

import { QuizQuestion } from "@/types/quiz";
import { QuestionCard } from "./QuestionCard";

interface ReviewModeProps {
  questions: QuizQuestion[];
  userAnswers: Record<number, string>;
  onClose: () => void;
}

export function ReviewMode({
  questions,
  userAnswers,
  onClose,
}: ReviewModeProps) {
  const incorrectQuestions = questions.filter(
    (q) => userAnswers[q.id] !== q.answer
  );

  const showOnlyIncorrect = incorrectQuestions.length > 0;
  const questionsToShow = showOnlyIncorrect ? incorrectQuestions : questions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-linear-to-r  from-white/5 to-white/0 p-6">
        <div>
          <h2 className="font-quicksand text-2xl font-bold text-white">
            Xem lại đáp án
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {showOnlyIncorrect
              ? `${incorrectQuestions.length} câu trả lời sai`
              : "Tất cả các câu hỏi"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-semibold text-white transition-all hover:bg-white/10"
        >
          Đóng
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questionsToShow.map((question, index) => {
          const originalIndex = questions.findIndex(
            (q) => q.id === question.id
          );
          return (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={originalIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={userAnswers[question.id] || null}
              onSelectAnswer={() => {}}
              isMarked={false}
              onToggleMark={() => {}}
              showCorrectAnswer={true}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="rounded-xl bg-linear-to-r from-[#f3c554] to-[#ffd966] px-8 py-4 font-semibold text-black transition-all hover:shadow-2xl hover:shadow-[#f3c554]/50"
        >
          Quay lại kết quả
        </button>
      </div>
    </div>
  );
}
