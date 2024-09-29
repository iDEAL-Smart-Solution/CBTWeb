import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Constant';

export const useDoExam = create((set, get) => ({
  questions: [],
  loading: false,
  currentIndex: 0,
  userAnswers: {},
  maxDuration: 0,
  examId: "",
  sessionId: "",
  subjectCode: "",
  totalQuestion: 0,
  studentId: "",
  startTime: null,
  message: "",

  fetcQuestionsToDo: async (examKey) => {
    set({ loading: true });
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const studentId = user ? user.id : null;


      const res = await axios.get(`${BASE_URL}/api/v1/Exam/do-exam?examKey=${examKey}&studentId=${studentId}`);
      const incoming = res.data;

      const questions = incoming.questionsPerStudents.map((list, index) => ({
        index,
        id: list.id,
        questionInstruction: list.questionInstruction,  
        question: list.question,
        questionImage: list.questionImage,
        options: [list.optionA, list.optionB, list.optionC, list.optionD],
      }));

      const maxDuration = incoming.duration;

      const [hours, minutes, seconds] = incoming.duration.split(':');
      const totalSeconds = (+hours * 3600) + (+minutes * 60) + (+seconds);


      if (!studentId) {
        throw new Error('Student ID not found in session storage');
      }

      set({
        questions,
        loading: false,
        duration: totalSeconds,
        examId: incoming.examId,
        sessionId: incoming.sessionId,
        subjectCode: incoming.subjectCode,
        totalQuestion: incoming.totalQuestion,
        studentId: studentId,
        startTime: new Date().toISOString(),
        maxDuration: incoming.duration
      });
    } catch (error) {
      console.error("Error fetching questions", error);
      set({ loading: false, message: `${error.response.data}, Please contact the admin, if you haven't seat for the exam` });
      throw new Error(`${error.response.data} Please contact the admin`);

    }
  },

  nextQuestion: () => set((state) => ({
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
  })),

  prevQuestion: () => set((state) => ({
    currentIndex: Math.max(state.currentIndex - 1, 0),
  })),

  setAnswer: (questionId, answer) => set((state) => ({
    userAnswers: {
      ...state.userAnswers,
      [questionId]: answer,
    },
  })),

  setCurrentIndex: (index) => set({ currentIndex: index }),

submitExam: async () => {
     const state = get();
     const endTime = new Date();
     const startTime = new Date(state.startTime);
     const durationInSeconds = Math.floor((endTime - startTime) / 1000);
   
     // Convert duration to "HH:mm:ss" format for TimeSpan
     const hours = Math.floor(durationInSeconds / 3600);
     const minutes = Math.floor((durationInSeconds % 3600) / 60);
     const seconds = durationInSeconds % 60;
     const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   
     const submissionData = {
       Duration: duration, 
       ExamId: state.examId,
       StudentId: state.studentId,
       SessionId: state.sessionId,
       SubjectCode: state.subjectCode,
       QuestiosnSubmitted: Object.entries(state.userAnswers).map(([questionId, answer]) => ({
         questionId: questionId,
         option: answer
       }))
     };
   
     try {
       const response = await axios.post(`${BASE_URL}/api/v1/Exam/submit`, submissionData);
       console.log('Exam submitted successfully:', response.data);
       return response.data;
     } catch (error) {
       console.error('Error submitting exam:', error);
       throw error;
     }
   }
   
   
   
}));