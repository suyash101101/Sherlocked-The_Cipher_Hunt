import { useState, useEffect } from "react";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import chapters from "../data/chapters.json";

function LevelModal({ location, onClose }) {
  const { id } = location;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState(new Set()); // Tracks solved questions
  const [wrongAttempts, setWrongAttempts] = useState({}); // Tracks wrong attempts per question
  const [totalScore, setTotalScore] = useState(0); // Tracks total score

  const MAX_ATTEMPTS = 100;

  const chapter = chapters.find((chapter) => chapter.id === id);

  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    document.body.style.overflowY = "hidden";
    return () => {
      // Re-enable scrolling on the body when the modal is closed
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsQuestionsVisible(false);
  };

  const handleBackClick = () => {
    setSelectedQuestion(null);
    setIsQuestionsVisible(true);
    setUserAnswer("");
  };

  const handleAnswerSubmit = () => {
    if (!selectedQuestion) return;

    const currentAttempts = wrongAttempts[selectedQuestion.id] || 0;

    if (currentAttempts >= MAX_ATTEMPTS || solvedQuestions.has(selectedQuestion.id)) return; // Lock question if attempts exceed limit or already solved

    if (
      userAnswer ===
      selectedQuestion.answer
    ) {
      setSolvedQuestions((prev) => {
        const updatedSolved = new Set(prev);
        updatedSolved.add(selectedQuestion.id);
        return updatedSolved;
      });

      setTotalScore((prevScore) => prevScore + selectedQuestion.points);
    } else {
      // Increment wrong attempts for the question
      setWrongAttempts((prev) => ({
        ...prev,
        [selectedQuestion.id]: currentAttempts + 1,
      }));
    }
    setUserAnswer(""); // Clear input after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div
        className="lg:w-[70em] lg:h-[70em] lg:mt-80 md:w-[45em] md:h-[45em] sm:w-[35em] sm:h-[35em] w-[30em] h-[30em] bg-contain  bg-no-repeat bg-center relative transition-transform duration-200 ease-in-out"
        style={{
          backgroundImage: "url('/scroll.png')",
        }}
      >
        {/* Cross button to close modal */}
        <button
          className="absolute lg:right-32 md:right-20 lg:mt-40 md:mt-28 mt-16 right-16 text-orange-950 text-3xl font-extrabold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center lg:mt-64 md:mt-40 sm:mt-28 mt-24">
          {/* Chapter title or Question title */}
          <h2 className="md:text-4xl text-xl font-extrabold text-orange-950 ">
            {selectedQuestion ? selectedQuestion.title : chapter?.name}
          </h2>

          {/* Questions list */}
          {isQuestionsVisible && (
            <div className="questions-container grid grid-cols-3 md:grid-cols-3 lg:gap-2 gap-1 max-h-96 overflow-y-auto p-4 md:mt-2 mt-0 rounded-lg">
              {chapter?.questions.map((question) => (
                <div key={question.id} className="cursor-pointer">
                  <div
                    className="lg:p-3 md:px-3 md:py-1 p-1 bg-orange-800 lg:text-3xl md:text-base text-xs text-white rounded-md hover:bg-yellow-500 hover:scale-105 transition-all"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <h4 className="lg:text-2xl md:text-sm sm:text-sm">{question.title}</h4>
                    <p className="lg:text-lg md:text-xs sm:text-xs">
                      Points: {question.points}{" "}
                      {solvedQuestions.has(question.id) && (
                        <FiCheckCircle className="inline text-green-500 ml-2" />
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Question description */}
          {selectedQuestion && (
            <div
              className="p-6 bg-orange-950 text-white rounded-lg w-[70%] text-center"
            >
              <p className="mb-4 max-h-[7em] overflow-y-auto">
                {selectedQuestion.description}
              </p>
              <p className="mb-4 flex items-center justify-center">
                <strong>Hint:</strong> <FiLock className="ml-2 text-yellow-500" />
              </p>
              <div className="mb-4 text-gray-900">
                {solvedQuestions.has(selectedQuestion.id) ? (
                  <p className="text-green-500 font-bold">Correct Answer!</p>
                ) : wrongAttempts[selectedQuestion.id] >= MAX_ATTEMPTS ? (
                  <p className="text-red-500 font-bold">
                    You have exceeded the maximum number of attempts for this
                    question.
                  </p>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      className="p-2 rounded border w-3/4 text-grey"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button
                      onClick={handleAnswerSubmit}
                      className="ml-2 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                    >
                      Submit
                    </button>
                    <p className="text-red-500 mt-2">
                      Wrong Attempts:{" "}
                      {wrongAttempts[selectedQuestion.id] || 0}/{MAX_ATTEMPTS}
                    </p>
                  </>
                )}
              </div>
              <button
                className="text-yellow-500 hover:text-yellow-300 mt-6"
                onClick={handleBackClick}
              >
                &lt; Back to Questions
              </button>
            </div>
          )}

          {/* Total Score */}
          <div className="lg:mt-0 mt-[-1em] text-orange-950 lg:text-2xl text-sm font-bold">
            Total Score: {totalScore}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelModal;
