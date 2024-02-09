import { fetchCodesByQuery, fetchTaxesByCode } from "./js/serviceApi";
import { makeCodesListMarkup } from "./js/serviceMarkup";

const searchValueFormEl = document.querySelector(".form-searchvalue");
const resultListEl = document.querySelector(".resultsearch-codes-list");
const resultsearchFormEl = document.querySelector(".resultsearch-form");
const resultTaxFormEl = document.querySelector(".resulttax-form");
const handleSearchValueFormSubmit = async (e) => {
  e.preventDefault();

  const query = e.target.elements.valueForSearch.value.trim();
  try {
    const data = await fetchCodesByQuery(query);

    const codesListMarkup = makeCodesListMarkup(data);

    resultListEl.innerHTML = codesListMarkup;
  } catch (error) {
    console.log(error.message);
  }
};
const handleResultSearchFormSubmit = async (e) => {
  const { code, preferable, normal, discounted, description } =
    await fetchTaxesByCode(e.target.value);
  resultTaxFormEl.elements.resultTaxInput.value = code;
};
searchValueFormEl.addEventListener("submit", handleSearchValueFormSubmit);
resultsearchFormEl.addEventListener("change", handleResultSearchFormSubmit);
