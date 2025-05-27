import { Link } from "react-router-dom";

export default function MyExamsTemplate({ name, id, index }) {
    return (
        <Link
            to={`/instructions/${id}`}
            className="block w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
            {index + 1}. {name.toUpperCase()}
        </Link>
    );
}