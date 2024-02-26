import { fetchCodesByQuery, fetchTaxesByCode } from "./js/serviceApi";
import {
  makeCodesListMarkup,
  makeCurrencyListMarkup,
} from "./js/serviceMarkup";
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

const handleSearchValueFormSubmit = async (e) => {
  e.preventDefault();

  const query = e.target.elements.valueForSearch.value.trim();
  try {
    const data = await fetchCodesByQuery(query);

    const codesListMarkup = makeCodesListMarkup(data);
    const currencyListMarkup = makeCurrencyListMarkup(currencyList);
    resultListEl.innerHTML = codesListMarkup;
    currencySelectEl.innerHTML = currencyListMarkup;
  } catch (error) {
    console.log(error.message);
  }
};
const handleResultSearchFormSubmit = async (e) => {
  const { code, normal, discounted, description } = await fetchTaxesByCode(
    e.target.value
  );
  data.discounted = discounted / 100;
  data.normal = normal / 100;
  resultTaxFormEl.elements.resultTaxInput.value = code;
  resultTaxFormEl.elements.discountTax.value = discounted;
  resultTaxFormEl.elements.normalTax.value = normal;
};

const handleInvoiceInput = (e) => {
  console.log(data);
  const value = e.target.value;
  const VAT_normal = (value * data.normal + value) * 0.2;
  const VAT_discounted = (value * data.discounted + value) * 0.2;
  const tollNormal = value * data.normal;
  const tollDiscounted = value * data.discounted;
  const totalNormal = tollNormal + VAT_normal;
  const totalDiscounted = tollDiscounted + VAT_discounted;
  totalNormalEl.innerHTML = `${totalNormal} ${data.currency}/${
    totalNormal * data.rate
  } ${data.baseCurrency} `;
  totalDiscountedEl.innerHTML = `${totalDiscounted} ${data.currency}/${
    totalDiscounted * data.rate
  } ${data.baseCurrency} `;
};
const handleCurrencySelectChange = (e) => {
  data.currency = e.target.value;
  data.rate = e.target.dataset.rate;
};
searchValueFormEl.addEventListener("submit", handleSearchValueFormSubmit);
resultsearchFormEl.addEventListener("change", handleResultSearchFormSubmit);
invoiceInputEl.addEventListener("input", handleInvoiceInput);
currencySelectEl.addEventListener("change", handleCurrencySelectChange);
