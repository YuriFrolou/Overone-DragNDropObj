const properties = document.querySelectorAll('.property');
const propertiesContainer = document.querySelector('.properties');
const placeholders = document.querySelectorAll('.placeholder');
const checkBtn = document.querySelector('.check-btn');
const resultMessage = document.querySelector('.result');
let carObject = {};
let fordObject = {};
let renaultObject = {};


for (const property of properties) {
    property.addEventListener('dragstart', dragstart);
    property.addEventListener('dragend', dragend);
}

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', dragdrop);
}

function dragstart(event) {
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0);
    for (let elem of properties) {
        elem.classList.remove('active');
    }
    event.target.classList.add('active');

    for (let elem of placeholders) {
        elem.classList.remove('active');
    }
    event.target.parentNode.classList.add('active');
}

function dragend(event) {
    event.target.classList.remove('hold', 'hide');
}

function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.target.classList.add('hovered');
}

function dragleave(event) {
    event.target.classList.remove('hovered');
}

function dragdrop(event) {
    event.target.classList.remove('hovered');
    event.target.childNodes.forEach((elem) => {
        elem.style.transform = "translateY(-100px)";
        elem.style.visibility = 'hidden';
    });
    const activeElement = document.querySelector('.property.active');
    if (document.querySelector('.placeholder.active') !== null) {
        removeProperty(activeElement.dataset.name);
    }
    createObject(event.target.dataset.value, activeElement.dataset.name, activeElement.dataset.value);
    event.target.append(activeElement);
    event.target.childNodes.forEach((elem) => {
        elem.style.transform = "translateY(0)";
        elem.style.visibility = 'visible';
    });

    if (propertiesContainer.children.length === 0) {
        checkBtn.classList.add('active');
    }

}

checkBtn.addEventListener('click', () => {
    const result = checkAnswers();
    let message = '';
    if (result) {
        message = 'Всё правильно!';
    } else {
        message = 'К сожалению, вы ошиблись. Подумайте ещё.';
    }
    showResult(message);

});

function checkAnswers() {
    const fordObjectString = createStrFromObj(fordObject);
    const renaultObjectString = createStrFromObj(renaultObject);
    const carObjectString = createStrFromObj(carObject);

    if (carObjectString !== carStr) {
        return false;
    }
    if (fordObjectString !== fordStr) {
        return false;
    }
    if (renaultObjectString !== renaultStr) {
        return false;
    }
    return true;

}

function showResult(message) {
    resultMessage.innerHTML = message;
    resultMessage.classList.toggle("active");
    setTimeout(function () {
        resultMessage.classList.toggle("active");
    }, 2000);
}

function createObject(element, name, value) {

    switch (element) {
        case 'car':
            carObject[name] = value;
            break;
        case 'ford':
            fordObject[name] = value;
            break;
        case 'renault':
            renaultObject[name] = value;
            break;
    }
}


function removeProperty(name) {

    switch (document.querySelector('.placeholder.active').dataset.value) {
        case 'car':
            delete carObject[name];
            break;
        case 'ford':
            delete fordObject[name];
            break;
        case 'renault':
            delete renaultObject[name];
            break;
    }
}