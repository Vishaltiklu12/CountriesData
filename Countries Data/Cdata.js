var createNewElement = (elementName) =>{
    return document.createElement(elementName)
}

var setAttributes = (elementName,attributeNameValuePair)=>{
    Object.keys(attributeNameValuePair).forEach((attributeName)=>{
        elementName.setAttribute(attributeName,attributeNameValuePair[attributeName])
    })
}


//creating card-deck element
var cardDeckElem = createNewElement("div")
setAttributes(cardDeckElem,{class:"container mt-5 d-flex flex-wrap justify-content-around"})

// stores all the country-flag card elements
var countryCards = []

// requesting rest countries data
var dataRequestPromise = new Promise((resolve,reject)=>{
    var datarequest = new XMLHttpRequest();
    
    datarequest.open("GET","https://restcountries.eu/rest/v2/all",true)
    
    datarequest.send();
    
    datarequest.onload = () =>{
        if(datarequest.status===200){
            resolve(JSON.parse(datarequest.response))
        }
        else{
            reject(datarequest.statusText)
        }
    }
})
.then((countriesData)=>{

    console.log(countriesData)

    //creating country-flag cards
    for(var i=0;i<countriesData.length;i++){
        countryCards.push(createNewElement("div"))
        setAttributes(countryCards[i],{
            class:"card mb-4 p-2",
            style:"width:250px; box-shadow: 0px 10px 10px grey;"
        })
        
        //displays country name and flag at top in each card
        countryCards[i].innerHTML = `<p> <b> ${countriesData[i].name} </b> </p> <img class="border card-img-top" 
        src="${countriesData[i].flag}" alt="${countriesData[i].name} Flag">`
        
        //creating card-body element for country details
        var cardBodyElem = createNewElement("div")
        setAttributes(cardBodyElem,{class:"card-body"})

        if(countriesData[i].capital==="") {countriesData[i].capital="-"}
        if(countriesData[i].alpha2Code==="") {countriesData[i].alpha2Code="-"}
        if(countriesData[i].alpha3Code==="") {countriesData[i].alpha3Code="-"}
        if(countriesData[i].region==="") {countriesData[i].region="-"}
        if(countriesData[i].latlng.length===0) {countriesData[i].latlng = ['-','-']}

        var capitalElem = createNewElement("p")
        setAttributes(capitalElem,{class:"class-text"})
        capitalElem.innerHTML = `Capital: <span class="text-white rounded p-1" style="background-color:green"> 
        ${countriesData[i].capital} </span>`

        var countryCodeElem = createNewElement("p")
        setAttributes(countryCodeElem,{class:"class-text"})
        countryCodeElem.innerHTML = `Country Code: <b>${countriesData[i].alpha2Code}, ${countriesData[i].alpha3Code}</b>`

        var regionElem = createNewElement("p")
        setAttributes(regionElem,{class:"class-text"})
        regionElem.innerHTML = `Region: <b>${countriesData[i].region}`

        var latlngElem = createNewElement("p")
        setAttributes(latlngElem,{class:"class-text"})
        latlngElem.innerHTML = `Lat,Long: <b>${countriesData[i].latlng[0]}, ${countriesData[i].latlng[1]}</b>`

        var currencyElem = createNewElement("p")
        setAttributes(currencyElem,{class:"class-text"})
        var currencyStr = ""
        countriesData[i].currencies.forEach((currency)=>{ 
            var str = JSON.stringify(currency).split("}").join(" ").split("{").join("<br>->").split("\"").join(" ")
            currencyStr+=(str+" ") 
        })
        currencyElem.innerHTML = `Currencies: <b> ${currencyStr} </b>`

        cardBodyElem.append(capitalElem,countryCodeElem,regionElem,latlngElem,currencyElem)
        countryCards[i].append(cardBodyElem)
    }
    cardDeckElem.append(...countryCards)
})
.catch((errormsg)=>{
    console.log(errormsg)
})

document.body.append(cardDeckElem)