export const diffInMonths = (dateFrom: number, dateTo: number) => {
  const dateFr = new Date(dateFrom);
  const dateTill = new Date(dateTo);
  return (
    dateTill.getMonth() -
    dateFr.getMonth() +
    12 * (dateTill.getFullYear() - dateFr.getFullYear())
  );
};

export const diffInDays = (dateFrom: number, dateTo: number) =>
  Math.ceil((dateTo - dateFrom) / (1000 * 3600 * 24));

export const diffInHours = (dateFrom: number, dateTo: number) =>
  Math.ceil((dateTo - dateFrom) / (1000 * 3600));
