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

export default useStore;
