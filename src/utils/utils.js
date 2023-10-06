export const checkAvailability = (item1, item2) => {
  return item1.some((elem) => {
    return elem.id == item2?.id;
  });
};
