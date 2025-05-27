import { BASE_URL } from "../../Constant";

export default function ListOFStudentForClass({ data, index }) {
    const gender = {
        1: "Male",
        2: "Female"
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {index + 1}. {data.studentName}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {data.uin}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {gender[data.gender] || "Unknown"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            <img
                                src={`${BASE_URL}/ProfilePictures/${data.profilePicture}`}
                                alt={`${data.studentName}'s profile`}
                                className="w-12 h-12 rounded-full object-cover"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/48?text=No+Image")}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}