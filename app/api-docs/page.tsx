export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        
        <h1 className="text-3xl font-bold mb-6">
          API Documentation
        </h1>

        <p className="text-gray-600 mb-8">
          Use these APIs to interact with the platform.
        </p>

        {/* LOGIN API */}
        <div className="mb-6 border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">
            POST /api/auth/login
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Login user with email & password
          </p>

          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`{
  "email": "test@gmail.com",
  "password": "123456"
}`}
          </pre>
        </div>

        {/* PROFILE API */}
        <div className="mb-6 border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">
            GET /api/user/me
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Get logged-in user profile
          </p>
        </div>

        {/* UPDATE PROFILE */}
        <div className="mb-6 border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">
            PUT /api/user/update
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Update user profile
          </p>
        </div>

      </div>

    </div>
  );
}