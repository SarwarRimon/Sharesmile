import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, GradientText } from '../Components/common';
import { themeColors, combineClasses } from '../Components/theme';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    required_amount: '',
    document: null
  });

  useEffect(() => {
    if (editingCampaign) {
      setFormData({
        title: editingCampaign.title,
        description: editingCampaign.description,
        required_amount: editingCampaign.required_amount,
        document: null
      });
      setShowAddForm(true);
    }
  }, [editingCampaign]);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load campaigns');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (editingCampaign) {
        await axios.put(`http://localhost:5000/api/admin/campaigns/${editingCampaign._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/admin/campaigns', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setFormData({
        title: '',
        description: '',
        required_amount: '',
        document: null
      });
      setShowAddForm(false);
      setEditingCampaign(null);
      fetchCampaigns();
    } catch (err) {
      setError('Failed to create campaign');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCampaigns();
    } catch (err) {
      setError('Failed to delete campaign');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className={combineClasses(
        "min-h-screen flex items-center justify-center",
        themeColors.bgGradient.light
      )}>
        <GradientText className={combineClasses(
          "text-xl",
          themeColors.animation.pulse
        )}>
          Loading campaigns...
        </GradientText>
      </div>
    );
  }

  return (
    <div className={combineClasses(
      "min-h-screen p-8",
      themeColors.bgGradient.light,
      themeColors.animation.fadeIn
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <GradientText as="h1" className="text-3xl font-bold mb-2">
              {editingCampaign ? 'Edit Campaign' : 'Manage Campaigns'}
            </GradientText>
            <p className="text-slate-600">
              {editingCampaign 
                ? `Editing: ${editingCampaign.title}`
                : 'Create and manage fundraising campaigns'
              }
            </p>
          </div>
          <Button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingCampaign(null);
              setFormData({
                title: '',
                description: '',
                required_amount: '',
                document: null
              });
            }}
            className={combineClasses(
              "flex items-center gap-2",
              showAddForm ? themeColors.status.warning : themeColors.buttonGradient
            )}
          >
            {showAddForm ? <FaTimes /> : <FaPlus />}
            {showAddForm ? 'Cancel' : 'Add Campaign'}
          </Button>
        </div>

        {error && (
          <Card className={combineClasses(
            "mb-6 p-4",
            themeColors.status.error,
            themeColors.animation.slideUp
          )}>
            <div className="flex items-center gap-3">
              <FaTimes className="w-5 h-5" />
              <p className="text-red-600">{error}</p>
            </div>
          </Card>
        )}

        {showAddForm && (
          <Card className={combineClasses(
            "mb-8",
            themeColors.animation.slideUp
          )}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={combineClasses(
                    themeColors.input.base,
                    themeColors.input.focus
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={combineClasses(
                    themeColors.input.base,
                    themeColors.input.focus
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Amount
                </label>
                <input
                  type="number"
                  name="required_amount"
                  value={formData.required_amount}
                  onChange={handleChange}
                  required
                  className={combineClasses(
                    themeColors.input.base,
                    themeColors.input.focus
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Image
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleChange}
                  accept="image/*"
                  className={combineClasses(
                    themeColors.input.base,
                    themeColors.input.focus,
                    "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0",
                    "file:bg-gradient-to-r file:from-indigo-500 file:to-purple-500 file:text-white"
                  )}
                />
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <FaCheck />
                Create Campaign
              </Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <Card
              key={campaign._id}
              className={combineClasses(
                themeColors.card.base,
                themeColors.card.hover,
                themeColors.animation.slideUp,
                `animation-delay-${index * 100}`
              )}
            >
              <div className="relative group">
                <img
                  src={campaign.document_path || "/images/education.jpg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className={combineClasses(
                  "absolute inset-0",
                  "bg-gradient-to-t from-slate-900 to-transparent opacity-60",
                  "group-hover:opacity-70 transition-opacity"
                )}></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className={combineClasses(
                    "px-3 py-1.5 rounded-lg text-sm font-medium",
                    themeColors.glassEffect,
                    campaign.status === 'active' 
                      ? "text-emerald-400 border border-emerald-400/20"
                      : "text-amber-400 border border-amber-400/20"
                  )}>
                    {campaign.status}
                  </span>
                  <span className={combineClasses(
                    "px-3 py-1.5 rounded-lg text-sm font-medium",
                    themeColors.glassEffect,
                    "text-white border border-white/20"
                  )}>
                    ৳{campaign.required_amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <GradientText as="h3" className="text-xl font-semibold mb-2 line-clamp-1">
                  {campaign.title}
                </GradientText>
                <p className="text-slate-600 mb-6 text-sm line-clamp-2">
                  {campaign.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    className={combineClasses(
                      "flex items-center justify-center gap-2 py-2",
                      "text-sky-600 hover:text-sky-700",
                      "border border-sky-200 hover:border-sky-300",
                      "bg-sky-50 hover:bg-sky-100"
                    )}
                    onClick={() => setEditingCampaign(campaign)}
                  >
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className={combineClasses(
                      "flex items-center justify-center gap-2 py-2",
                      "text-red-600 hover:text-red-700",
                      "border border-red-200 hover:border-red-300",
                      "bg-red-50 hover:bg-red-100"
                    )}
                    onClick={() => handleDelete(campaign._id)}
                  >
                    <FaTrash />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCampaigns;
