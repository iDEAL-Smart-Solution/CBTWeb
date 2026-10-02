import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Camera, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../Zustand/studentSlice";
import { useNotification } from "../../Context/notificationContext";
import { BASE_URL } from "../../Constant";
import defaultAvatar from "../../assets/avatar.jpeg";

const genderNames = { 1: "Male", 2: "Female" };
const termNames = { 1: "First term", 2: "Second term", 3: "Third term" };

function ProfileValue({ label, value }) {
    return (
        <div className="rounded-lg bg-gray-50 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
            <dd className="mt-1 break-words font-medium text-gray-900">{value || "—"}</dd>
        </div>
    );
}

export default function StudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const { student, fetchStudentProfile, uploadStudentProfilePicture } = useStudent();
    const { profile, profileLoading, uploadingProfilePicture, profileError } = student;
    const { showSuccess, showError } = useNotification();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        fetchStudentProfile(id);
        setImageError(false);
    }, [id, fetchStudentProfile]);

    const handlePictureSelected = async (event) => {
        const image = event.target.files?.[0];
        event.target.value = "";
        if (!image) return;

        if (!image.type.startsWith("image/")) {
            showError("Choose an image file.");
            return;
        }

        const result = await uploadStudentProfilePicture(profile.userId, image);
        if (!result.success) {
            showError(result.message);
            return;
        }

        showSuccess(result.message);
        setImageError(false);
        await fetchStudentProfile(id);
    };

    if (profileLoading && !profile) {
        return <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 p-12 text-gray-600"><LoaderCircle className="h-5 w-5 animate-spin" />Loading student profile…</div>;
    }

    if (!profile) {
        return (
            <div className="mx-auto max-w-5xl p-6">
                <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"><ArrowLeft size={17} />Back to students</button>
                <div className="rounded-xl border border-red-200 bg-white p-8 text-center text-red-700">{profileError || "Student profile could not be found."}</div>
            </div>
        );
    }

    const pictureUrl = profile.profilePicture && !imageError
        ? `${BASE_URL}/ProfilePicture/${profile.profilePicture}`
        : defaultAvatar;

    return (
        <main className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"><ArrowLeft size={17} />Back to students</button>

            <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                <div className="h-28 bg-gradient-to-r from-blue-700 to-indigo-600" />
                <div className="-mt-12 flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4">
                        <div className="relative">
                            <img src={pictureUrl} onError={() => setImageError(true)} alt={`${profile.firstName} ${profile.lastName}`} className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow" />
                            <button type="button" onClick={() => inputRef.current?.click()} disabled={uploadingProfilePicture} title="Replace profile picture" className="absolute -bottom-2 -right-2 rounded-full bg-blue-700 p-2 text-white shadow hover:bg-blue-800 disabled:opacity-60">
                                {uploadingProfilePicture ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                            </button>
                            <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handlePictureSelected} />
                        </div>
                        <div className="pb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{profile.studentName}</h1>
                            <p className="mt-1 text-sm text-gray-600">{profile.uin} <span className="mx-1">·</span> {profile.className}</p>
                        </div>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${profile.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {profile.isActive ? "Active" : "Deactivated"}
                    </span>
                </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Student details</h2>
                <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <ProfileValue label="First name" value={profile.firstName} />
                    <ProfileValue label="Last name" value={profile.lastName} />
                    <ProfileValue label="Registration number" value={profile.registrationNumber} />
                    <ProfileValue label="Student ID" value={profile.userId} />
                    <ProfileValue label="Email" value={profile.email} />
                    <ProfileValue label="Phone number" value={profile.phoneNumber} />
                    <ProfileValue label="Gender" value={genderNames[profile.gender] || "Not specified"} />
                    <ProfileValue label="Class" value={profile.className} />
                </dl>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Subjects</h2>
                {profile.subjects?.length ? (
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {profile.subjects.map((subject) => <li key={subject.id} className="rounded-lg border border-gray-200 px-4 py-3"><p className="font-semibold text-gray-900">{subject.name}</p><p className="mt-1 text-sm text-gray-500">{subject.code}</p></li>)}
                    </ul>
                ) : <p className="text-sm text-gray-500">No subjects are assigned to this student’s class.</p>}
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Results</h2>
                {profile.results?.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b text-xs uppercase text-gray-500"><tr><th className="px-3 py-3">Subject</th><th className="px-3 py-3">Session</th><th className="px-3 py-3">Term</th><th className="px-3 py-3">1st CA</th><th className="px-3 py-3">2nd CA</th><th className="px-3 py-3">3rd CA</th><th className="px-3 py-3">Exam</th><th className="px-3 py-3">Total</th></tr></thead>
                            <tbody>{profile.results.map((result) => <tr key={result.id} className="border-b last:border-0"><td className="px-3 py-3 font-medium">{result.subjectName || result.subjectCode}</td><td className="px-3 py-3">{result.session}</td><td className="px-3 py-3">{termNames[result.term] || result.term}</td><td className="px-3 py-3">{result.firstCaScore}</td><td className="px-3 py-3">{result.secondCaScore}</td><td className="px-3 py-3">{result.thirdCaScore}</td><td className="px-3 py-3">{result.examScore}</td><td className="px-3 py-3 font-semibold">{result.totalScore}</td></tr>)}</tbody>
                        </table>
                    </div>
                ) : <p className="text-sm text-gray-500">No results are available for this student.</p>}
            </section>
        </main>
    );
}
