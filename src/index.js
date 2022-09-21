import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 800;
const inputRef = document.getElementById('search-box');
const markupRef = document.querySelector(".country-info")
inputRef.addEventListener('input', debounce(getCounrtyData, DEBOUNCE_DELAY))

const BASE_URL = "https://restcountries.com/v3.1/name"




function getCounrtyData(event) {
    const cauntryName = event.target.value.trim();
    if (!cauntryName) {
        return
    }

    fetchCountries(cauntryName)
        .then(data => {
            if (data.length === 1) { markupCoutry(data[0]) }
            markupCoutries(data)
        })
        .catch(err =>{ alert(err)})

}





 const fetchCountries = (url) => {
    return fetch(`${BASE_URL}/${url}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
            throw new Error("No data Loading")
            }
            return response.json()
    })
}

  


function markupCoutries(coutryData) {
console.log('markupCoutries :', coutryData);

    // `<div>
// </div>`
   
} 



function markupCoutry(coutryData) {
    let languagesObject = coutryData.languages;
    console.log('languagesObject :', languagesObject);
    let languages = Object.values(languagesObject)
    console.log('lang :', languages);

// console.log('coutryData :', coutryData.languages);
    markupRef.innerHTML = `<div>
    <h1>${coutryData.name.official}</h1>
    <h4>Capital: ${coutryData.capital}</h4>
    <h4>Population: ${coutryData.population}</h4>
    <h4>Languages: ${languages}</h4>
    </div>`;
    
   
} 

