'use client';

import { useState } from 'react';

export default function Home() {
  const initialFormData = {
    name: '',
    rollNumber: '',
    department: '',
    year: '',
    gender: '',
    contactNumber: '',
    email: '',
    eventType: '',
    eventCategory: '',
    eventDate: '',
    timeSlot: '',
    facultyMentor: '',
    teamName: '',
    volunteerInterest: '',
    feedbackCollegeSupport: '',
    overallEventRating: '',
    suggestionsImprovement: '',
    participationExperience: '',
    previousEventExperience: '',
    preferredCommunication: '',
    emergencyContact: '',
    campusLocation: '',
    remarksByCommittee: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show toast notification
        setShowToast(true);
        // Clear form fields
        setFormData(initialFormData);
        // Reset form element
        e.target.reset();
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Registration failed!' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[300px]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Registration Successful!</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Event Registration Form
          </h1>
          <p className="text-gray-600 text-lg">Fill in your details to participate in the event</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {submitStatus && submitStatus.type === 'error' && (
            <div className={`p-4 rounded-lg bg-red-100 text-red-800`}>
              {submitStatus.message}
            </div>
          )}

          {/* Field 1: Name */}
          <div>
            <label htmlFor="name" className="form-label">Name of Participant *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Field 2: Roll Number */}
          <div>
            <label htmlFor="rollNumber" className="form-label">Roll Number / ID *</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              required
              value={formData.rollNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your roll number"
            />
          </div>

          {/* Field 3: Department */}
          <div>
            <label htmlFor="department" className="form-label">Department *</label>
            <select
              id="department"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="CS">CS</option>
              <option value="Mech">Mech</option>
              <option value="Civil">Civil</option>
              <option value="E&TC">E&TC</option>
              <option value="Electrical">Electrical</option>
              <option value="MBA">MBA</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Field 4: Year */}
          <div>
            <label htmlFor="year" className="form-label">Year / Class *</label>
            <select
              id="year"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Year</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>

          {/* Field 5: Gender */}
          <div>
            <label className="form-label">Gender *</label>
            <div className="flex flex-wrap gap-4">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    required
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 6: Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="form-label">Contact Number *</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Field 7: Email */}
          <div>
            <label htmlFor="email" className="form-label">Email ID *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email address"
            />
          </div>

          {/* Field 8: Event Type */}
          <div>
            <label className="form-label">Event Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Dance', 'Singing', 'Drama', 'Art', 'Photography', 'Debate', 'Other'].map((event) => (
                <label key={event} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eventType"
                    value={event}
                    required
                    checked={formData.eventType === event}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{event}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 9: Event Category */}
          <div>
            <label className="form-label">Event Category *</label>
            <div className="flex flex-wrap gap-4">
              {['Solo', 'Group'].map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eventCategory"
                    value={category}
                    required
                    checked={formData.eventCategory === category}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 10: Event Date */}
          <div>
            <label htmlFor="eventDate" className="form-label">Event Date *</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              required
              value={formData.eventDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Field 11: Time Slot */}
          <div>
            <label htmlFor="timeSlot" className="form-label">Time Slot *</label>
            <input
              type="time"
              id="timeSlot"
              name="timeSlot"
              required
              value={formData.timeSlot}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Field 12: Faculty Mentor */}
          <div>
            <label htmlFor="facultyMentor" className="form-label">Faculty Mentor *</label>
            <input
              type="text"
              id="facultyMentor"
              name="facultyMentor"
              required
              value={formData.facultyMentor}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter faculty mentor name"
            />
          </div>

          {/* Field 13: Team Name */}
          <div>
            <label htmlFor="teamName" className="form-label">Team Name (if group)</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter team name (optional)"
            />
          </div>

          {/* Field 14: Volunteer Interest */}
          <div>
            <label className="form-label">Volunteer Interest *</label>
            <div className="flex flex-wrap gap-4">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="volunteerInterest"
                    value={option}
                    required
                    checked={formData.volunteerInterest === option}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 15: Feedback on College Support */}
          <div>
            <label className="form-label">Feedback on College Support (1-5) *</label>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feedbackCollegeSupport"
                    value={rating.toString()}
                    required
                    checked={formData.feedbackCollegeSupport === rating.toString()}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 16: Overall Event Rating */}
          <div>
            <label className="form-label">Overall Event Rating (1-5) *</label>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="overallEventRating"
                    value={rating.toString()}
                    required
                    checked={formData.overallEventRating === rating.toString()}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 17: Suggestions for Improvement */}
          <div>
            <label htmlFor="suggestionsImprovement" className="form-label">Suggestions for Improvement *</label>
            <textarea
              id="suggestionsImprovement"
              name="suggestionsImprovement"
              required
              value={formData.suggestionsImprovement}
              onChange={handleChange}
              rows="4"
              className="form-input"
              placeholder="Share your suggestions..."
            />
          </div>

          {/* Field 18: Participation Experience */}
          <div>
            <label htmlFor="participationExperience" className="form-label">Participation Experience *</label>
            <textarea
              id="participationExperience"
              name="participationExperience"
              required
              value={formData.participationExperience}
              onChange={handleChange}
              rows="4"
              className="form-input"
              placeholder="Describe your participation experience..."
            />
          </div>

          {/* Field 19: Previous Event Experience */}
          <div>
            <label className="form-label">Previous Event Experience *</label>
            <div className="flex flex-wrap gap-4">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="previousEventExperience"
                    value={option}
                    required
                    checked={formData.previousEventExperience === option}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 20: Preferred Communication Method */}
          <div>
            <label htmlFor="preferredCommunication" className="form-label">Preferred Communication Method *</label>
            <select
              id="preferredCommunication"
              name="preferredCommunication"
              required
              value={formData.preferredCommunication}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Method</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone Call">Phone Call</option>
            </select>
          </div>

          {/* Field 21: Emergency Contact */}
          <div>
            <label htmlFor="emergencyContact" className="form-label">Emergency Contact Number *</label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              required
              value={formData.emergencyContact}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter emergency contact number"
            />
          </div>

          {/* Field 22: Campus Location */}
          <div>
            <label htmlFor="campusLocation" className="form-label">Campus Location / Hostel *</label>
            <select
              id="campusLocation"
              name="campusLocation"
              required
              value={formData.campusLocation}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Location</option>
              <option value="Main Campus">Main Campus</option>
              <option value="Hostel A">Hostel A</option>
              <option value="Hostel B">Hostel B</option>
              <option value="Hostel C">Hostel C</option>
              <option value="Day Scholar">Day Scholar</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Field 23: Remarks by Committee */}
          <div>
            <label htmlFor="remarksByCommittee" className="form-label">Remarks by Committee</label>
            <input
              type="text"
              id="remarksByCommittee"
              name="remarksByCommittee"
              value={formData.remarksByCommittee}
              onChange={handleChange}
              className="form-input"
              placeholder="Remarks (to be filled later)"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
