export const transformTimeToMinutes = (time: string) => {
  return parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3)) * 1;
};

export const parseTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  return {
    hours,
    minutes: remainMinutes,
  };
};

export const printTime = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  return `${hours}시간 ${minutes}분`;
};

export const getTotalTime = (
  times: { startTime: string; endTime: string }[]
) => {
  return times.reduce((acc, dailyTime) => {
    const dailyTotalTime =
      transformTimeToMinutes(dailyTime.endTime) -
      transformTimeToMinutes(dailyTime.startTime);
    return acc + dailyTotalTime;
  }, 0);
};
