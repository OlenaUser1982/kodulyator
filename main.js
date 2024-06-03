import {
  fetchCodesByQuery,
  fetchTaxesByCode,
  fetchRatesAllCurrency,
  // token,
} from "./js/serviceApi.js";
import {
  makeFullCodesListMarkup,
  makeNotFullCodesListMarkup,
  makeCurrencyListMarkup,
} from "./js/serviceMarkup.js";
import currencyList from "./currency.json";
const invoiceInputEl = document.querySelector("#invoice");
const currencySelectEl = document.querySelector("#currency");
const searchValueFormEl = document.querySelector(".form-searchvalue");
const resultListEl = document.querySelector(".resultsearch-codes-list");
const resultsearchFormEl = document.querySelector(".resultsearch-form");
const resultTaxFormEl = document.querySelector(".resulttax-form");
const totalNormalEl = document.querySelector(".resulttax-full-price-value");
const totalDiscountedEl = document.querySelector(
  ".resulttax-relief-price-value"
);

const data = {
  discounted: 0,
  normal: 0,
  code: "",
  currency: "",
  rate: 0,
  baseCurrency: "UAH",
};
let ratesAllCurrency;
const handleSearchValueFormSubmit = async (e) => {
  e.preventDefault();

  const query = e.target.elements.valueForSearch.value.trim();
  try {
    const data = await fetchCodesByQuery(query);
    console.log('handleSearchValueFormSubmit', data);
    let codesListMarkup;
    // if (token) {
      codesListMarkup = makeFullCodesListMarkup(data);
      const currencyListMarkup = makeCurrencyListMarkup(currencyList);

      currencySelectEl.innerHTML = currencyListMarkup;
    // } else {
    //   codesListMarkup = makeNotFullCodesListMarkup(data);
    // }

    resultListEl.innerHTML = codesListMarkup;
  } catch (error) {
    console.log(error.message);
  }
};
const handleResultSearchFormSubmit = async (e) => {
  // if (!token) return;
  const { code, normal, discounted, description } = await fetchTaxesByCode(
    e.target.value
  );
  console.log('handleResultSearchFormSubmit', code, normal, discounted, description);
  ratesAllCurrency = await fetchRatesAllCurrency();
  data.discounted = parseFloat(discounted) / 100;
  data.normal = parseFloat(normal) / 100;
  resultTaxFormEl.elements.resultTaxInput.value = code;
  resultTaxFormEl.elements.discountTax.value = discounted;
  resultTaxFormEl.elements.normalTax.value = normal;
};

const handleInvoiceInput = (e) => {
  const value = parseFloat(e.target.value);

  const VAT_normal = (value * data.normal + value) * 0.2;
  const VAT_discounted = (value * data.discounted + value) * 0.2;
  const tollNormal = parseFloat((value * data.normal).toFixed(2));
  const tollDiscounted = parseFloat((value * data.discounted).toFixed(2));
  const totalNormal = parseFloat((tollNormal + VAT_normal).toFixed(2));
  const totalDiscounted = parseFloat(
    (tollDiscounted + VAT_discounted).toFixed(2)
  );
  console.log('handleResultSearchFormSubmit', data);
  totalNormalEl.innerHTML = `${totalNormal} ${data.currency}/${
    totalNormal * data.rate
  } ${data.baseCurrency} `;
  totalDiscountedEl.innerHTML = `${totalDiscounted} ${data.currency}/${
    totalDiscounted * data.rate
  } ${data.baseCurrency} `;
};
const handleCurrencySelectChange = (e) => {
  data.currency = e.target.value;
  data.rate = ratesAllCurrency.find(({ currency_code }) => {
    return currency_code === e.target.value;
  }).rate;

  // Create a new event
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  // Dispatch the event
  invoiceInputEl.dispatchEvent(event);
};
searchValueFormEl.addEventListener("submit", handleSearchValueFormSubmit);
resultsearchFormEl.addEventListener("change", handleResultSearchFormSubmit);
invoiceInputEl.addEventListener("input", handleInvoiceInput);
currencySelectEl.addEventListener("change", handleCurrencySelectChange);
