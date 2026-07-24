import { useState } from "react";
import { useAuth } from "../../Zustand/auth";
import { useStudent } from "../../Zustand/studentSlice";
import { useNotification } from "../../Context/notificationContext";
import { BASE_URL } from "../../Constant";

const genderMap = { 1: "Male", 2: "Female" };

export default function SingleClassTemplate({ students, onDeactivated }) {
    const { auth } = useAuth();
    const isSuperAdmin = auth.user?.role === 1;

    const { deactivateStudent, reactivateStudent } = useStudent();
    const { showSuccess, showError } = useNotification();

    // confirmMode: "deactivate" | "reactivate"
    const [confirm, setConfirm] = useState(null); // { id, name, mode }
    const [processing, setProcessing] = useState(false);

    const openConfirm = (id, name, mode) => setConfirm({ id, name, mode });
    const closeConfirm = () => setConfirm(null);

    const handleAction = async () => {
        setProcessing(true);
        try {
            const res = confirm.mode === "deactivate"
                ? await deactivateStudent(confirm.id)
                : await reactivateStudent(confirm.id);

            if (res.success) {
                showSuccess(res.message);
                onDeactivated?.();
            } else {
                showError(res.message);
            }
        } catch {
            showError("An unexpected error occurred.");
        } finally {
            setProcessing(false);
            closeConfirm();
        }
    };

    const isDeactivate = confirm?.mode === "deactivate";

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {students.name}
            </h2>

            {/* ── Students table ── */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Students</h3>
                {students.listOfStudents.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">#</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Photo</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Name</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">UIN</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Gender</th>
                                    <th className="px-4 py-3 text-center border border-gray-200 whitespace-nowrap">Status</th>
                                    {isSuperAdmin && (
                                        <th className="px-4 py-3 text-center border border-gray-200 whitespace-nowrap">Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {students.listOfStudents.map((stu, index) => (
                                    <tr
                                        key={stu.id}
                                        className={`transition-colors ${
                                            !stu.isActive
                                                ? "bg-red-50"
                                                : index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                        } hover:bg-blue-50/30`}
                                    >
                                        <td className="px-4 py-3 border border-gray-200 text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200">
                                            <img
                                                src={`${BASE_URL}/ProfilePictures/${stu.profilePicture}`}
                                                alt={stu.studentName}
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) =>
                                                    (e.target.src =
                                                        "https://via.placeholder.com/40?text=N/A")
                                                }
                                            />
                                        </td>
                                        <td className={`px-4 py-3 border border-gray-200 font-medium ${stu.isActive ? "text-gray-800" : "text-gray-400 line-through"}`}>
                                            {stu.studentName}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 text-gray-600 font-mono">
                                            {stu.uin}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 text-gray-600">
                                            {genderMap[stu.gender] || "—"}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 text-center">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                stu.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${stu.isActive ? "bg-green-500" : "bg-red-500"}`} />
                                                {stu.isActive ? "Active" : "Deactivated"}
                                            </span>
                                        </td>
                                        {isSuperAdmin && (
                                            <td className="px-4 py-3 border border-gray-200 text-center">
                                                {stu.isActive ? (
                                                    <button
                                                        onClick={() => openConfirm(stu.id, stu.studentName, "deactivate")}
                                                        className="px-3 py-1 text-xs font-semibold rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                    >
                                                        Deactivate
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => openConfirm(stu.id, stu.studentName, "reactivate")}
                                                        className="px-3 py-1 text-xs font-semibold rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">No students found in this class.</p>
                )}
            </div>

            {/* ── Subjects table ── */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Subjects</h3>
                {students.listOfSubjects.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">#</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Name</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Code</th>
                                    <th className="px-4 py-3 text-left border border-gray-200 whitespace-nowrap">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.listOfSubjects.map((sub, index) => (
                                    <tr
                                        key={sub.id}
                                        className={`hover:bg-blue-50/30 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                                    >
                                        <td className="px-4 py-3 border border-gray-200 text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                            {sub.name}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 text-gray-600 font-mono">
                                            {sub.code}
                                        </td>
                                        <td className="px-4 py-3 border border-gray-200 text-gray-600">
                                            {sub.description || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">No subjects found for this class.</p>
                )}
            </div>

            {/* ── Confirm modal ── */}
            {confirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {isDeactivate ? "Deactivate Account" : "Reactivate Account"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                            You are about to {isDeactivate ? "deactivate" : "reactivate"} the account of:
                        </p>
                        <p className="font-semibold text-gray-800 mb-4">{confirm.name}</p>
                        <p className={`text-xs mb-5 ${isDeactivate ? "text-red-600" : "text-green-700"}`}>
                            {isDeactivate
                                ? "The student will no longer be able to log in. You can reactivate them later if a subscription slot is available."
                                : "This will restore the student's access. A subscription slot will be used. If your limit is reached, you will be notified."}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={closeConfirm}
                                disabled={processing}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={processing}
                                className={`px-4 py-2 rounded-md text-white disabled:opacity-60 ${
                                    isDeactivate
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-600 hover:bg-green-700"
                                }`}
                            >
                                {processing
                                    ? isDeactivate ? "Deactivating…" : "Activating…"
                                    : isDeactivate ? "Yes, Deactivate" : "Yes, Activate"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
