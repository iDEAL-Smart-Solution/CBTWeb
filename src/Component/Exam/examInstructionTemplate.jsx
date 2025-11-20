import { Link } from "react-router-dom";
import { BASE_URL } from "../../Constant";

export default function ExamInstructionTemplate({ data }) {
    const termMap = {
        1: "1st Term",
        2: "2nd Term",
        3: "3rd Term",
    };

    const examTypeMap = {
        1: "First CA",
        2: "Second CA",
        3: "Third CA",
        4: "Exam",
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-blue-600 font-sans">
                    Hello {data.studentName},
                </h1>
                <div className="space-y-2">
                    <p className="font-sans text-gray-900 text-base">
                        <span className="font-medium text-gray-700">Subject:</span> {data.subjectName}
                    </p>
                    <p className="font-sans text-gray-900 text-base">
                        <span className="font-medium text-gray-700">Type:</span> {examTypeMap[data.examType]}
                    </p>
                    <p className="font-sans text-gray-900 text-base">
                        <span className="font-medium text-gray-700">Term:</span> {termMap[data.term]}
                    </p>
                    <p className="font-sans text-gray-900 text-base">
                        <span className="font-medium text-gray-700">Session:</span> {data.session}
                    </p>
                    <p className="font-sans text-gray-900 text-base">
                        <span className="font-medium text-gray-700">Duration:</span> {data.duration}
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0">
                <img
                    src={`${BASE_URL}/ProfilePicture/${data.profilePicture}`}
                    alt={`${data.studentName}'s profile`}
                    className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                />
            </div>
            <Link to={`/do-exam/${data.examKey}`} className="w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Start Exam
                </button>
            </Link>
        </div>
    );
}