const productListContainer = document.querySelector("[data-product-template]");
const cardContainer = document.querySelector("[data-card-container]");
const searchEl = document.querySelector("[data-search]");

function onClickList() {
  cardContainer.classList.remove("grid-view", "grid-flex-view");
  cardContainer.classList.add("list-view");
}

function onClickGrid() {
  cardContainer.classList.remove("list-view");
  cardContainer.classList.add("grid-view", "grid-flex-view");
}

let details = [];

searchEl.addEventListener("input", (event) => {
  console.log(event.target.value);
  details.forEach((eachItem) => {
    eachItem.element.forEach((eachValue) => {
      if (event.target.value === "" || event.target.value === "/") {
        eachValue.classList.remove("selected-element");
      } else if (
        eachValue.textContent
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        eachValue.classList.add("selected-element");
      } else {
        eachValue.classList.remove("selected-element");
      }
    });
  });
});

function camelCaseConversion(dataList) {
  const { data } = dataList;

  const newValue = data.map((eachItem) => {
    return {
      productBadge: eachItem.product_badge,
      productImage: eachItem.product_image,
      productTitle: eachItem.product_title,
      productVariants: eachItem.product_variants,
    };
  });

  return newValue;
}

async function getDetails() {
  const response = await fetch(
    "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
  );
  const data = await response.json();

  const convertedData = camelCaseConversion(data);
  convertedData.forEach((element) => {
    const card = productListContainer.content.cloneNode(true).children[0];

    const badgeInfo = card.querySelector("[data-info-tag]");
    const headingEl = card.querySelector("[data-heading]");
    const additionalPara1 = card.querySelector("[data-additional-info-1]");
    const additionalPara2 = card.querySelector("[data-additional-info-2]");
    const additionalPara3 = card.querySelector("[data-additional-info-3]");
    badgeInfo.textContent = element.productBadge;
    headingEl.textContent = element.productTitle;
    additionalPara1.textContent = element.productVariants[0].v1;
    additionalPara2.textContent = element.productVariants[1].v2;
    additionalPara3.textContent = element.productVariants[2].v3;
    console.log(badgeInfo);
    cardContainer.appendChild(card);
    const elementValues = {
      ...element,
      element: [additionalPara1, additionalPara2, additionalPara3],
    };
    details.push(elementValues);
  });
}

getDetails();
