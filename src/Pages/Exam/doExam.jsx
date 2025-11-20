import React, { useEffect, useState } from 'react';
import { useDoExam } from '../../Zustand/doExamSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import { useNotification } from '../../Context/notificationContext';

const DoExam = () => {
  const { examKey } = useParams();
  const {
    questions,
    passageQuestions,
    theory,
    passage,
    loading,
    currentIndex,
    userAnswers,
    fetcQuestionsToDo,
    nextQuestion,
    prevQuestion,
    setAnswer,
    maxDuration,
    totalOBJQuestion,
    setCurrentIndex,
    submitExam,
    startTime,
  } = useDoExam();

  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showTheory || showConfirmation) return; 
      
      const currentQuestion = questions[currentIndex];
      const optionMap = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
      };

      if (optionMap[event.key] !== undefined) {
        const optionIndex = optionMap[event.key];
        if (optionIndex < currentQuestion.options.length) {
          setAnswer(currentQuestion.id, currentQuestion.options[optionIndex]);
        }
      }

      if (event.key === 'n' && currentIndex < questions.length - 1) {
        nextQuestion();
      }
      if (event.key === 'p' && currentIndex > 0) {
        prevQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, questions, setAnswer, nextQuestion, prevQuestion, showTheory, showConfirmation]);

  const handleExamSubmit = async () => {
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      await submitExam();
      navigate('/exam-submited');
    } catch (error) {
      console.error('Failed to submit exam:', error);
      setError('Failed to submit exam. Please try again.');
    }
    setShowConfirmation(false);
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await fetcQuestionsToDo(examKey);
      } catch (err) {
        setError(err.message);
        navigate(`/my-exams`);
      }
    };
    fetchQuestions();
  }, [examKey, fetcQuestionsToDo, navigate]);

  useEffect(() => {
    if (!startTime || !maxDuration) return;

    const calculateTimeLeft = () => {
      const start = new Date(startTime);
      const now = new Date();
      const elapsedSeconds = Math.floor((now - start) / 1000);

      const [hours, minutes, seconds] = maxDuration.split(':').map(Number);
      const maxDurationInSeconds = hours * 3600 + minutes * 60 + seconds;

      const remainingSeconds = Math.max(maxDurationInSeconds - elapsedSeconds, 0);
      return remainingSeconds;
    };

    const timerId = setInterval(async () => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(timerId);
        try {
          await submitExam();
          navigate('/exam-submitted');
        } catch (error) {
          console.error('Failed to submit exam:', error);
          showError('Failed to submit exam. Please try again.');
        }
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [startTime, maxDuration]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  const handleQuestionClick = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  const renderQuestionButtons = () => {
    const rows = [];
    for (let i = 0; i < totalOBJQuestion; i += 3) {
      const rowButtons = [];
      for (let j = i; j < i + 3 && j < totalOBJQuestion; j++) {
        rowButtons.push(
          <button
            key={j}
            onClick={() => handleQuestionClick(j)}
            className={`w-10 h-10 text-sm font-bold rounded-md border border-gray-300 shadow-sm transition-colors ${
              userAnswers[questions[j]?.id] ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'
            }`}
          >
            {j + 1}
          </button>
        );
      }
      rows.push(
        <div key={i} className="flex justify-center gap-2 my-2">
          {rowButtons}
        </div>
      );
    }

    return <div>{rows}</div>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (questions.length === 0) return <p className="text-center text-2xl font-semibold text-gray-700">No questions available</p>;

  if (error) {
    return <div className="text-center text-red-600 text-lg font-medium">Error: {error}</div>;
  }

  const currentQuestion = questions[currentIndex];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 sm:p-6 lg:p-8">
      {theory.length > 0 && !showTheory && (
        <button
          onClick={() => setShowTheory(true)}
          className="mb-4 w-full sm:w-40 py-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Show Theory
        </button>
      )}

      {/* Theory Section */}
      {showTheory && (
        <>
          <button
            onClick={() => setShowTheory(false)}
            className="mb-4 w-full sm:w-40 py-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Show OBJ
          </button>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Theory Section</h2>
              {theory.map((item, index) => (
                <div key={index} className="mb-6 text-lg text-gray-700 border-b border-gray-200 pb-4 last:border-b-0">
                  {item.questionInstruction && item.questionInstruction !== '--' && (
                    <p className="font-medium text-gray-600">{item.questionInstruction}</p>
                  )}
                  <p className="mt-2 font-semibold">{index + 1}. {item.question}</p>
                  {item.questionImage && (
                    <img
                      src={`${BASE_URL}/ProfilePicture/${item.questionImage}`}
                      className="mt-4 max-w-full sm:max-w-md rounded-md shadow-sm"
                      alt="Theory Image"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="lg:w-80 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-4">
              {timeLeft !== null && (
                <p className="text-center text-xl font-mono text-gray-800 bg-gray-200 py-2 rounded-md mb-4">
                  {formatTime(timeLeft)}
                </p>
              )}
              <button
                onClick={handleExamSubmit}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </>
      )}

      {/* Objective Section */}
      {!showTheory && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-200px)] overflow-y-auto">
            {currentQuestion.isPassageQuestion ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{passage.passageTitle}</h2>
                <p className="text-gray-700 mb-6 p-4 bg-gray-50 rounded-md">{passage.passageContent}</p>
              </>
            ) : null}
            {currentQuestion.questionInstruction?.trim() && currentQuestion.questionInstruction !== '--' && (
              <p className="text-sm font-medium text-gray-600 mb-3">{currentQuestion.questionInstruction}</p>
            )}
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              {currentIndex + 1}. {currentQuestion.question}
            </p>
            {currentQuestion.questionImage && (
              <img
                src={`${BASE_URL}/ProfilePicture/${currentQuestion.questionImage}`}
                className="mt-4 max-w-full sm:max-w-md rounded-md shadow-sm mb-4"
                alt="Question Image"
              />
            )}
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-3">
                <label className="flex items-center text-lg text-gray-700">
                  <input
                    type="radio"
                    name={`question_${currentQuestion.id}`}
                    value={option}
                    checked={userAnswers[currentQuestion.id] === option}
                    onChange={() => setAnswer(currentQuestion.id, option)}
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  {String.fromCharCode(97 + index)}. {option}
                </label>
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-4">
              Press 'a', 'b', 'c', or 'd' to select an option, 'n' for next, 'p' for previous
            </p>
          </div>

          <div className="lg:w-80 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-4">
            {timeLeft !== null && (
              <p className="text-center text-xl font-mono text-gray-800 bg-gray-200 py-2 rounded-md mb-4">
                {formatTime(timeLeft)}
              </p>
            )}
            <div className="mb-6">{totalOBJQuestion > 0 && renderQuestionButtons()}</div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentIndex === 0
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous (p)
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentIndex === questions.length - 1}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentIndex === questions.length - 1
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next (n)
              </button>
            </div>
            <button
              onClick={handleExamSubmit}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg text-gray-800 mb-4">Are you sure you want to submit the exam?</p>
            <div className="flex gap-2">
              <button
                onClick={confirmSubmit}
                className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Yes, Submit
              </button>
              <button
                onClick={cancelSubmit}
                className="flex-1 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoExam;