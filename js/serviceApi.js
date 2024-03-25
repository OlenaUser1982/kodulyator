import axios from "axios";
const baseURL = "https://api.iloc.com.ua";
// export const token = "";

export const token = (function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const authorizedParam = urlSearchParams.get("authorized");

  if (authorizedParam && authorizedParam.toLowerCase() === 'true') {
    console.log('Authorized!');
    return "11|Tf6MRFVmUVfg4uh3fkvygPmMPqw13XqrzLHvv1fw53c3e40b";
  } else {
    console.log('Not Authorized!');
    return '';
  }
})();

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export const fetchCodesByQuery = async (query) => {
  const { data } = await axios(`${baseURL}/codes?query=${query}`);

  return data;
};
export const fetchTaxesByCode = async (code) => {
  const { data } = await axios(`${baseURL}/codes/${code}/taxes`);
  return data[0];
};

export const fetchRatesAllCurrency = async () => {
  const { data } = await axios(`${baseURL}/rates`);
  return data;
};
