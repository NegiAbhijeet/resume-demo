'use client';
import { useEffect, useRef, useState } from 'react';

export default function RecorderPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamsRef = useRef({ displayStream: null, micStream: null });

  async function startRecording() {
    try {
      // Ask to share a screen/tab (tab audio possible if user selects tab + enables audio)
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Mic input
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Mix mic + system (tab) audio using Web Audio API
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();

      const mixedStream = new MediaStream();

      // Add video track to mixed stream
      displayStream.getVideoTracks().forEach((track) => {
        mixedStream.addTrack(track);
      });

      // Mix audio
      const systemAudio = displayStream.getAudioTracks()[0];
      const micAudio = micStream.getAudioTracks()[0];

      if (systemAudio) {
        const sysSource = audioContext.createMediaStreamSource(new MediaStream([systemAudio]));
        sysSource.connect(destination);
      }

      if (micAudio) {
        const micSource = audioContext.createMediaStreamSource(new MediaStream([micAudio]));
        micSource.connect(destination);
      }

      destination.stream.getAudioTracks().forEach((track) => {
        mixedStream.addTrack(track);
      });

      streamsRef.current.displayStream = displayStream;
      streamsRef.current.micStream = micStream;

      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(mixedStream, {
        mimeType: 'video/webm;codecs=vp9,opus',
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);

        // Stop all tracks
        displayStream.getTracks().forEach((t) => t.stop());
        micStream.getTracks().forEach((t) => t.stop());
        audioContext.close();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Permission denied or capture failed. Try again.');
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🎥 Screen Recorder</h1>

      {!isRecording ? (
        <button onClick={startRecording} style={btnStyle}>
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} style={btnStyle}>
          ⏹️ Stop Recording
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: 30 }}>
          <h3>Preview:</h3>
          <video src={videoUrl} controls style={{ width: '100%', maxWidth: 800 }} />
          <a href={videoUrl} download="interview-recording.webm" style={{ display: 'block', marginTop: 10 }}>
            ⬇️ Download Recording
          </a>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  fontSize: '16px',
  padding: '12px 20px',
  background: '#2b6cb0',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
