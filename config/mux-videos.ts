// Mux Video Configuration
// Add your Mux playback IDs here after uploading videos to Mux

export const muxVideos = {
  step1: {
    playbackId: '', // Add your Mux playback ID for Step 1 (Service Selection)
    title: 'Pick the Services',
  },
  step2: {
    playbackId: '', // Add your Mux playback ID for Step 2 (Package Selection)
    title: 'Choose Your Package',
  },
  step3: {
    playbackId: '', // Add your Mux playback ID for Step 3 (Contract Generation)
    title: 'Generate Contract',
  },
};

// HOW TO GET MUX PLAYBACK IDs:
// 1. Sign up at https://dashboard.mux.com/signup
// 2. Upload your videos in the Mux dashboard
// 3. Once uploaded, each video will have a "Playback ID"
// 4. Copy the playback ID and paste it above
// 5. Example playback ID format: "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
