import workTrackLogo from "../assets/images/WorkTrackLogo.png";

const RegisterReq = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-xl w-full p-6 md:p-10">
        <div className="text-center mb-5">
          <img
            className="h-20 mx-auto"
            src={workTrackLogo}
            alt="WorkTrack Logo"
          />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            ⏳ Registration Pending
          </h2>
        </div>

        <div className="space-y-4 text-center mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Your account has been successfully created,
            <br />
            <span className="font-semibold">
              but it is currently pending approval.
            </span>
          </p>

          <div>
            <p className="text-gray-700 leading-relaxed">
              An HR administrator will review your
              <br />
              registration shortly.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            You will be able to sign in once your
            <br />
            <span className="font-semibold">account is approved.</span>
          </p>
        </div>

        <div className="border-t border-gray-300 my-6"></div>

        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            What can you do now?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span className="text-gray-700">Please wait for approval</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span className="text-gray-700">
                Contact HR if approval takes long
              </span>
            </li>
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterReq;