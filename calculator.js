const arrayOfIds =
        [
          {id: 'one', val:1 },
          {id: 'two', val:2},
          {id: 'three', val:3},
          {id: 'plus', val:'+'},
          {id: 'four', val:4},
          {id: 'five', val:5},
          {id: 'six', val:6},
          {id: 'minus', val:'-'},
          {id: 'seven', val:7},
          {id: 'eight', val:8},
          {id: 'nine', val:9},
          {id: 'equals', val:'='},
          {id: 'times', val:'X'},
          {id: 'zero', val:0},
          {id: 'divide', val:'/'},
          {id: 'remove', val:'c'}
        ]
let firstValueArray =  [];
let firstValueEnds = false;
let secondValueEnds = false;
let calculated = false;
let secondValueArray =  [];
const buttons = document.getElementById("buttons");
const calculator = document.getElementById("calculator");
const display = document.getElementById('display');
const calculate = () => {
  if(display != null) {
    display.classList.remove('loading')
    display.innerHTML = ''
  };
  const findPlus = secondValueArray.some((char) => char === '+');
  const findMinus = secondValueArray.some((char) => char === '-');
  const findTimes = secondValueArray.some((char) => char === 'X');
  const findDivide = secondValueArray.some((char) => char === '/');
  const filterSecondArray = parseInt(secondValueArray.join('').replace('+','').replace('-','').replace('X','').replace('/',''), 10);
  const filterFirstArray = parseInt(firstValueArray.join(''),10);
  if(findPlus && display != null) {
    const resultPlus = String(filterFirstArray + filterSecondArray);
      display.innerHTML = resultPlus;
      firstValueArray = [...resultPlus];
  }
  else if(findMinus && display != null) {
    const resultMinus = String(filterFirstArray - filterSecondArray);
    display.innerHTML = resultMinus;
    firstValueArray = [...resultMinus];
  }
  else if(findTimes && display != null) {
    const resultMinus = String(filterFirstArray * filterSecondArray);
    display.innerHTML = resultMinus;
    firstValueArray = [...resultMinus];1
  }
    else if(findDivide && display != null) {
    const resultMinus = String(filterFirstArray / filterSecondArray);
    display.innerHTML = resultMinus;
    firstValueArray = [...resultMinus];
  }
 firstValueEnds = false;
 secondValueEnds = false;
 calculated = true;
 secondValueArray = [];
};
const translate = (value) => {
  switch (value) {
    case 'plus':
      return '+';
    case 'minus':
      return '-';
      case 'times':
      return 'X';
      case 'divide':
      return '/';
      case 'equals':
      return '=';
    default:
      return value;
  }
}
const addSecondNumber = (data) => {
const invalidIds = ['+', '-', 'X', '/']
const number = ['1','2','3','4','5','6','7','8','9','0']
const arrayHasOperation = secondValueArray.some((index) => invalidIds.includes(index))
const dataIsNumber = number.includes(data.value)
    if(arrayHasOperation && invalidIds.includes(data.value)){
      } else if(dataIsNumber){
        secondValueArray.push(data.value ?? data.val )
       } 
      else {
        secondValueArray.push(data.val ?? data.value)
      }
}
// Input controller will take collect the data from keyboard/ mopuse click and provide a calculation 
const inputController = (data) => {
  if((data.id === 'plus' && firstValueArray.length > 0) || 
  (data.id === 'minus' && firstValueArray.length > 0) ||
   (data.id === 'times' && firstValueArray.length > 0) ||
   (data.id === 'divide' && firstValueArray.length > 0)) firstValueEnds = true;
  const invalidIds = ['plus', 'minus', 'times', 'divide', 'equals']
  const notValid = invalidIds.find((operation) =>  operation === data.id)
  if(!firstValueEnds && !secondValueEnds) {
    if(!notValid) firstValueArray.push(data.value ?? data.val);
    if(display != null) display.innerHTML = firstValueArray.join('');
  } else if(!secondValueEnds && firstValueEnds) {
    if(data.id !== 'equals') addSecondNumber(data);
    if(display != null) display.innerHTML = secondValueArray.join('');
  }
  if(data.id === 'remove' && display != null){
    secondValueEnds = false;
    firstValueEnds = false;
    firstValueArray = [];
    secondValueArray = [];
    display.innerHTML = ''
  }
  if(data.id === 'equals'){
    secondValueEnds= true;
    if(display != null) {
      display.classList.add('loading')
      display.innerHTML = 'Loading'
    };
    setTimeout(() =>  calculate() ,500);
  }
}
// create html buttons
  const buttonsCreate = () => {
  for (let arr of arrayOfIds){
    if(buttons != null){
    buttons.innerHTML += 
      `<button class="button-design" id="${arr.id}" value="${arr.val}" onclick="inputController({value:this.value,id:this.id})">${arr.val}</button>`
    }
  }
}
buttonsCreate();

const validateKey = ((pressedKey) => {
  const validcaculatorKeys = ['1','2','3','4','5','6','7','8','9','0','+','*','-','/','='];
  const validKey = validcaculatorKeys.includes(pressedKey)
  if(validKey) return true;
  else  {return false}
});
// control the keypress event
const keyPressHandler = (keyPress) => {
  let pressedKey = keyPress.key;
  if(validateKey(pressedKey)){
    if (pressedKey === '*') pressedKey = 'X';
    const validNumbers = ['1','2','3','4','5','6','7','8','9','0']
    const checkForNumber = validNumbers.includes(pressedKey);
    if(checkForNumber) pressedKey = parseInt(pressedKey,10);
  const sendKeyToInput = arrayOfIds.find((selection) => selection.val === pressedKey)
  inputController(sendKeyToInput);   
  }

}
window.addEventListener('keydown', keyPressHandler, false)
