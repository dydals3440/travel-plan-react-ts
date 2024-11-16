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
