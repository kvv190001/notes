import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const notesApi = {
  // Get all notes
  getAllNotes: () => api.get('/notes'),
  
  // Get note by ID
  getNoteById: (id) => api.get(`/notes/${id}`),
  
  // Create new note
  createNote: (note) => api.post('/notes', note),
  
  // Update note (you may want to add PUT endpoint to backend)
  // updateNote: (id, note) => api.put(`/notes/${id}`, note),
  
  // Delete note (you may want to add DELETE endpoint to backend)
  // deleteNote: (id) => api.delete(`/notes/${id}`)
};
