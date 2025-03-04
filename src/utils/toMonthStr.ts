

export default function toMonthStr(monthNumber :number) {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Month numbers are 1-based, Date is 0-based
  return date.toLocaleString('default', { month: 'long' });
}
