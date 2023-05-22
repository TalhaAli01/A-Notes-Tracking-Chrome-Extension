const inputEl = document.getElementById("form-input");
const saveInputBtn = document.getElementById("save-input-btn");
const historyBtn = document.getElementById("history-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const ol = document.getElementById("ol");

let span = "";
let li = "";
let input = "";
let link = "";

window.onload = function () {
  retrievingElements();
  inputEl.focus();
};

const creatingUsableElements = () => {
  span = document.createElement("span");
  li = document.createElement("li");
  input = document.createElement("input");
  span.appendChild(li);
  span.appendChild(input);
  ol.appendChild(span);
  li.innerHTML = inputEl.value;
  input.type = "checkbox";
};

const creatingObjects = () => () => {
  const allData = [];
  creatingUsableElements();
  allData.push({
    first: li.innerHTML,
    second: ol.innerHTML,
  });
  console.log(allData);
  localStorage.setItem("Input Data", JSON.stringify(allData));
};

const retrievingElements = () => {
  const retrievedData = localStorage.getItem("Input Data");
  const newData = JSON.parse(retrievedData);
  console.log(newData);
  newData.forEach((element) => {
    ol.innerHTML = element.second;
  });
  const allSpans = ol.children;
  for (let i = 0; i < allSpans.length; i++) {
    allSpans[i].lastChild.classList.remove("increase-width");
    allSpans[i].classList.remove("red-background");
  }
};

const deletingElements = () => {
  const storageItems = JSON.parse(localStorage.getItem("Input Data"));
  console.log(storageItems);
  const newArray = [];
  for (let i = 0; i < storageItems.length; i++) {
    newArray.push(storageItems[i].second);
  }
  const lastItem = newArray[newArray.length - 1];
  ol.innerHTML = lastItem;

  let elements = ol.children;
  for (let i = 0; i < elements.length; i++) {
    let allInputs = elements[i].lastChild;
    elements[i].classList.add("red-background");
    allInputs.classList.add("increase-width");

    allInputs.addEventListener("click", () => {
      if (allInputs.checked === true) {

      if (confirm("Are you sure you want to delete " + `"${allInputs.parentElement.firstChild.textContent}"` + "?")) {
        txt = "You pressed OK!";
        console.log(txt);
        let dadElement = allInputs.parentElement;
        dadElement.remove();
        let newElements = [];
        if (ol.childElementCount === 1 && allInputs.checked === true) {
          console.log("We only have 1 span");
          newElements.push({
            first: ol.children.innerHTML,
            second: ol.innerHTML,
          });
          localStorage.setItem("Input Data", JSON.stringify(newElements));
        } else if (ol.childElementCount > 1) {
          newElements.push({
            first: ol.lastChild.firstChild.innerHTML,
            second: ol.innerHTML,
          });
          localStorage.setItem("Input Data", JSON.stringify(newElements));
        } else {
          localStorage.clear();
        }
      };
      } else {
        txt = "You pressed Cancel!";
        console.log(txt);
      }
    });
  }
};
const getCurrentTab = () => {
  const myTabData = [];
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myTabData.push(tabs[0].url);
    console.log(myTabData[0]);

    const allLinksData = [];
    creatingUsableElements();
    link = document.createElement("a");
    link.href = myTabData[0];
    link.innerHTML = myTabData[0];
    link.target = "_blank";
    li.appendChild(link);
    allLinksData.push({
      first: li.innerHTML,
      second: ol.innerHTML,
    });
    console.log(allLinksData);
    localStorage.setItem("Input Data", JSON.stringify(allLinksData));
  });
};



saveInputBtn.addEventListener("click", creatingObjects());
historyBtn.addEventListener("click", retrievingElements);
deleteBtn.addEventListener("click", deletingElements);
saveTabBtn.addEventListener("click", getCurrentTab);
