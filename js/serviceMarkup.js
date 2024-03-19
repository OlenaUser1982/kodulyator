export const makeFullCodesListMarkup = (object) => {
  return Object.keys(object)
    .map((propCode) => {
      const { code, descriptions } = object[propCode];

      return `<li class="resultsearch-codes-item">
                    <label class="resultsearch-codes-label" for=${code}
                      ><input
                        class="resultsearch-codes-input"
                        name="codeUCTZED"
                        id=${code}
                          value=${code}
                        type="radio"
                      />Код УКТЗЕД:
                      <span class="resultsearch-codes-value">${code}</span>
                    </label>
                    <ul class="resultsearch-description-list">
                    ${descriptions
                      .map((item) => {
                        return `    <li class="resultsearch-description-item">
                        <p class="resultsearch-description-text">
                          ${item}
                        </p>
                      </li>`;
                      })
                      .join("")}
                     
                     
                    </ul>
                  </li>`;
    })
    .join("");
};
export const makeNotFullCodesListMarkup = (array) => {
  return array
    .map(({ code, description }) => {
      return `<li class="resultsearch-codes-item">
                    <label class="resultsearch-codes-label" for=${code}
                      ><input
                        class="resultsearch-codes-input"
                        name="codeUCTZED"
                        id=${code}
                          value=${code}
                        type="radio"
                      />Код УКТЗЕД:
                      <span class="resultsearch-codes-value">${code}</span>
                    </label>
                        <p class="resultsearch-description-text">
                          ${description}
                        </p>
                      </li>`;
    })
    .join("");
};

export const makeCurrencyListMarkup = (array) => {
  return array
    .map(({ cc, txt, rate }) => {
      return `<option class="resulttax-option" data-rate=${rate} value=${cc}>${cc} - ${txt}</option>`;
    })
    .join("");
};
