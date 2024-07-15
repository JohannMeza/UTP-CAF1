export const convertMsToTime = (ms: number): string => {
  const milliseconds = Math.floor((ms % 1000) / 10),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const timeObject = {
    milisegundos: (milliseconds < 10) ? `0${milliseconds}` : milliseconds,
    hours: (hours < 10) ? `0${hours}` : hours,
    minutes: (minutes < 10) ? `0${minutes}` : minutes,
    seconds: (seconds < 10) ? `0${seconds}` : seconds,
  };

  return `${timeObject.minutes}:${timeObject.seconds}:${timeObject.milisegundos}`;
};

export const cosRad = (degrees: number): number => {
  const radians = degrees * (Math.PI / 180);
  return Math.cos(radians);
};

export const sinRad = (degrees: number): number => {
  const radians = degrees * (Math.PI / 180);
  return Math.sin(radians);
};