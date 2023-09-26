export const useCountdown = (time, onComplete) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime === 0 && onComplete) {
      onComplete();
    }
  }, [remainingTime]);

  return remainingTime;
};
