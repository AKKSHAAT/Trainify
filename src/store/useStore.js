import { create } from 'zustand';

const useStore = create((set) => ({
  userData: {},
  userProgress: [],

  // Action to set user data
  setUserData: (data) => set(() => ({ userData: data })),

  // Action to set user progress
  setUserProgress: (progress) => set(() => ({ userProgress: progress })),

  // Action to update a specific video's progress
  updateVideoProgress: (videoId, newProgress) => set((state) => ({
    userProgress: state.userProgress.map((progress) =>
      progress.videoId === videoId ? { ...progress, ...newProgress } : progress
    ),
  })),
}));

export default useStore;
