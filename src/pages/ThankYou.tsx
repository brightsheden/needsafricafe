import { Check, Home, Folder, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BgIMage from "../assets/freepik.jpg"
import { useExecutePaypalPayment } from "../api/donation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: executePaypalPayment, isPending, isSuccess, data, error } = useExecutePaypalPayment();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const payer_id = searchParams.get("PayerID") || "";
    const payment_id = searchParams.get("paymentId") || "";
    const token = searchParams.get("token") || "";
    if (token) {
      executePaypalPayment({ payer_id, payment_id, token });
    }
  }, [location.search, executePaypalPayment]);

  const handleShare = () => {
    const shareData = {
      title: "Support Our Cause",
      text: "I just donated! Join me in making a difference.",
      url: window.location.origin,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          `url('${BgIMage}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto p-8 bg-white/90 rounded-2xl shadow-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Check className="h-24 w-24 bg-orange-100 p-4 rounded-full text-primary" />
        </div>

        {/* Text */}
        <h2 className="text-6xl font-bold mb-2">Thank You</h2>
        <p className="text-2xl mb-6 text-gray-700">
          Your donation has been received and will make a real difference.  
          We appreciate your generosity and support!
        </p>

        {/* Action Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/80 transition"
          >
            <Home className="h-5 w-5" /> Home
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-500 transition"
          >
            <Folder className="h-5 w-5" /> View Projects
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            <Share2 className="h-5 w-5" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;