import React from 'react';
import { cn, designSystem } from '../../lib/design-system';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
  showControls = true,
  autoPlay = false,
  muted = true,
}) => {
  return (
    <video
      src={src}
      poster={poster}
      controls={showControls}
      autoPlay={autoPlay}
      muted={muted}
      className={cn('w-full h-full object-cover rounded-lg', className)}
      style={{ maxHeight: '400px' }}
    >
      Your browser does not support the video tag.
    </video>
  );
};

