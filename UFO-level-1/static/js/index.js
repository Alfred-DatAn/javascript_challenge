// test connection with ufo_data.js
console.log(data_sightings);

// d3.selections
let tbody = d3.select("tbody");
let button = d3.select("#filter");
let form = d3.select("#ufo-form");

// function definition
function newUfoFilter(){
    d3.event.preventDefault();

    // remove previous table data
    d3.selectAll("td").remove();

    let inputSelect = d3.select("#date-filter");
    let inputValue = inputSelect.property("value");

    // date formatting
    let dateFormat = inputValue.split("/");

    let dateFormated = ""
    
    for (var i = 0; i < 2; i++){
        if (dateFormat[i][0] === "0"){
            dateFormated += dateFormat[i][1] + "/"
        }else{
            dateFormated += dateFormat[i] + "/"
        }
    }

    dateFormated += dateFormat[2]

    console.log("Date splited:", dateFormat);
    console.log("Date formated: ", dateFormated);
    
    
    // filtered results
    let filteredSightings = data_sightings.filter(d => d.datetime === dateFormated);
     if (filteredSightings.length === 0){
         alert("The Illuminatis are blocking the signal! No UFO sightings found...")
     };
    
    console.log("Results filtered: ", filteredSightings);

    // insert results into table
    filteredSightings.forEach( d => {
        let row = tbody.append("tr")    
        Object.values(d).forEach(u => {
             let cell = row.append("td").text(u)
        })
     });
 
}

// call function on click or submit
button.on("click", newUfoFilter);
form.on("submit", newUfoFilter);

