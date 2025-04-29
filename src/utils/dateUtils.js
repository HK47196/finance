export const getCurrentMonthYear = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getPreviousMonths = (count) => {
  const months = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  for (let i = 0; i < count; i++) {
    const monthString = `${year}-${String(month + 1).padStart(2, '0')}`;
    months.push(monthString);

    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  }
  return months.reverse();
};

export const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
        return '$0.00';
    }
    return `${amount < 0 ? '-' : ''}$${Math.abs(amount).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
