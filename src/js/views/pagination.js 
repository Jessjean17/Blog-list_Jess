const paginate = (arr, pageNumber, limit) => {
  const pages = {};
  pages.current = pageNumber;
  pages.prev = pageNumber > 1 ? pageNumber - 1 : null;
  pages.hasPrev = pages.prev !== null;
  pages.total = Math.ceil(arr.length / limit);
  pages.next = pageNumber >= pages.total ? null : pageNumber + 1;
  pages.hasNext = pages.next !== null;
  //arrays are zero based;

  pageNumber -= 1;
  const items = {};
  items.begin = limit * pageNumber + 1;
  items.end = (pageNumber + 1) * limit;
  items.total = arr.length;

  const data = {
    docs: arr.slice(items.begin - 1, items.end),
    pages,
    items
  };

  if (items.end > items.total) {
    items.end = items.total;
  }
  if (items.begin > items.total) {
    items.begin = items.total;
  }
  return data;
};

export default paginate;
