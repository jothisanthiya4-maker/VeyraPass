const parsePassDate = (value) => {
  if (!value) return null;

  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);

  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getPassStatus = (pass, now = new Date()) => {
  if (!pass) return null;

  const startDate = parsePassDate(pass.startDateISO || pass.startDate);
  const expiryDate = parsePassDate(pass.expiryDateISO || pass.expiryDate);

  if (!expiryDate) return "Expired";

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  if (startDate && today < startDate) return "Upcoming";
  return today >= expiryDate ? "Expired" : "Active";
};
