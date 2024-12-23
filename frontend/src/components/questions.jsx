import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

function Questions({ chapterId, onQuestionSelect, teamId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: questionsData, error: questionsError } = await supabase
          .from("questions")
          .select("id, title, points, description")
          .eq("chapter_id", chapterId);

        if (questionsError) throw questionsError;

        // Fetch progress for the current team
        const { data: progressData, error: progressError } = await supabase
          .from("team_progress")
          .select("question_id, is_solved")
          .eq("team_id", teamId);

        if (progressError) throw progressError;

        // Map progress data to questions
        const questionsWithProgress = questionsData.map((question) => {
          const progress = progressData.find(
            (progress) => progress.question_id === question.id
          );

          return {
            ...question,
            is_solved: progress?.is_solved || false,
          };
        });

        setQuestions(questionsWithProgress);
      } catch (err) {
        console.error("Error fetching questions and progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [chapterId, teamId]);

  if (loading) {
    return <p> </p>;
  }

  return (
    <div className="questions-container grid  lg:grid-cols-4 grid-cols-3 lg:gap-2 gap-1 max-h-96 overflow-y-auto mt-2 rounded-lg">
      {questions.map((question) => (
        <div key={question.id} className="cursor-pointer">
          <div
            className={`md:p-3 p-2 ${
              question.is_solved ? "bg-green-500" : "bg-orange-800"
            } text-white rounded-md hover:${
              question.is_solved ? "" : "bg-yellow-500 hover:scale-105"
            } transition-all`}
            onClick={() =>
              !question.is_solved && onQuestionSelect(question)
            }
          >
            <h4 className="font-bold lg:text-lg md:text-sm text-xs">{question.title}</h4>
            <p className="lg:text-sm text-xs">
              Points: {question.points}
              {question.is_solved && (
                <span className="ml-2 text-xs text-green-300">✓ Solved</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
