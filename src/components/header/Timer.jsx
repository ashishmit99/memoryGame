import React from 'react';

 {/* Timer component for displaying time elapsed when game gets started */}
 //Format time
const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
} 

const Timer = ({ time = 0 }) => <p className="timer">Elaspsed Time :{formatTime(time)}</p>
export default Timer;