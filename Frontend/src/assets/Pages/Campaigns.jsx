import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Card, Button, GradientText } from '../Components/common';
import { themeColors, combineClasses } from '../Components/theme';

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role);
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns/active');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDonate = (campaign) => {
    navigate('/donation-form', { state: { campaign } });
  };

  return (
    <div className={combineClasses(
      "min-h-screen py-12 px-4",
      themeColors.bgGradient.light,
      themeColors.animation.fadeIn
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <GradientText as="h2" className="text-4xl font-bold mb-4">
            Active Campaigns
          </GradientText>
          <p className={combineClasses(
            "text-gray-600 max-w-2xl mx-auto text-lg",
            themeColors.animation.slideUp
          )}>
            Join our mission to create positive change. Every contribution brings hope and transforms lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <Card
              key={index}
              className={combineClasses(
                "overflow-hidden",
                themeColors.animation.slideUp,
                `animation-delay-${index * 100}`
              )}
            >
              <div className="relative">
                <img 
                  src={campaign.document_path || "/images/education.jpg"} 
                  alt={campaign.title} 
                  className="w-full h-56 object-cover"
                />
                <div className={combineClasses(
                  "absolute inset-0",
                  themeColors.bgGradient.dark,
                  "opacity-50"
                )}></div>
                {campaign.required_amount && (
                  <div className={combineClasses(
                    "absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium",
                    themeColors.glassEffect
                  )}>
                    <GradientText>Required: ${campaign.required_amount}</GradientText>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <GradientText as="h3" className="text-xl font-semibold mb-3">
                  {campaign.title}
                </GradientText>
                <p className="text-gray-600 mb-6">
                  {campaign.description}
                </p>
                {campaign.current_amount !== undefined && (
                  <div className="mb-4">
                    <div className={combineClasses(
                      "h-2 rounded-full overflow-hidden",
                      themeColors.glassEffect
                    )}>
                      <div 
                        className={combineClasses(
                          "h-2 rounded-full",
                          themeColors.bgGradient.dark
                        )}
                        style={{ width: `${Math.min((campaign.current_amount / campaign.required_amount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <GradientText>Raised: ${campaign.current_amount}</GradientText> of ${campaign.required_amount}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  {userRole === 'donor' ? (
                    <Button
                      onClick={() => handleDonate(campaign)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <span>Support this Cause</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </Button>
                  ) : (
                    <p className={combineClasses(
                      "text-center text-gray-600 text-sm",
                      themeColors.animation.pulse
                    )}>
                      Please login as a donor to support this cause
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={combineClasses(
          "mt-12 text-center",
          themeColors.animation.fadeIn
        )}>
          <p className="text-gray-600">
            Can't find a campaign that resonates with you?{' '}
            <a 
              href="/contact" 
              className={combineClasses(
                "font-medium",
                themeColors.textGradient,
                themeColors.interactive.base
              )}
            >
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
