
import React from 'react';

interface VideoPlayerProps {
  wistiaId: string;
  onTimeUpdate?: (time: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ wistiaId, onTimeUpdate }) => {
  React.useEffect(() => {
    // Load Wistia script
    const script = document.createElement('script');
    script.src = '//fast.wistia.com/assets/external/E-v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    const handleTimeUpdate = (video: any) => {
      if (onTimeUpdate) {
        onTimeUpdate(video.time());
      }
    };

    // Initialize Wistia player
    if (window._wq) {
      window._wq = window._wq || [];
      window._wq.push({
        id: wistiaId,
        onReady: (video: any) => {
          video.bind('timechange', () => handleTimeUpdate(video));
        },
      });
    }
  }, [wistiaId, onTimeUpdate]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      <div className={`wistia_responsive_padding`} style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <div className={`wistia_responsive_wrapper`} style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
          <div className={`wistia_embed wistia_async_${wistiaId} videoFoam=true`} style={{ height: '100%', position: 'relative', width: '100%' }}>
            <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
              <img src={`https://fast.wistia.com/embed/medias/${wistiaId}/swatch`} style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
