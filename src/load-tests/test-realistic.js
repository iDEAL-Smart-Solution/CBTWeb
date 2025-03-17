import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomSeed, randomIntBetween } from 'k6';

// Set a seed for predictable randomness
randomSeed(123);

export let options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 users
    { duration: '1m', target: 200 },  // Hold at 200 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% of requests should be < 2s
  },
};

export default function () {
  // let studentId = randomIntBetween(1, 500);
  let email = `STD/AK0001`; // Adjust if necessary
  let password = 'kolade';

  let headers = { headers: { 'Content-Type': 'application/json' } };

  // Simulate network delay (random between 100-500ms)
  sleep(randomIntBetween(100, 500) / 1000);

  // Step 1: Login using URL parameters
  let loginUrl = `https://ideal-cbt-a3ddcdhsbxdcgnbv.westeurope-01.azurewebsites.net/api/v1/User/Login?email=${email}&password=${password}`;

  let loginRes = http.post(loginUrl, null, headers); // No body needed

  check(loginRes, {
    'Login successful': (r) => r.status === 200,
  });

  // let authToken = loginRes.json('token') || null;
  // if (!authToken) {
  //   console.error(`Login failed for user: ${email}`);
  //   return;
  // }

  sleep(randomIntBetween(1, 3)); // Simulate thinking time

  // Step 2: Fetch Exam Questions
  // let examHeaders = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${authToken}`,
  //   },
  // };

  // let examRes = http.get(
  //   `https://ideal-cbt-a3ddcdhsbxdcgnbv.westeurope-01.azurewebsites.net/api/v1/Exam/get-all`,
  //   examHeaders
  // );

  // check(examRes, {
  //   'Fetched questions successfully': (r) => r.status === 200,
  // });

  // let examData = examRes.json();
  // let examId = examData && examData.examId ? examData.examId : null;

  // if (!examId) {
  //   console.error('Failed to retrieve exam ID');
  //   return;
  // }

  // sleep(randomIntBetween(5, 15)); // Simulate students answering questions at different speeds

  // Step 3: Submit Exam Answers (Uncomment when API is ready)
  /*
  let submitPayload = JSON.stringify({
    examId: examId,
    studentId: studentId,
    answers: [
      { questionId: 1, selectedOption: 'B' },
      { questionId: 2, selectedOption: 'C' },
      { questionId: 3, selectedOption: 'A' },
    ],
  });

  let submitRes = http.post(
    'https://ideal-cbt-a3ddcdhsbxdcgnbv.westeurope-01.azurewebsites.net/api/v1/Exam/submit',
    submitPayload,
    examHeaders
  );

  check(submitRes, {
    'Exam submitted successfully': (r) => r.status === 200,
  });

  sleep(randomIntBetween(2, 5));
  */
}
