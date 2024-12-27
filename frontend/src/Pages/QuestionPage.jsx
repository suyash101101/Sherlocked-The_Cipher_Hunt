import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';

function QuestionPage() {
  const { chapterId, questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const chapterData = questionsData.chapters.find(c => c.id === parseInt(chapterId));
    if (chapterData) {
      const questionData = chapterData.questions.find(q => q.id === parseInt(questionId));
      if (questionData) {
        setQuestion(questionData);
      }
    }
  }, [chapterId, questionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      setFeedback('Correct! Well done!');
      // Save progress
      const savedProgress = JSON.parse(localStorage.getItem(`chapter${chapterId}Progress`) || '{}');
      savedProgress[questionId] = true;
      localStorage.setItem(`chapter${chapterId}Progress`, JSON.stringify(savedProgress));
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(`/track/${chapterId}`)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Chapter {chapterId}
      </button>
      <h1 className="text-4xl font-bold mb-4">{question.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <p className="text-gray-200">{question.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
            Your Answer
          </label>
          <textarea
            id="answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your answer here..."
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Answer
          </button>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-blue-500 hover:underline"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </div>
      </form>
      {showHint && (
        <div className="mt-4 p-4 bg-yellow-600 rounded">
          <p className="font-bold">Hint:</p>
          <p>{question.hint}</p>
        </div>
      )}
      {feedback && (
        <div className={`mt-4 p-4 rounded ${feedback.includes('Correct') ? 'bg-green-600' : 'bg-red-600'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default QuestionPage;

