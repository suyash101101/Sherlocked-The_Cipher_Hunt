import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

function Questions({ chapterId, onQuestionSelect, solvedQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("chapter_id", chapterId);

        if (error) throw error;
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [chapterId]);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="questions-container grid grid-cols-3 gap-2 max-h-96 overflow-y-auto p-4 rounded-lg">
      {questions.map((question) => (
        <div key={question.id} className="cursor-pointer">
          <div
            className={`p-3 ${
              solvedQuestions.has(question.id) ? "bg-green-500" : "bg-orange-800"
            } text-white rounded-md hover:bg-yellow-500 hover:scale-105 transition-all`}
            onClick={() => !solvedQuestions.has(question.id) && onQuestionSelect(question)}
          >
            <h4>{question.title}</h4>
            <p>
              Points: {question.points}
              {solvedQuestions.has(question.id) && (
                <span className="ml-2 text-green-300">✓ Solved</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
