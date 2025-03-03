
import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  wistiaId: string;
  onTimeUpdate?: (time: number) => void;
}

// Add type definition for _wq
declare global {
  interface Window {
    _wq: any[];
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ wistiaId, onTimeUpdate }) => {
  const hasInitialized = useRef(false);
  const currentWistiaId = useRef(wistiaId);
  
  // Effect to load Wistia script
  useEffect(() => {
    // Only load the script once
    if (!document.querySelector('script[src*="//fast.wistia.com/assets/external/E-v1.js"]')) {
      const script = document.createElement('script');
      script.src = '//fast.wistia.com/assets/external/E-v1.js';
      script.async = true;
      document.body.appendChild(script);
      console.log('Wistia script loaded');
    }
    
    // No need to remove the script on cleanup as it should persist
  }, []);

  // Effect to initialize and update the player
  useEffect(() => {
    console.log('VideoPlayer useEffect with wistiaId:', wistiaId);
    console.log('Current wistiaId ref:', currentWistiaId.current);
    
    // Check if the Wistia ID has changed
    if (currentWistiaId.current !== wistiaId) {
      console.log('Wistia ID changed from', currentWistiaId.current, 'to', wistiaId);
      
      // Force a refresh by cleaning up any existing elements
      const containers = document.querySelectorAll(`.wistia_embed.wistia_async_${currentWistiaId.current}`);
      containers.forEach(container => {
        console.log('Clearing container for previous ID:', currentWistiaId.current);
        const parent = container.parentElement;
        if (parent) parent.innerHTML = '';
      });
      
      currentWistiaId.current = wistiaId;
      hasInitialized.current = false;
    }
    
    const handleTimeUpdate = (video: any) => {
      if (onTimeUpdate) {
        onTimeUpdate(video.time());
      }
    };

    // Initialize Wistia player
    if (!hasInitialized.current) {
      console.log('Initializing Wistia player for ID:', wistiaId);
      
      // Reset any previous _wq references to this video
      if (window._wq) {
        const newWq = [];
        for (const item of window._wq) {
          if (!item.id || item.id !== wistiaId) {
            newWq.push(item);
          }
        }
        window._wq = newWq;
      }
      
      window._wq = window._wq || [];
      window._wq.push({
        id: wistiaId,
        onReady: (video: any) => {
          console.log('Wistia video ready for ID:', wistiaId);
          if (onTimeUpdate) {
            video.bind('timechange', () => handleTimeUpdate(video));
          }
          hasInitialized.current = true;
        },
      });
      
      // Force Wistia to re-scan for new embeds
      if (window.Wistia && typeof window.Wistia.embeds === 'function') {
        console.log('Forcing Wistia to re-scan the page');
        window.Wistia.embeds();
      }
      
      // Create a new container element for the video
      // This helps force Wistia to recognize the new video ID
      setTimeout(() => {
        const container = document.querySelector(`.wistia_embed.wistia_async_${wistiaId}`);
        if (container) {
          console.log('Container found for ID:', wistiaId);
          if (!container.innerHTML.trim()) {
            console.log('Reinitializing empty Wistia container for ID:', wistiaId);
            // This will trigger Wistia to re-initialize
            const parent = container.parentElement;
            if (parent) {
              const currentHTML = parent.innerHTML;
              parent.innerHTML = currentHTML;
            }
          }
        } else {
          console.log('No container found for ID:', wistiaId);
        }
      }, 100);
    }
  }, [wistiaId, onTimeUpdate]);

  return (
    <div className="w-full aspect-video">
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
