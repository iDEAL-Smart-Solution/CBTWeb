import React, { useEffect, useState } from 'react';
import { useDoExam } from '../../Zustand/doExamSlice';
import { useParams, useNavigate } from 'react-router-dom';

const DoExam = () => {
  const { examKey } = useParams();
  const {
    questions,
    loading,
    currentIndex,
    userAnswers,
    fetcQuestionsToDo,
    nextQuestion,
    prevQuestion,
    setAnswer,
    maxDuration,
    totalQuestion,
    setCurrentIndex,
    submitExam,
    startTime,
    message,
  } = useDoExam();

  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);


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
        console.log(err.message)
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

    const timerId = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(timerId);
        // handleExamSubmit();
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

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  const handleQuestionClick = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };
  const renderQuestionButtons = () => {
    const buttonStyle = {
      padding: '8px',
      width: '40px',
      height: '40px',
      textAlign: 'center',
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      margin: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    };

    const rowStyle = {
      display: 'flex',
      justifyContent: 'center',
      margin: '8px 0',
    };

    const rows = [];
    for (let i = 0; i < totalQuestion; i += 3) {
      const rowButtons = [];
      for (let j = i; j < i + 3 && j < totalQuestion; j++) {
        rowButtons.push(
          <button
            key={j}
            onClick={() => handleQuestionClick(j)}
            style={{
              ...buttonStyle,
              backgroundColor: userAnswers[questions[j]?.id] ? 'var(--primary-color)' : 'white',
              color: userAnswers[questions[j]?.id] ? 'white' : 'var(--primary-color)'
            }}
          >
            {j + 1}
          </button>
        );
      }
      rows.push(<div key={i} style={rowStyle}>{rowButtons}</div>);
    }

    return <div>{rows}</div>;
  };
  if (loading) {
    return (
      <div className="loader-cell">
        <div className="loader"></div>
      </div>
    );
  }
  if (questions.length === 0) return <p className='text-center text-big-3'>No questions available</p>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (message) return <div className=''>{message}</div>

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h1 className='text-center color-primary'>Questions</h1>
      <div className='exam-question-box'>
        <div className='left-fraction'>
          <p className='text-big-3'>{currentIndex + 1}. {currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label className='text-big-3'>
                <input
                  type="radio"
                  name={`question_${currentQuestion.id}`}
                  value={option}
                  checked={userAnswers[currentQuestion.id] === option}
                  onChange={() => setAnswer(currentQuestion.id, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className='right-fraction'>
          {timeLeft !== null && <p className="box-shadow-3 exam-time text-center">{formatTime(timeLeft)}</p>}
          <div className="exam-question-numbers">
            {totalQuestion > 0 && renderQuestionButtons()}
          </div>

          <div className='form-grouping'>
            <button onClick={prevQuestion} disabled={currentIndex === 0} className='submit-button-2 text-center color-light bold'>Previous</button>
            <button onClick={nextQuestion} disabled={currentIndex === questions.length - 1} className='submit-button-2 text-center color-light bold'>Next</button>
          </div>
          <button onClick={handleExamSubmit} className="submit-exam-button text-center color-light bolder">Submit Exam</button>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog box-shadow-3">
          <p>Are you sure you want to submit the exam?</p>
          <div className='form-grouping'>
            <button onClick={confirmSubmit} className="confirm-submit submit-button-2  text-center color-light bold">Yes, Submit</button>
            <button onClick={cancelSubmit} className="cancel-button submit-button-2  text-center color-light bold">No, Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoExam;