import { useState } from 'react';
import { Card, Button, GradientText } from './common';
import { themeColors, combineClasses } from './theme';
import { FaEnvelope, FaUser, FaPaperPlane, FaCheck, FaComment, FaClock } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error sending message:', response.statusText);
        alert('Error sending message');
      }
    } catch (err) {
      console.error('Network or Server error:', err);
      alert('Network or Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={combineClasses(
      "min-h-screen py-12 px-4",
      themeColors.bgGradient.light,
      themeColors.animation.fadeIn
    )}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <GradientText as="h2" className="text-4xl font-bold mb-4">
            Get in Touch
          </GradientText>
          <p className={combineClasses(
            "text-slate-600 max-w-xl mx-auto",
            "text-lg leading-relaxed"
          )}>
            Have questions about our initiatives or want to learn more about how you can help? 
            We'd love to hear from you.
          </p>
        </div>

        <Card className={combineClasses(
          "p-8",
          themeColors.animation.slideUp,
          themeColors.card.base,
          themeColors.card.hover
        )}>
          {isSubmitted ? (
            <div className={combineClasses(
              "p-8 text-center",
              themeColors.animation.slideUp
            )}>
              <div className={combineClasses(
                "w-16 h-16 mx-auto mb-6 rounded-full",
                "flex items-center justify-center",
                themeColors.bgGradient.accent
              )}>
                <FaCheck className="w-8 h-8 text-white" />
              </div>
              <GradientText as="h3" className="text-2xl font-bold mb-4">
                Message Sent!
              </GradientText>
              <p className="text-slate-600">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={combineClasses(
                        themeColors.input.base,
                        themeColors.input.focus,
                        "pl-10"
                      )}
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={combineClasses(
                        themeColors.input.base,
                        themeColors.input.focus,
                        "pl-10"
                      )}
                      placeholder="Enter your email address"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={combineClasses(
                      themeColors.input.base,
                      themeColors.input.focus,
                      "pl-10 min-h-[120px] resize-none"
                    )}
                    placeholder="What would you like to tell us?"
                    required
                  ></textarea>
                  <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                    <FaComment className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  variant="gradient"
                  loading={isSubmitting}
                >
                  <span>Send Message</span>
                  <FaPaperPlane className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="mt-8 text-center">
          <p className="text-slate-600 flex items-center justify-center gap-2">
            <FaClock className="h-4 w-4" />
            <span>We typically respond within 24-48 hours</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
