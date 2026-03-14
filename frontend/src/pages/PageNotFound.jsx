import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Go to Login
          </Link>

        </div>

      </div>

    </div>
  )
}

export default PageNotFound