import { add } from "./myTest2.js";
/*
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
  console.log(typeof(xhr.response));
})
xhr.open('GET', 'https://supersimplebackend.dev/products')
xhr.send()
*/
/*
fetch('https://supersimplebackend.dev/products').then((response) => {
  console.log(response);
  console.log(typeof(response));
  return response.json();
}).then((response) => {
  console.log(response);
})
*/
/*
async function load(){
  await fetch('')
}

function test(){
  return 0;
}


new Promise((resolve) => {
  console.log('resolve');
  resolve();
}).then(() => {
  console.log('resolve2');
  resolve();
}).then();
*/

add();
console.log(add());