import Vue from 'vue';

const formatPhone = (val) => {
  if (!val) return '';

  return (val + '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
};

Vue.filter('formatPhone', formatPhone);
