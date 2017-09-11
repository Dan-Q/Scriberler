'use strict'; // ES6

/******************** FUNCTIONS ********************/

const showSection = id => {
  Array.prototype.forEach.call(document.getElementsByTagName('section'), section => {
    if(section.id == id) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
};

const submitForm = event => {
  const name = document.getElementById('name');
  const nameValue = name.value.trim();
  const dropcapValue = nameValue.slice(0, 1);
  if(nameValue == '') return;
  document.getElementById('dropcap').alt = dropcapValue;
  document.getElementById('dropcap').src = `dropcaps/${dropcapValue}.png`;
  document.getElementById('remainder').textContent = nameValue.slice(1);
  name.value = ''; // reset form
  showSection('result');
}

/****************** EVENT HANDLERS *****************/

// Keyboards
Array.prototype.forEach.call(document.getElementsByClassName('keyboard'), keyboard => {
  const control = document.getElementById(keyboard.dataset.for);
  Array.prototype.forEach.call(keyboard.getElementsByTagName('button'), button => {
    if(button.classList.contains('enter')) return;
    button.addEventListener('click', (event)=>{
      if(button.classList.contains('backspace')) {
        control.value = control.value.slice(0, control.value.length - 1);
        return;
      }
      if(button.classList.contains('clear')) {
        control.value = '';
        return;
      }
      control.value = `${control.value}${event.target.textContent}`;
    });
  });
});

// Go-to-section buttons
Array.prototype.forEach.call(document.getElementsByClassName('go-to-section'), button => {
  button.addEventListener('click', (event)=>{
    showSection(button.dataset.section);
  });
});

// Submit form
document.getElementById('submit-form').addEventListener('click', submitForm);

/********************** START **********************/

showSection('form');
