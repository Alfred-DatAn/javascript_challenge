// d3.selections
let tbody = d3.select("tbody");
let button = d3.select("#filter");
let form = d3.select("#ufo-form");


// function definition
function newUfoFilter(){
    d3.event.preventDefault();

    // remove previous table data
    d3.selectAll("td").remove();

    //user inputs
    let inputSelect = d3.select("#date-filter");
    let inputValue = inputSelect.property("value");

    let stateSelect = d3.select("#state-filter");
    let inputState = stateSelect.property("value");

    let shapeSelect = d3.select("#shape-filter");
    let inputShape = shapeSelect.property("value");


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

    // query creation
    let query = {
        datetime : dateFormated,
        state : inputState,
        shape : inputShape
    };

    console.log(query);
    
    // filtered results
    let filteredSightings = data_sightings.filter(function(sighting){
        for (let key in query) {
            if (sighting[key] != query[key])
                return false;
        }
        return true;
    });

     if (filteredSightings.length === 0){
         alert("The Illuminatis are blocking the signal! No UFO sightings found...")
     };
    
    console.log("Sightings filtered: ", filteredSightings);

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

