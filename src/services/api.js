const API_URL = 'http://localhost:5000/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
};

// Polls API
// Users API
export const usersAPI = {
  // Create a new user
  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
};

// Polls API
export const pollsAPI = {
  // Get all polls
  getPolls: async () => {
    const response = await fetch(`${API_URL}/polls`);
    return handleResponse(response);
  },

  // Create a new poll
  createPoll: async (question, options) => {
    const response = await fetch(`${API_URL}/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, options }),
    });
    return handleResponse(response);
  },

  // Vote on a poll
  vote: async (pollId, optionId) => {
    const response = await fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ optionId }),
    });
    return handleResponse(response);
  },

  // Get poll results
  getResults: async (pollId) => {
    const response = await fetch(`${API_URL}/polls/${pollId}/results`);
    return handleResponse(response);
  }
};

export default {
  users: usersAPI,
  polls: pollsAPI,
};
