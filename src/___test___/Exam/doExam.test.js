import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useDoExam } from '../../Zustand/doExamSlice';
import DoExam from '../../Pages/Exam/doExam';
import "@testing-library/jest-dom"; // Import this to use toBeInTheDocument


jest.mock('../../Zustand/doExamSlice', () => ({
  useDoExam: jest.fn()
}));

describe('DoExam Component', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      questions: [
        { id: 1, question: 'What is 2+2?', options: ['2', '3', '4', '5'], isPassageQuestion: false },
        { id: 2, question: 'What is 3+3?', options: ['3', '6', '9', '12'], isPassageQuestion: false }
      ],
      passageQuestions: [],
      theory: [],
      passage: {},
      loading: false,
      currentIndex: 0,
      userAnswers: {},
      fetcQuestionsToDo: jest.fn(),
      nextQuestion: jest.fn(),
      prevQuestion: jest.fn(),
      setAnswer: jest.fn(),
      maxDuration: '00:30:00',
      totalOBJQuestion: 2,
      setCurrentIndex: jest.fn(),
      submitExam: jest.fn(),
      startTime: new Date().toISOString(),
    };
    useDoExam.mockReturnValue(mockStore);
  });

  it('renders without crashing and displays the first question', () => {
    render(
      <MemoryRouter initialEntries={['/do-exam/123']}>
        <Routes>
          <Route path="/do-exam/:examKey" element={<DoExam />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/What is 2+2?/)).toBeInTheDocument();
  });

  it('allows selecting an answer', () => {
    render(
      <MemoryRouter initialEntries={['/do-exam/123']}>
        <Routes>
          <Route path="/do-exam/:examKey" element={<DoExam />} />
        </Routes>
      </MemoryRouter>
    );

    const option = screen.getByLabelText('4');
    fireEvent.click(option);

    expect(mockStore.setAnswer).toHaveBeenCalledWith(1, '4');
  });

  it('navigates to the next question', () => {
    render(
      <MemoryRouter initialEntries={['/do-exam/123']}>
        <Routes>
          <Route path="/do-exam/:examKey" element={<DoExam />} />
        </Routes>
      </MemoryRouter>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockStore.nextQuestion).toHaveBeenCalled();
  });

  it('submits the exam', async () => {
    render(
      <MemoryRouter initialEntries={['/do-exam/123']}>
        <Routes>
          <Route path="/do-exam/:examKey" element={<DoExam />} />
        </Routes>
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Submit Exam');
    fireEvent.click(submitButton);
    expect(screen.getByText('Are you sure you want to submit the exam?')).toBeInTheDocument();
  });
});
