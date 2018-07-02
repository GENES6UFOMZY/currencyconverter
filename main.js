const baseUrl = 'https://free.currencyconverterapi.com';
const listOfCountries = '/api/v5/countries';
const CONVERT = `/api/v5/convert?q=`;


let fromCountry,
   toCountry ,
    fromAmount,
     toAmount,
     exchangeResult,
     convert;


window.onload = () => {
  fromCountry = document.getElementById('from');
  toCountry = document.getElementById('to');
  fromAmount = document.getElementById('input');
  toAmount= document.getElementById('amount');
  convert= document.getElementById('convert');
exchangeResult=document.querySelector('#result')
  convert.addEventListener('click',(e) => {
    e.preventDefault();
    convertAmount(fromCountry,toCountry,toAmount)
  });

  

 
  loadCountries();
  
};

function convertAmount(fromCountry,toCountry,toAmount){

  const query = `${fromCountry.value}_${toCountry.value}&compact=ultra`;
  const baseurl = `${baseUrl}${CONVERT}` ;
  const URL = `${baseurl}${query}`;
  axios.get(URL).then(({data})=>{
    const key = Object.keys(data)[0];
    const result = toAmount.value || 1 * data[key];
    console.log(exchangeResult.innerText);
    exchangeResult.innerText = result;
  }).catch(e=>{
    alert('there was an error')
  })

}

const loadCountries = () => {
  const url = `${baseUrl}${listOfCountries}`;
  axios.get(url).then(({data})=>{
  const countries = data.results;
  for(let country in countries) {
      const optionElement = document.createElement('option');
      // console.log(countries[country].currencyId);
      optionElement.value = countries[country].currencyId;
      optionElement.innerText = `${countries[country].currencyName}`;

      fromCountry.appendChild(optionElement);
      toCountry.appendChild(optionElement.cloneNode(true));
    }

  }).catch(e=>{
    console.log(e);
  })

  