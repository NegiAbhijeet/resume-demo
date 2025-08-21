import React from 'react'

const recorder = () => {
  return (
    <button onClick={() => window.open('/recorder', '_blank', 'width=800,height=600')}>
      Start Recording
    </button>
  )
}

export default recorder


// add this in new page
import dynamic from 'next/dynamic';

// Dynamically import the component to avoid SSR issues
const ScreenRecorder = dynamic(() => import('@/components/recorder'), {
  ssr: false,
});