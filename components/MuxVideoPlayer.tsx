'use client';

import MuxPlayer from '@mux/mux-player-react';

export function MuxVideoPlayer({
  playbackId,
  title,
}: {
  playbackId?: string;
  title: string;
}) {
  // If no playback ID is provided, show placeholder
  if (!playbackId) {
    return (
      <div className="flex items-center justify-center" style={{ height: '600px' }}>
        <div className="text-center">
          <div className="text-gray-500 text-sm font-mono mb-2">Video Preview</div>
          <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{
        video_title: title,
      }}
      streamType="on-demand"
      autoPlay={false}
      muted={false}
      style={{
        height: '600px',
        width: '100%',
        aspectRatio: 'auto',
      }}
    />
  );
}
