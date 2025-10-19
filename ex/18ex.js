//18a-c
/*
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').
  then((response) => {
    return response.text();
}).then((greeting) => {
  console.log(greeting);
})

async function greeting(){
  const response = await fetch('https://supersimplebackend.dev/greeting');
  console.log(response);
  const greeting = await response.text();
  console.log(greeting);
}

greeting();
*/

//18d
/*
const response = fetch('https://supersimplebackend.dev/greeting',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    name: 'jason'
  })
})

response.then((greeting) => {
  return greeting.text();
}).then((greetingText) => {
  console.log(greetingText);
})
*/

//18e-f
/*
async function getResponseFromAmazon(){
  try {
    const response = await fetch('https://amazon.com');
    const text = response.text();
    console.log(text);
  } catch (error){
    console.log('CORS error. Your request wasa blocked by the backend.')
  }
}

getResponseFromAmazon();
*/

//18g
async function getGreeting(){
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    });
    if(response.status >= 400){
      throw response;
    }

    const text = await response.text();
    console.log(text);

  }catch(error){
    if(error.status === 400){
      const errorMessage = await error.json();
      console.log(errorMessage);
    }else{
      console.log('Network error. Please try again later');
    }
  }
}

getGreeting();
