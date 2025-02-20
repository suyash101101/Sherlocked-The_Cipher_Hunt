import { useState, useEffect } from "react";
import Questions from "./questions";
import supabase from "../config/supabaseClient";

function LevelModal({ location, onClose }) {
  const { id } = location;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [chapterName, setChapterName] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  const MAX_ATTEMPTS = 100;
  const userId = 1;
  // Fetch chapter name
  useEffect(() => {
    const fetchChapterName = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("chapter_name")
          .eq("chapter_id", id)
          .limit(1)
          .single();

        if (error) throw error;
        setChapterName(data.chapter_name);
      } catch (err) {
        console.error("Error fetching chapter name:", err);
      }
    };

    fetchChapterName();
  }, [id]);

  // Fetch total score from Supabase
  const fetchTotalScore = async () => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("total_score")
        .eq("id", userId) // Replace with the user’s ID condition
        .single();

      if (error) throw error;
      if (data) setTotalScore(data.total_score);
    } catch (err) {
      console.error("Error fetching total score:", err);
    }
  };

  // Update total score in Supabase
  const updateTotalScore = async (newScore) => {
    try {
      const { error } = await supabase
        .from("leaderboard")
        .update({ total_score: newScore })
        .eq("id", userId); // Replace with the user’s ID condition

      if (error) throw error;
    } catch (err) {
      console.error("Error updating total score:", err);
    }
  };

  useEffect(() => {
    fetchTotalScore();
  }, []);

  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    document.body.style.overflowY = "hidden";
    return () => {
      // Re-enable scrolling on the body when the modal is closed
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleBackClick = () => {
    setSelectedQuestion(null);
    setUserAnswer("");
  };

  const handleAnswerSubmit = async () => {
    if (!selectedQuestion) return;
  
    const currentAttempts = wrongAttempts[selectedQuestion.id] || 0;
  
    if (currentAttempts >= MAX_ATTEMPTS || solvedQuestions.has(selectedQuestion.id)) return;
  
    try {
      // Fetch the correct answer for the selected question from Supabase
      const { data, error } = await supabase
        .from("questions")
        .select("answer")
        .eq("id", selectedQuestion.id)
        .single();
  
      if (error) throw error;
  
      const correctAnswer = data?.answer;
  
      // Check if the user's answer matches the correct answer
      if (userAnswer === correctAnswer) {
        setSolvedQuestions((prev) => {
          const updatedSolved = new Set(prev);
          updatedSolved.add(selectedQuestion.id);
          return updatedSolved;
        });
  
        const newScore = totalScore + selectedQuestion.points;
        setTotalScore(newScore); // Update local total score
        await updateTotalScore(newScore); // Update in Supabase
  
        // Insert into team_progress table when the question is solved
        const solvedAt = new Date().toISOString();
        const { error: insertError } = await supabase
          .from("team_progress")
          .insert([
            {
              team_id: userId, // Replace with the actual team_id
              question_id: selectedQuestion.id,
              is_solved: true,
              solved_at: solvedAt,
            },
          ]);
  
        if (insertError) throw insertError;
      } else {
        setWrongAttempts((prev) => ({
          ...prev,
          [selectedQuestion.id]: currentAttempts + 1,
        }));
      }
    } catch (err) {
      console.error("Error checking answer:", err);
    }
  
    setUserAnswer("");
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div
        className="lg:w-[70em] lg:h-[70em] lg:mt-80 md:w-[45em] md:h-[45em] sm:w-[35em] sm:h-[35em] w-[30em] h-[30em] bg-contain bg-no-repeat bg-center relative transition-transform duration-200 ease-in-out"
        style={{
          backgroundImage: "url('/scroll.png')",
        }}
      >
        <button
          className="absolute lg:right-32 md:right-20 lg:mt-40 md:mt-28 mt-16 right-16 text-orange-950 text-3xl font-extrabold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center lg:mt-64 md:mt-40 sm:mt-28 mt-24">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-extrabold text-orange-950">
            {selectedQuestion ? selectedQuestion.title : chapterName || " "}
          </h2>

          {!selectedQuestion ? (
            <Questions
              chapterId={id}
              teamId={userId}
              onQuestionSelect={handleQuestionSelect}
              solvedQuestions={solvedQuestions}
            />
          ) : (
            <div className="lg:p-6 py-3 px-5 bg-orange-950 text-white rounded-lg w-[70%] text-center">
              <p className="mb-6 lg:max-h-[10em] sm:max-h-[4em] max-h-[2em] overflow-y-scroll md:text-base text-xs">{selectedQuestion.description}</p>
              {solvedQuestions.has(selectedQuestion.id) ? (
                <p className="text-green-500 font-bold">Correct Answer!</p>
              ) : wrongAttempts[selectedQuestion.id] >= MAX_ATTEMPTS ? (
                <p className="text-red-500 font-bold">
                  Maximum attempts exceeded.
                </p>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    className="lg:p-2 p-1 rounded border w-3/4 sm:text-base text-xs text-gray-900"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={solvedQuestions.has(selectedQuestion.id)}
                  />
                  <button
                    onClick={handleAnswerSubmit}
                    className="sm:ml-2 ml-1 px-4 sm:py-2 py-1 lg:text-base text-xs bg-yellow-500 text-black rounded hover:bg-yellow-600"
                  >
                    Submit
                  </button>
                  <p className="text-red-500 mt-2 lg:text-base text-sm">
                    Wrong Attempts: {wrongAttempts[selectedQuestion.id] || 0}/{MAX_ATTEMPTS}
                  </p>
                </>
              )}
              <button
                className="text-yellow-500 hover:text-yellow-300 text-xs mt-2"
                onClick={handleBackClick}
              >
                &lt; Back to Questions
              </button>
            </div>
          )}

          {/* <div className="lg:mt-0 mt-[-1em] text-orange-950 lg:text-2xl text-sm font-bold">
            Total Score: {totalScore}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LevelModal;
