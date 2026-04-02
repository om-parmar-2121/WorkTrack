import { useNavigate } from "react-router-dom";
import workTrackLogo from "../../assets/images/StaffSphereLogo.png";

const RegisterPending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 max-w-xl w-full p-5 sm:p-8 md:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <img
            className="h-16 sm:h-20 mx-auto"
            src={workTrackLogo}
            alt="StaffSphere"
          />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            ⏳ Pending
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Registration Under Review</p>
        </div>

        <div className="space-y-4 sm:space-y-5 text-center mb-8 sm:mb-10">
          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            Your account has been successfully created,
            <br />
            <span className="font-semibold text-blue-700">
              but it is currently pending approval.
            </span>
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            An HR administrator will review your registration shortly.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            You will be able to sign in once your account is approved.
          </p>
        </div>

        <div className="border-t border-gray-200 my-7 sm:my-8"></div>

        <div className="bg-blue-50 rounded-lg p-4 sm:p-5 mb-8 sm:mb-10">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            What can you do now?
          </h3>
          <ul>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg mt-0">✓</span>
              <span className="text-sm sm:text-base text-gray-700">Contact HR if approval takes longer than expected</span>
            </li>
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          type="button"
          className="w-full px-6 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base sm:text-lg font-semibold rounded-lg transition-all touch-highlight-transparent"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPending;