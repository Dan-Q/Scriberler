'use strict'; // ES6

/********************* LETTERS *********************/

const letters = {
  reset: { css: ['marginLeft', 'marginTop', 'letterSpacing'] },
  D: { steps: 2, css: { marginLeft: '-18px', marginTop: '17px', letterSpacing: '15px' } }
}

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
  const dropcap = letters[dropcapValue];
  const dropcapWrapper = document.getElementById('dropcap-wrapper');
  const remainder = document.getElementById('remainder');
  const startDrawTime = 100; // milliseconds
  const drawTime = 4000; // milliseconds, per stage
  /* Set up text */
  if(nameValue == '') return;
  let dropcapHTML = '';
  for(let i = 0; i < dropcap.steps; i++){
    dropcapHTML = dropcapHTML + `<img src="dropcaps/${dropcapValue}${i+1}.png" />`;
  }
  dropcapWrapper.innerHTML = dropcapHTML;
  remainder.textContent = nameValue.slice(1);
  letters.reset.css.forEach(prop => {
    if(dropcap.css[prop]){
      remainder.style[prop] = dropcap.css[prop];
    } else {
      remainder.style[prop] = ''
    }
  });
  remainder.classList.remove('show');
  /* Reset form */
  name.value = '';
  /* Show results page */
  showSection('result');
  /* Begin animation */
  // Draw first step of dropcap
  setTimeout(() => {
    dropcapWrapper.querySelector('img:not(.show)').classList.add('show');
  }, startDrawTime);
  // Draw rest of text
  setTimeout(() => {
    remainder.classList.add('show');
  }, startDrawTime + drawTime);
  // Draw subsequent steps of dropcap
  for(let i = 1; i < dropcap.steps; i++){
    setTimeout(() => {
      dropcapWrapper.querySelector('img:not(.show)').classList.add('show');
    }, startDrawTime + (drawTime * (i + 1)));
  }
}

/****************** EVENT HANDLERS *****************/

// Keyboards
Array.prototype.forEach.call(document.getElementsByClassName('keyboard'), keyboard => {
  const control = document.getElementById(keyboard.dataset.for);
  keyboard.innerHTML = `
    <button>Q</button><button>W</button><button>E</button><button>R</button><button>T</button><button>Y</button><button>U</button><button>I</button><button>O</button><button>P</button><button class="backspace">←</button>
    <button>A</button><button>S</button><button>D</button><button>F</button><button>G</button><button>H</button><button>J</button><button>K</button><button>L</button>
    <button>Z</button><button>X</button><button>C</button><button>V</button><button>B</button><button>N</button><button>M</button>
    <button class="clear">&times;</button>
    <button class="enter" id="submit-form">↲</button>
    <button class="space">&nbsp;</button>
  `;
  Array.prototype.forEach.call(keyboard.getElementsByTagName('button'), button => {
    if(button.classList.contains('enter')) return;
    button.addEventListener('click', (event)=>{
      let newLetter = event.target.textContent;
      if(button.classList.contains('backspace')) {
        control.value = control.value.slice(0, control.value.length - 1);
        return;
      }
      if(button.classList.contains('clear')) {
        control.value = '';
        return;
      }
      if(button.classList.contains('space')) newLetter = ' ';
      if((control.value != '') && (control.value.slice(-1) != ' ')) newLetter = newLetter.toLowerCase(); // if after a letter, lowercaseify
      control.value = `${control.value}${newLetter}`;
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
