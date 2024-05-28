import {
  fetchCodesByQuery,
  fetchTaxesByCode,
  fetchRatesAllCurrency,
  token,
} from "./js/serviceApi";
import {
  makeFullCodesListMarkup,
  makeNotFullCodesListMarkup,
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
  currency: "USD",
  rate: 0,
  baseCurrency: "UAH",
};
let ratesAllCurrency;
const handleSearchValueFormSubmit = async (e) => {
  e.preventDefault();

  const query = e.target.elements.valueForSearch.value.trim();
  try {
    const data = await fetchCodesByQuery(query);
    let codesListMarkup;
    if (token) {
      codesListMarkup = makeFullCodesListMarkup(data);
      const currencyListMarkup = makeCurrencyListMarkup(currencyList);

      currencySelectEl.innerHTML = currencyListMarkup;
    } else {
      codesListMarkup = makeNotFullCodesListMarkup(data);
    }

    resultListEl.innerHTML = codesListMarkup;
  } catch (error) {
    console.log(error.message);
  }
};
const handleResultSearchFormSubmit = async (e) => {
  if (!token) return;
  const { code, normal, discounted, description } = await fetchTaxesByCode(
    e.target.value
  );
  ratesAllCurrency = await fetchRatesAllCurrency();
  data.discounted = parseFloat(discounted) / 100;
  data.normal = parseFloat(normal) / 100;
  data.rate = ratesAllCurrency.find(({ currency_code }) => {
    return currency_code === "USD";
  }).rate;
  resultTaxFormEl.elements.resultTaxInput.value = code;
  resultTaxFormEl.elements.discountTax.value = discounted;
  resultTaxFormEl.elements.normalTax.value = normal;
};
const calculateAndRenderCosts = () => {
  const value = parseFloat(invoiceInputEl.value || 0);
  const VAT_normal = (value * data.normal + value) * 0.2;
  const VAT_discounted = (value * data.discounted + value) * 0.2;
  const tollNormal = parseFloat((value * data.normal).toFixed(2));
  const tollDiscounted = parseFloat((value * data.discounted).toFixed(2));
  const totalNormal = parseFloat((tollNormal + VAT_normal).toFixed(2));
  const totalDiscounted = parseFloat(
    (tollDiscounted + VAT_discounted).toFixed(2)
  );

  totalNormalEl.innerHTML = `${totalNormal} ${data.currency}/${(
    totalNormal * data.rate
  ).toFixed(2)} ${data.baseCurrency} `;
  totalDiscountedEl.innerHTML = `${totalDiscounted} ${data.currency}/${(
    totalDiscounted * data.rate
  ).toFixed(2)} ${data.baseCurrency} `;
};
const handleInvoiceInput = (e) => {
  calculateAndRenderCosts();
};
const handleCurrencySelectChange = (e) => {
  data.currency = e.target.value;
  data.rate = ratesAllCurrency.find(({ currency_code }) => {
    return currency_code === e.target.value;
  }).rate;
  calculateAndRenderCosts();
};
const handleSearchValueFormClick = (e) => {
  if (e.target.classList.contains("copy-code")) {
    navigator.clipboard.writeText(
      e.target
        .closest(".resultsearch-codes-label")
        .querySelector(".resultsearch-codes-value").textContent
    );
  }
  if (e.target.classList.contains("copy-description")) {
    navigator.clipboard.writeText(
      e.target
        .closest(".resultsearch-description-item")
        .querySelector(".resultsearch-description-text").textContent
    );
  }
};
searchValueFormEl.addEventListener("submit", handleSearchValueFormSubmit);
resultsearchFormEl.addEventListener("change", handleResultSearchFormSubmit);
invoiceInputEl.addEventListener("input", handleInvoiceInput);
currencySelectEl.addEventListener("change", handleCurrencySelectChange);
resultsearchFormEl.addEventListener("click", handleSearchValueFormClick);
