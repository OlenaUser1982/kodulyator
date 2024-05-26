import axios from "axios";
const baseURL = "https://api.iloc.com.ua";
// export const token = "";

// export const token = (function () {
//   const urlSearchParams = new URLSearchParams(window.location.search);
//   const authorizedParam = urlSearchParams.get("authorized");
//
//   if (authorizedParam && authorizedParam.toLowerCase() === 'true') {
//     console.log('Authorized!');
//     return "11|Tf6MRFVmUVfg4uh3fkvygPmMPqw13XqrzLHvv1fw53c3e40b";
//   } else {
//     console.log('Not Authorized!');
//     return '';
//   }
// })();

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const fetchCodesByQuery = async (query) => {
  const params = new URLSearchParams();
  params.append('query', query);
  params.append('action', 'kodulyator_ajax_codes_action');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axios.post(kodulyator_ajax_object.ajax_url ? kodulyator_ajax_object.ajax_url : baseURL, params, config);
  return response.data;
};

export const fetchTaxesByCode = async (code) => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('action', 'kodulyator_ajax_taxes_action');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axios.post(kodulyator_ajax_object.ajax_url ? kodulyator_ajax_object.ajax_url : baseURL, params, config);
  return response.data[0];
};

export const fetchRatesAllCurrency = async () => {
  const { data } = await axios(`${baseURL}/rates`);
  return data;
};
