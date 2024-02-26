import axios from "axios";
export const fetchCodesByQuery = async (query) => {
  const { data } = await axios(
    `https://6decfe01-c3be-45d9-8a89-b8a5b477e105.mock.pstmn.io/codes?query=${query}`
  );
  console.log(data);
  return data;
};
export const fetchTaxesByCode = async (code) => {
  const { data } = await axios(
    `https://6decfe01-c3be-45d9-8a89-b8a5b477e105.mock.pstmn.io/codes/${code}/taxes`
  );
  return data[0];
};
