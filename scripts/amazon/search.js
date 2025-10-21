export function searchingProduct(){
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      document.querySelector('.js-search-button').click();
    }  
  });

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value

    window.location.href = `amazon.html?search=${searchValue}`;
  });
}

