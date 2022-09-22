import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 800;
const inputRef = document.getElementById('search-box');
const markupRef = document.querySelector(".country-info")

inputRef.addEventListener('input', debounce(getCounrtyData, DEBOUNCE_DELAY))

let cauntryName;
function getCounrtyData(event) {
    const cauntryName = event.target.value.trim();
    if (!cauntryName) {
        return markupRef.innerHTML=''
    }
    fetchCountries(cauntryName)
        .then(data => {
            if (data.length === 1) { markupCoutry(data[0]) }
            else if (data.length > 1 && data.length <= 10) { markupCoutries(data) }
            else { Notify.info("Too many matches found. Please enter a more specific name.") }
        })
        .catch(err => { Notify.failure("Oops, there is no country with that name"), markupRef.innerHTML = '' })
}



  


function markupCoutries(coutryData) {
    const markup = coutryData.map(element =>
    { return`<div><li><img src=${element.flags.svg } alt= flags width= '100'</li><h4>${element.name.official}</h4></div>`;
    }).join(' ')
    markupRef.innerHTML = markup;
} 



function markupCoutry(coutryData) {

    let languagesObject = coutryData.languages;
    let languages = Object.values(languagesObject).join(', ');

    markupRef.innerHTML = `<div>
    <h1>${coutryData.name.official}</h1>
    <ul>
    <li><img src=${coutryData.flags.svg} alt= flags width= '100'</li>
    <li>Capital: ${coutryData.capital}</li>
    <li>Population: ${coutryData.population}</li>
    <li>Languages: ${languages}</li>
    </ul>
    </div>`;
    
} 

