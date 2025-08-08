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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Active Campaigns
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our mission to create positive change. Every contribution brings hope and transforms lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {campaign.description}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => handleDonate(campaign.title)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Support this Cause</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Can't find a campaign that resonates with you?{' '}
            <a href="/contact" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Contact us
            </a>{' '}
            to discuss other ways to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
