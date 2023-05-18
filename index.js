const inputEl = document.getElementById('form-input');
const saveInputBtn = document.getElementById('save-input-btn');
const historyBtn = document.getElementById('history-btn');
const deleteBtn = document.getElementById('delete-btn');
const ol = document.getElementById('ol');

const creatingObjects = () => () => {
    const allData = [];
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
    const newArray = [];
    for (let i = 0; i < storageItems.length; i++) {
        newArray.push(storageItems[i].second);
    }
    const lastItem = newArray[newArray.length - 1];
    ol.innerHTML = lastItem;
    let elements = ol.children;
    for (let i = 0; i < elements.length; i++) {
        let allInputs = elements[i].lastChild;
        allInputs.addEventListener('click',()=>{
            if (allInputs.checked === true) {
                let dadElement = allInputs.parentElement;
                dadElement.remove();
                let newElements = [];
                if (ol.childElementCount === 1 && allInputs.checked === true) {
                    console.log("We only have 1 span");
                    newElements.push({
                        'first': ol.children.innerHTML,
                        'second': ol.innerHTML,
                    });
                    localStorage.setItem('Input Data',JSON.stringify(newElements));  

                    } else if (ol.childElementCount > 1){
                        newElements.push({
                            'first': ol.lastChild.firstChild.innerHTML,
                            'second': ol.innerHTML,
                        });
                        localStorage.setItem('Input Data',JSON.stringify(newElements));                
                    } else {
                        localStorage.clear()
                }
            }
        })
    }
}

saveInputBtn.addEventListener('click', creatingObjects());
historyBtn.addEventListener('click', retrievingElements);
deleteBtn.addEventListener('click', deletingElements);

