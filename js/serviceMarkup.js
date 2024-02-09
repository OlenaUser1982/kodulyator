export const makeCodesListMarkup = (array) => {
  return array
    .map(({ code, descriptions }) => {
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
