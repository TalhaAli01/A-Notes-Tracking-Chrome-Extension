const inputEl = document.getElementById('form-input');
const saveInputBtn = document.getElementById('save-input-btn');
const historyBtn = document.getElementById('history-btn');
const deleteBtn = document.getElementById('delete-btn');
const ol = document.getElementById('ol');

let boolean = false;
const allData = [];

const creatingObjects = () => () => {
    const inputData = inputEl.value;
    const span = document.createElement('span');
    const li = document.createElement('li');
    const input = document.createElement('input');
    span.appendChild(li);
    span.appendChild(input);
    ol.appendChild(span);
    li.innerHTML = inputData;
    input.type = 'checkbox';
    allData.push({
        'first': li.innerHTML,
        'second': ol.innerHTML,
    });
    console.log(allData);
    localStorage.setItem('Input Data', JSON.stringify(allData));

};

const retrievingElements = () => {
    const retrievedData = localStorage.getItem('Input Data');
    const newData = JSON.parse(retrievedData);
    console.log(newData);
    newData.forEach(element => {
        ol.innerHTML = element.second;
    });
}

const deletingElements = () => {
    const storageItems = JSON.parse(localStorage.getItem('Input Data'));
    console.log(storageItems);
    storageItems.forEach(element => {
        const allElements = element.second;
        ol.innerHTML = allElements;
    });
}

const testFunc = () => {

}

saveInputBtn.addEventListener('click', creatingObjects());
historyBtn.addEventListener('click', retrievingElements);
deleteBtn.addEventListener('click', deletingElements);
deleteBtn.addEventListener('click', testFunc);

