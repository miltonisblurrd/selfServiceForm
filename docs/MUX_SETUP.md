# Mux Video Setup Guide

## How to Add Videos to Your Form

### 1. Create a Mux Account
- Go to https://dashboard.mux.com/signup
- Sign up for a free account (no credit card required)

### 2. Upload Your Videos
- In the Mux dashboard, go to "Assets"
- Click "Upload" and select your video files
- Wait for encoding to complete (usually under 2 minutes)

### 3. Get Playback IDs
- Once encoded, each video will have a **Playback ID**
- Example: `DS00Spx1CV902MCtPj5WknGlR102V5HFkDe`
- Copy the playback ID for each video

### 4. Add Playback IDs to Your App
- Open `config/mux-videos.ts`
- Paste your playback IDs:

```typescript
export const muxVideos = {
  step1: {
    playbackId: 'YOUR_PLAYBACK_ID_HERE', // Service Selection video
    title: 'Pick the Services',
  },
  step2: {
    playbackId: 'YOUR_PLAYBACK_ID_HERE', // Package Selection video
    title: 'Choose Your Package',
  },
  step3: {
    playbackId: 'YOUR_PLAYBACK_ID_HERE', // Contract Generation video
    title: 'Generate Contract',
  },
};
```

### 5. Deploy
- Commit your changes: `git add . && git commit -m "Add Mux video IDs" && git push`
- Webflow Cloud will automatically rebuild and deploy

## Video Recommendations
- **Duration**: 30-60 seconds per step
- **Resolution**: 1080p (1920x1080) recommended
- **Format**: Any (Mux handles conversion)
- **File size**: No strict limits, but keep under 500MB for fast uploads

## Costs (from Mux pricing)
- **Upload**: Free
- **Storage**: ~$0.05/GB/month
- **Streaming**: ~$0.01 per GB delivered
- **Monthly credit**: $20 free credit

Example: A 60-second 1080p video costs about $0.015/month to store.
