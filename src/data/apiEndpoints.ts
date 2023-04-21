export const apiEndpoints = {
  cities: "/cities",
  searchCities: (name: string) => `/cities/search?name=${name}`,
};
