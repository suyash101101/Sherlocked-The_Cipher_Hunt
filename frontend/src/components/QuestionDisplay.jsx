import { useState } from 'react';

function QuestionDisplay({ title, content }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the answer to your backend for verification
    // For now, we'll just provide a dummy response
    setFeedback('Answer submitted! Waiting for verification...');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{content}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Answer
        </button>
      </form>
      {feedback && <p className="mt-4 text-green-400">{feedback}</p>}
    </div>
  );
}

export default QuestionDisplay;

