const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});


// gestion des apis
const apiKey = "fd6de7ebceca1e24537b7443da7ca7bf";
const randomcity = ["Cotonou",
"Porto-Novo",
"Abomey",
"Parakou",
"Kandi",
"Natitingou",
"Bohicon",
"Ouidah",
"Lokossa",
"Djougou",
"Abomey-Calavi",
"Allada",
"Adjarra",
"Pobè",
"Savè",
"Tchaourou",
"Dassa-Zoumè",
"Sakété",
"Kétou",
"Segbana"
]
const randomIndex = Math.floor(Math.random()* randomcity.length)
randCity = randomcity[randomIndex]

const randUrl= `https://api.openweathermap.org/data/2.5/weather?q=${randCity}&appid=${apiKey}&units=metric&lang=fr`
fetch(randUrl).then(response => response.json()).then(
  data => {
    
    const isRaining = data.weather.some(weather =>weather.description.toLowerCase().includes('pluie'))
    const isClear = data.weather.some(weather =>weather.description.toLowerCase().includes('clair'))
    const isCloudy = data.weather.some(weather =>weather.description.toLowerCase().includes('nuage'))

   /* const resultWeather = `
    <div class="relative flex items-center flex-col ">
        <div class=" bg-opacity-25  backdrop-blur mb-20 md:mb-0" >
          <div class=" sun-contain">
             <span>${randCity}</span>   <span>${data.main.temp} °C</span>

             <p>WInd speed:${data.wind.speed} km</p>
           
             <P>${data.weather[0].description}
             </P>
          </div>
          <img src="./images/nuage soleil.png" alt="" class="h-60  absolute top-[0px] -right-11 ">
        </div>
      </div>
    `*/

    const details = `
       <div class="today h-[400px] rounded-xl min-h-full flex flex-col justify-between p-4 swiper-slide">
          <div class="flex items-center px-2 py-2">
            <h1 class="text-2xl font-semibold">${randCity} </h1>
            <span><img src="./images/location.png" alt="location" class="h-9"></span>
          </div>
          <div class="flex items-center gap-6 justify-center">
            <img src="./images/thermo.png" alt="thermomètre" class="h-12">
            <p>${data.main.temp} C</p>
            <img src="./images/nuagepetit.png" alt="nuage" class="h-14">
          </div>
        
         <div class="flex text-sm md:text-xl font-semibold items-center gap-5 md:gap-10 mx-0 md:mx-auto justify-center">
          <div>
            <p>HUMIDITY</p>
            <P>${data.main.humidity} %</P>
          </div>
          <div>
            <p>VISIBILITY</p>
            <P>${data.visibility /1000} km</P>
          </div>
          <div>
            <p>AIR PRESSURE</p>
            <P>${data.main.pressure} Pa</P>
          </div>
          <div>
            <p>WIND</p>
            <P>${data.wind.speed} mph</P>
          </div>
         </div>
        </div>
    `

    const divresult = document.querySelector(".div")
    const today = document.querySelector(".today")
    today.innerHTML = details
    console.log(data);
  }

).catch(error => console.error("une erreur est survenue lors de la requete", error))




function SearchLocation() {

  const city = document.querySelector(".searchLocation").value ;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`

fetch(url).then(res => res.json()).then(data =>{
  console.log(data)
  const details = `
  <div class="today h-[400px] rounded-xl min-h-full flex flex-col justify-between p-4 swiper-slide">
     <div class="flex items-center px-2 py-2">
       <h1 class="text-2xl font-semibold">${city.toUpperCase()}</h1> </h1>
       <span><img src="./images/location.png" alt="location" class="h-9"></span>
     </div>
     <div class="flex items-center gap-6 justify-center">
       <img src="./images/thermo.png" alt="thermomètre" class="h-12">
       <p>${data.main.temp} C</p>
       <img src="./images/nuagepetit.png" alt="nuage" class="h-14">
     </div>
   
    <div class="flex text-sm md:text-xl font-semibold items-center gap-5 md:gap-10 mx-0 md:mx-auto justify-center">
     <div>
       <p>HUMIDITY</p>
       <P>${data.main.humidity} %</P>
     </div>
     <div>
       <p>VISIBILITY</p>
       <P>${data.visibility /1000} km</P>
     </div>
     <div>
       <p>AIR PRESSURE</p>
       <P>${data.main.pressure} Pa</P>
     </div>
     <div>
       <p>WIND</p>
       <P>${data.wind.speed} mph</P>
     </div>
    </div>
   </div>
`

const result = document.querySelector(".today")
result.innerHTML= details
}).catch(console.error())

}

const searchButton = document.querySelector(".button")
console.log(searchButton);
searchButton.addEventListener("click", SearchLocation)
document.querySelector(".searchLocation").addEventListener("keypress", (event)=>{
if (event.key ==="Enter") {
  SearchLocation()
}
} )
