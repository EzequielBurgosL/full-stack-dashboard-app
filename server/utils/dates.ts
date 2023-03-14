export const getTodayDayNumber = () => {
  const today = new Date();
  const yesterday = new Date(today);

  return yesterday.getDate();
};

export const getYesterdayDayNumber = () => {
  const today = new Date();

  // Get yesterday's date by subtracting 1 from today's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return yesterday.getDate();
};