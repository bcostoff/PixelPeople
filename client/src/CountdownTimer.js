import React from 'react';
import { useCountdown } from './hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';


const ExpiredNotice = () => {
    return (
        <span>Expired!!!</span>
    );
};

  
const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <span className="clock">
            <DateTimeDisplay value={hours} />:<DateTimeDisplay value={minutes} />:<DateTimeDisplay value={seconds} />
        </span>
    );
};
  

const CountdownTimer = ({ targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  if (hours + minutes + seconds < 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;