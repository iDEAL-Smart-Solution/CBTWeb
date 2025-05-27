import ListOFStudentForClass from "./listOfStudentForClass";
import ListOfSubjectForClass from "./listOfSubjecForClass";

export default function SingleClassTemplate({ students }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {students.name}
            </h2>
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Students</h3>
                {students.listOfStudents.length > 0 ? (
                    students.listOfStudents.map((stu, index) => (
                        <ListOFStudentForClass
                            index={index}
                            key={stu.id}
                            id={stu.id}
                            data={stu}
                        />
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No students found in this class.</p>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Subjects</h3>
                {students.listOfSubjects.length > 0 ? (
                    students.listOfSubjects.map((sub, index) => (
                        <ListOfSubjectForClass
                            key={sub.id}
                            id={sub.id}
                            data={sub}
                            index={index}
                        />
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No subjects found for this class.</p>
                )}
            </div>
        </div>
    );
}