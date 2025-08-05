import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const navigate = useNavigate();

  const handleDonate = (campaign) => {
    navigate(`/donation?campaign=${encodeURIComponent(campaign)}`);
  };

  const campaigns = [
    {
      title: "Education for All",
      description: "Providing education resources for underprivileged children.",
      image: "/images/education.jpg", // Replace with actual image path
    },
    {
      title: "Health Care Support",
      description: "Helping families with medical expenses.",
      image: "/images/patients.jpg", // Replace with actual image path
    },
    {
      title: "Hunger-Free Tomorrow",
      description: "Supporting helpless communities.",
      image: "/images/food.jpg", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-4xl font-bold mb-6">Our Campaigns</h2>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        Join our ongoing campaigns and help us make a difference. Your support changes lives!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">{campaign.title}</h3>
              <p className="text-gray-500 mt-2">{campaign.description}</p>
              <button
                onClick={() => handleDonate(campaign.title)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
