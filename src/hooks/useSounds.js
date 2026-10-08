import { useEffect, useRef, useState, useCallback } from 'react';

const SOUND_PATHS = {
  move: require('../../assets/sounds/move.wav'),
  capture: require('../../assets/sounds/capture.wav'),
  check: require('../../assets/sounds/check.wav'),
  win: require('../../assets/sounds/win.wav'),
  lose: require('../../assets/sounds/lose.wav'),
};

// Try to import expo-av. Wrapping in try/catch + IIFE ensures any synchronous
// error (e.g. missing native module) never crashes the app — sounds degrade gracefully.
let Audio = null;
(() => {
  try {
    const av = require('expo-av');
    if (av && av.Audio && av.Audio.Sound) {
      Audio = av.Audio;
    }
  } catch {
    // expo-av not available in this runtime
  }
})();

export function useSounds() {
  const [muted, setMuted] = useState(false);
  const soundsRef = useRef({});
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    if (!Audio) return;

    let mounted = true;

    async function loadSounds() {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const loaded = {};
        for (const key of Object.keys(SOUND_PATHS)) {
          try {
            const { sound } = await Audio.Sound.createAsync(SOUND_PATHS[key]);
            loaded[key] = sound;
          } catch {
            // individual sound failed — skip silently
          }
        }
        if (mounted) soundsRef.current = loaded;
      } catch {
        // audio system unavailable — all sounds silently skipped
      }
    }

    loadSounds();

    return () => {
      mounted = false;
      Object.values(soundsRef.current).forEach((s) => {
        try { s.unloadAsync(); } catch {}
      });
    };
  }, []);

  const play = useCallback(async (name) => {
    if (mutedRef.current) return;
    const sound = soundsRef.current[name];
    if (!sound) return;
    try {
      await sound.replayAsync();
    } catch {
      // ignore playback errors
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  return { play, muted, toggleMute };
}
