const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const convertToMillionNaira = val => val * 1000000 * 350;

const format = arr => {
  return arr.forEach(entry => {
    entry.budgetInMillions = `₦${numberWithCommas(
      convertToMillionNaira(entry.budgetInMillions)
    )}`;
    entry.boxOfficeRevenueInMillions = `₦${numberWithCommas(
      convertToMillionNaira(entry.boxOfficeRevenueInMillions)
    )}`;
  });
};

export default format;
