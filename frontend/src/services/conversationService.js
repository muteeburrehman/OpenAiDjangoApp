// services/conversationService.js
import api, {endpoints} from './api';

export const fetchConversations = async () => {
  try {
    const response = await api.get(endpoints.codeExplain);

    // If response is directly the array, use it; otherwise, handle potential nested structure
    const conversations = Array.isArray(response) ? response :
                          response.conversations ||
                          response.data ||
                          [];

    // Transform the data to match our conversation format
    return conversations.map(item => [
      {type: 'user', content: item._input},
      {type: 'bot', content: item._output}
    ]).flat();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const sendMessage = async (input) => {
  try {
    const response = await api.post(endpoints.codeExplain, {
      _input: input
    });

    // Return the entire response or a specific part of it
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};