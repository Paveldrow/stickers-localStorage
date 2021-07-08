window.onload = init;

function init() {
  const button = document.querySelector('.add-button');
  const clearButton = document.querySelector('.clear-button');
  button.onclick = createSticky;
  clearButton.onclick = clearStorage
  const stickiesArray = getStickiesArray();

  for (let i = 0; i < stickiesArray.length; i++) {
    const key = stickiesArray[i];
    const value = JSON.parse(localStorage[key]);
    addStickyToDOM(key, value);
  };
};

function getStickiesArray() {
  let stickiesArray = localStorage.getItem('stickiesArray');
  if (!stickiesArray) {
    let stickiesArray = [];
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
  } else {
    stickiesArray = JSON.parse(stickiesArray);
  };
  return stickiesArray;
};

function addStickyToDOM(key, stickyObj) {
  const stickies = document.querySelector('.stickies');
  const sticky = document.createElement('li');
  sticky.setAttribute('class', 'sticky-item');
  sticky.setAttribute('id', key);
  const removeStickyButton = document.createElement('button');
  removeStickyButton.setAttribute('class', 'remove-sticky-button');
  sticky.style.backgroundColor = stickyObj.color;
  const span = document.createElement('span');
  span.setAttribute('class', 'sticky-text');
  span.textContent = stickyObj.value;
  sticky.appendChild(removeStickyButton);
  sticky.appendChild(span);
  stickies.appendChild(sticky);
  sticky.onclick = deleteSticky;
};

function createSticky() {
  const stickiesArray = getStickiesArray();
  const noteInput = document.querySelector('.note-text');
  const value = noteInput.value;
  if (!value == '') {
  const colorSelect = document.querySelector('.color-select');
  const index = colorSelect.selectedIndex;
  const color = colorSelect[index].value;
  const key = 'sticky_' + new Date().getTime();
  const stickyObj = {
    'value': value,
    'color': color,
  };
  localStorage.setItem(key, JSON.stringify(stickyObj));
  stickiesArray.push(key);
  localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
  addStickyToDOM(key, stickyObj);
  noteInput.value = '';
  };
};

function deleteSticky(e) {
  let key = e.target.id;
  if (e.target.tagName.toLowerCase() == 'button') {
    key = e.target.parentNode.id;
  };
  localStorage.removeItem(key);
  const stickiesArray = getStickiesArray();
  if (stickiesArray) {
    for (let i = 0; i < stickiesArray.length; i++) {
      if (key == stickiesArray[i]) {
        stickiesArray.splice(i, 1);
      };
    };
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    removeStickyFromDOM(key);
  };
};

function removeStickyFromDOM(key) {
  const sticky = document.getElementById(key);
  sticky.parentNode.removeChild(sticky);
};

function clearStorage() {
  localStorage.clear();
  location.reload();
};

console.log(localStorage.length)