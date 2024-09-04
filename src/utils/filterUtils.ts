export const filterData = (data: any[], searchText: string, key: string) => {
  return data.filter((item) =>
    item[key].toLowerCase().includes(searchText.toLowerCase()),
  );
};
