export const sortBy = val => {
    let prop = val;
    let order = 1;
  
    if (prop[0] === '-') {
      order = -1;
      prop = prop.substr(1);
    }
    if (prop === 'revenue') {
      prop = 'boxOfficeRevenueInMillions';
    } else if (prop === 'budget') {
      prop = 'budgetInMillions';
    } else if (prop === 'runtime') {
      prop = 'runtimeInMinutes';
    }
    return (a, b) => {
      if (a[prop] < b[prop]) {
        return -1 * order;
      }
      if (a[prop] > b[prop]) {
        return 1 * order;
      }
      return 0;
    };
  };
  
  export const a = 'b';
  