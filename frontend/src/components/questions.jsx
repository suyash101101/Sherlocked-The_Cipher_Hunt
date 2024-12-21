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
          .select("id, title, points")
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
    return <p>Loading questions...</p>;
  }

  return (
    <div className="questions-container grid grid-cols-3 gap-2 max-h-96 overflow-y-auto p-4 rounded-lg">
      {questions.map((question) => (
        <div key={question.id} className="cursor-pointer">
          <div
            className={`p-3 ${
              question.is_solved ? "bg-green-500" : "bg-orange-800"
            } text-white rounded-md hover:${
              question.is_solved ? "" : "bg-yellow-500 hover:scale-105"
            } transition-all`}
            onClick={() =>
              !question.is_solved && onQuestionSelect(question)
            }
          >
            <h4>{question.title}</h4>
            <p>
              Points: {question.points}
              {question.is_solved && (
                <span className="ml-2 text-green-400">✓ Solved</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
