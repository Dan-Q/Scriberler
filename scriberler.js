'use strict'; // ES6

/********************* LETTERS *********************/

const letters = {
  reset: { css: ['marginLeft', 'marginTop', 'letterSpacing'] },
  A: { steps: 3, css: { marginLeft: '15px'} },
  B: { steps: 3, css: {} },
  C: { steps: 3, css: {} },
  D: { steps: 2, css: { marginLeft: '10px'} },
  E: { steps: 3, css: {} },
  F: { steps: 3, css: {} },
  G: { steps: 3, css: {} },
  H: { steps: 3, css: {} },
  I: { steps: 3, css: {} },
  J: { steps: 3, css: {} },
  K: { steps: 3, css: {} },
  L: { steps: 3, css: {} },
  M: { steps: 3, css: {} },
  N: { steps: 3, css: {} },
  O: { steps: 3, css: {} },
  P: { steps: 3, css: {} },
  Q: { steps: 3, css: {} },
  R: { steps: 3, css: {} },
  S: { steps: 3, css: { marginTop: '25px' } },
  T: { steps: 4, css: {} },
  U: { steps: 3, css: {} },
  V: { steps: 3, css: {} },
  W: { steps: 3, css: {} },
  X: { steps: 3, css: {} },
  Y: { steps: 3, css: {} },
  Z: { steps: 3, css: {} }
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
  const remainder1 = document.getElementById('remainder1');
  const remainder2 = document.getElementById('remainder2');
  const startDrawTime = 100; // milliseconds
  const drawTime = 3000; // milliseconds, per stage
  /* Set up text */
  if(nameValue == '') return;
  let dropcapHTML = '';
  for(let i = 0; i < dropcap.steps; i++){
    dropcapHTML = dropcapHTML + `<img src="dropcaps/${dropcapValue}${i+1}.png" />`;
  }
  dropcapWrapper.innerHTML = dropcapHTML;
  remainder1.textContent = remainder2.textContent = nameValue.slice(1);
  letters.reset.css.forEach(prop => {
    if(dropcap.css[prop]){
      remainder1.style[prop] = dropcap.css[prop];
      remainder2.style[prop] = dropcap.css[prop];
    } else {
      remainder1.style[prop] = ''
      remainder2.style[prop] = '';
    }
  });
  remainder1.classList.remove('show', 'unshow');
  remainder2.classList.remove('show');
  /* Reset form */
  name.value = '';
  /* Show results page */
  showSection('result');
  /* Begin animation */
  // Draw first step of dropcap
  setTimeout(() => {
    dropcapWrapper.querySelector('img:not(.show)').classList.add('show');
  }, startDrawTime);
  // Draw rest of text - outline
  setTimeout(() => {
    remainder1.classList.add('show');
  }, startDrawTime + (drawTime * 1));
  // Draw rest of text - fill
  setTimeout(() => {
    remainder1.classList.add('unshow');
    remainder2.classList.add('show');
  }, startDrawTime + (drawTime * 2));
  // Draw subsequent steps of dropcap
  for(let i = 1; i < dropcap.steps; i++){
    setTimeout(() => {
      dropcapWrapper.querySelector('img:not(.show)').classList.add('show');
    }, startDrawTime + (drawTime * (i + 2)));
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
