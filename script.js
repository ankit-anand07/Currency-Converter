const URL = " https://v6.exchangerate-api.com/v6/7eabd6ef29a8de926dff4871/latest/USD";

// store all curency code  available in dropdown.
const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

// store selected  curr code from "from" side.
const fromCurr = document.querySelector(".from select");

// store selected  curr code from "to" side.
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

// list all currency code in from and to side.
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let to_rate = data["conversion_rates"][toCurr.value];
  let from_rate = data["conversion_rates"][fromCurr.value];
  console.log(from_rate);
  console.log(to_rate);
  let finalAmount = (amtVal*to_rate)/from_rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

// swap currency code  by clicking double arrow button 

const swapCurrencies = () => {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
};

const arrowIcon = document.querySelector(".fa-arrow-right-arrow-left");

arrowIcon.addEventListener("click", () => {
  swapCurrencies();
  updateExchangeRate();
});
