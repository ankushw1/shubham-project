'use client';

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const timestamp = new Date().getTime(); // Force fresh request
        const response = await fetch(`/api/get-registrations?t=${timestamp}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        const data = await response.json();
        if (isMounted) {
          if (response.ok) {
            setRegistrations(data);
          } else {
            setError(data.error || 'Failed to fetch registrations');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Network error. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRegistrations();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete registration for "${name}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/delete-registration?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        // Remove deleted registration from local state
        setRegistrations(registrations.filter(reg => reg._id !== id));
      } else {
        setError(data.error || 'Failed to delete registration');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-600">All Event Registrations</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {registrations.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg">No registrations found.</p>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-primary-600 to-primary-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Roll No</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Event Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Event Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Time Slot</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Faculty Mentor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Team Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Volunteer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">College Support</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Event Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Suggestions</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Experience</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Prev Experience</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Comm Method</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Emergency Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Campus Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Remarks</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Created At</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((reg, index) => (
                    <tr key={reg._id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{reg.name || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.rollNumber || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.department || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.year || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 break-words max-w-xs">{reg.email || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.contactNumber || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.eventType || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.eventCategory || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.gender || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.eventDate || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.timeSlot || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.facultyMentor || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.teamName || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.volunteerInterest || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.feedbackCollegeSupport || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.overallEventRating || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">{reg.suggestionsImprovement || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">{reg.participationExperience || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.previousEventExperience || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.preferredCommunication || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.emergencyContact || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{reg.campusLocation || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">{reg.remarksByCommittee || '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {reg.createdAt ? new Date(reg.createdAt).toLocaleString() : '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(reg._id, reg.name)}
                          disabled={deletingId === reg._id}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                        >
                          {deletingId === reg._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-gray-600">
          <p>Total Registrations: <span className="font-semibold text-primary-600">{registrations.length}</span></p>
        </div>
      </div>
    </div>
  );
}
