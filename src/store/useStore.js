// useStore.js
import { create } from 'zustand';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useStore = create((set) => ({
  userData: {},
  userProgress: [],

  setUserData: (data) => set(() => ({ userData: data })),
  setUserProgress: (progress) => set(() => ({ userProgress: progress })),

  updateVideoProgress: (videoId, newProgress) => set((state) => ({
    userProgress: state.userProgress.map((progress) =>
      progress.videoId === videoId ? { ...progress, ...newProgress } : progress
    ),
  })),

  saveProgressToBackend: async (progressData) => {
    try {
      await axios.post(`${backendUrl}/api/progress`, progressData);
    } catch (err) {
      console.error('Error updating user progress:', err.message);
    }
  },

}));

const updateUserProgress = (videoId, updates) => {
  set(state => {
    const updatedVideos = state.userProgress.map(progress => {
      if (progress.videoId === videoId) {
        return { ...progress, ...updates };
      }
      return progress;
    });
    localStorage.setItem('userProgress', JSON.stringify(updatedVideos)); // Save updated progress to localStorage
    return { userProgress: updatedVideos };
  });
};

export default useStore;
