// Good luck!
const express = require("express")
const { request } = require('http');
const app = express()

const nycLandmarks = {
    manhattan: [{
            name: "Statue of Liberty",
            location: "Liberty Island",
            built: 1886,
            description: "A colossal neoclassical sculpture and iconic symbol of freedom.",
            image: "https://www.worldatlas.com/upload/f4/d8/7b/shutterstock-1397031029.jpg",
            funFact: "The statue was a gift from France to the United States."
        },
        {
            name: "Empire State Building",
            location: "350 5th Ave, Manhattan",
            built: 1931,
            description: "A 102-story Art Deco skyscraper that was the world's tallest building for nearly 40 years.",
            image: "https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
            funFact: "Its spire was originally designed as a mooring mast for airships."
        },
        {
            name: "Central Park",
            location: "New York, NY 10024",
            built: 1858,
            description: "An iconic urban park spanning 843 acres in the heart of Manhattan.",
            image: "https://olmsted.org/wp-content/uploads/2023/06/Park-Aerial_20190604_04-1-scaled.jpg",
            funFact: "It is one of the most filmed locations in the world."
        }
    ],
    brooklyn: [{
            name: "Brooklyn Bridge",
            location: "East River",
            built: 1883,
            description: "A historic suspension bridge connecting Manhattan and Brooklyn.",
            image: "https://cdn.britannica.com/80/115080-050-46BE2B70/Brooklyn-Bridge-East-River-New-York-City.jpg",
            funFact: "It was the first bridge to use steel for cable wire."
        },
        {
            name: "Prospect Park",
            location: "Brooklyn",
            built: 1867,
            description: "A 526-acre park designed by the creators of Central Park.",
            image: "https://www.tclf.org/sites/default/files/thumbnails/image/NY_Brooklyn_ProspectPark_BarrettDoherty_2020_001_sig.png",
            funFact: "The park contains the last remaining natural forest in Brooklyn."
        },
        {
            name: "Coney Island",
            location: "Brooklyn, NY",
            built: 1895,
            description: "A famous amusement area and neighborhood known for its beaches and boardwalk.",
            image: "https://stantonhouseinn.com/wp-content/uploads/2024/05/520372f7-6d1c-4e4d-89a4-52a821ae3a0e.jpg",
            funFact: "The first roller coaster in America opened here in 1884."
        }
    ],
    queens: [{
            name: "Flushing Meadows-Corona Park",
            location: "Queens",
            built: 1939,
            description: "A park built for the 1939 and 1964 World's Fairs.",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Flushing_Meadows%E2%80%93Corona_Park.jpg",
            funFact: "The Unisphere, a giant steel globe, is a centerpiece of the park."
        },
        {
            name: "Citi Field",
            location: "41 Seaver Way, Queens",
            built: 2009,
            description: "The home stadium of the New York Mets baseball team.",
            image: "https://magazine.northeast.aaa.com/wp-content/uploads/2018/03/citi-field-stadium-guide-1.jpg",
            funFact: "It features a rotunda dedicated to baseball legend Jackie Robinson."
        },
        {
            name: "Queens Botanical Garden",
            location: "43-50 Main St, Queens",
            built: 1946,
            description: "A peaceful urban garden featuring diverse plants and sustainable landscapes.",
            image: "https://www.nyctechmommy.com/queens-botanical-garden-43/",
            funFact: "It originated as part of the 1939 World's Fair."
        }
    ],
    bronx: [{
            name: "Yankee Stadium",
            location: "1 E 161st St, Bronx",
            built: 2009,
            description: "The home ballpark of the New York Yankees.",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Yankee_Stadium_aerial_from_Blackhawk.jpg",
            funFact: "It replaced the original Yankee Stadium, which was often referred to as 'The House That Ruth Built.'"
        },
        {
            name: "Bronx Zoo",
            location: "2300 Southern Blvd, Bronx",
            built: 1899,
            description: "The largest metropolitan zoo in the United States.",
            image: "https://i.insider.com/5449140369bedd9b575ad038?width=700",
            funFact: "It houses over 6,000 animals representing 650 species."
        },
        {
            name: "New York Botanical Garden",
            location: "2900 Southern Blvd, Bronx",
            built: 1891,
            description: "A 250-acre garden and a National Historic Landmark.",
            image: "https://images.ctfassets.net/1aemqu6a6t65/3xNGxmQbI2AURVtME2ekB3/61115213950d2d68c36d1d3a565d0221/newyorkbotanicalgarden-christopherpostlewaite_crop",
            funFact: "It has over one million living plants in its collections."
        }
    ],
    statenisland: [{
            name: "Staten Island Ferry",
            location: "St. George Terminal, Staten Island",
            built: 1905,
            description: "A free ferry service between Staten Island and Manhattan.",
            image: "https://pix11.com/wp-content/uploads/sites/25/2021/06/Staten-Island-ferry.jpg?w=2560&h=1440&crop=1",
            funFact: "It carries over 25 million passengers annually."
        },
        {
            name: "Staten Island Greenbelt",
            location: "Staten Island",
            built: 1984,
            description: "A network of parks and forests covering nearly 2,800 acres.",
            image: "https://images.squarespace-cdn.com/content/v1/5235cb72e4b01ae2ba612744/1463864155071-PLUIRNLP4KRGRFO2VF9T/Screen+Shot+2016-05-21+at+4.47.15+PM.png",
            funFact: "It includes one of the largest natural preserves in NYC."
        },
        {
            name: "Historic Richmond Town",
            location: "441 Clarke Ave, Staten Island",
            built: 1700,
            description: "A living history museum complex showcasing Staten Island's past.",
            image: "https://images.ctfassets.net/1aemqu6a6t65/2fIQBxm6I1tQHi3N2iZRXr/36e61ce21e58e63cfd9e485f332b755a/historic-richmond-town-staten-island-nyc-photo-david-la-spina-003789-full-2.jpg",
            funFact: "It features over 30 original historic structures."
        }
    ]
};

app.use((request, response, next) => {
    console.log("The path is " + request.url + " using " + request.method + " HTTP method. ")
    next()
})

app.get("/", (request, response) => {
    response.send("<h1>Hey, this is the home page to my Landmarks in NYC API. Enter /docs in your browser to know what you can do here, xoxo</h1>")
})

app.get("/docs", (request, response) => {
    response.send("<h1>You can: </h1> <ul><li>/ followed by the borough you want to check. All lowercase. </li><li>/ to get a random landmark out of all my items</li></ul>")
})

app.get("/:borough", (request, response) => {
    const borough = request.params.borough 
    response.json(nycLandmarks[borough])
})

app.get("/:borough", (request, response) => {
    const borough = request.params.borough 
    response.json(nycLandmarks[borough])
})









app.use((request, response) => {
    response.status(404).send("<h1>404 NOT FOUND</h1>")
})
app.listen(3000, () => {
    console.log("I'm running!!!")
})