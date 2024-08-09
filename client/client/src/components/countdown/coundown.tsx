import { useEffect, useState } from 'react';

const CounDown = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, hours, days]);

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-18 flex items-center justify-center">
          {days < 10 ? `0${days}` : days}
        </div>
        <p className="text-xs mt-2 text-white">Days</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-18 flex items-center justify-center">
          {hours < 10 ? `0${hours}` : hours}
        </div>
        <p className="text-xs mt-2 text-white">Hours</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-18 flex items-center justify-center">
          {minutes < 10 ? `0${minutes}` : minutes}
        </div>
        <p className="text-xs mt-2 text-white">Minute</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-18 flex items-center justify-center">
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <p className="text-xs mt-2 text-white">Sec</p>
      </div>
    </div>
  );
};

export default CounDown;
