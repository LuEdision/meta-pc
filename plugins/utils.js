export const getHomeTitle = (country, tpl) => {
  const titleMap = {
    mexico:
      'Préstamos instantáneos y rápidos en cualquier momento en cualquier lugar',
    nigeria: `Fast and Reliable Loan in ${country}`,
    uganda: 'Fast and Reliable Loan in Republic of Republic of Uganda',
  };
  return titleMap[tpl] || 'Fast and Reliable Loan';
};
