let apiKey = '1c805bb00ac3eccc83cd1ac2ce461dd5';

const search = document.querySelector('.im');
const input = document.querySelector('input');
const temp = document.querySelector('.inf');
const cit = document.querySelector('.city');
const items = document.querySelectorAll('.items');
const maininfo = document.querySelector('.maininfo');
const item__temperature = items[0];
const item__humidity = items[1];
const item__wind = items[2];
let temperature = -1;
let humidity = -1;
let wind = -1;
let descr = [];
let fn = -1;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}


function Update(){
    if (temperature!=-1){
        if (item__temperature.classList.contains('active')){
            temp.textContent = `${Math.round(temperature*10)/10} C°`;
        }
    }
    if (humidity!=-1){
        if (item__humidity.classList.contains('active')){
           temp.textContent = `${Math.round(humidity*10)/10} %`;
        }
    }
    if (wind!=-1){
        if (item__wind.classList.contains('active')){
            temp.textContent = `${Math.round(wind*10)/10} м/с`;
        }
    }
}

function Clear(){
    if (item__temperature.classList.contains('active')){
        item__temperature.classList.remove('active');
   }
   if (item__humidity.classList.contains('active')){
       item__humidity.classList.remove('active');
   }
   if (item__wind.classList.contains('active')){
       item__wind.classList.remove('active');
   }
}

item__temperature.addEventListener('click',()=>{
   Clear();
    item__temperature.classList.add('active');
    console.log(temperature);
    if (temperature!=-1){
        temp.textContent = `${Math.round(temperature*10)/10} C°`;
    }
});
item__humidity.addEventListener('click',()=>{
    Clear();
    item__humidity.classList.add('active');
    if (humidity!=-1){
        temp.textContent = `${Math.round(humidity*10)/10} %`;
    }
});
item__wind.addEventListener('click',()=>{
    Clear();
    item__wind.classList.add('active');
    if (wind!=-1){
        temp.textContent = `${Math.round(wind*10)/10} м/с`;
    }
});

search.addEventListener('click',()=>{
    search.classList.add('anim');
    setTimeout(()=>{
        search.classList.remove('anim');
    },300);
    let city = input.value;
    input.value = '';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    axios.get(url).then(res => {
        let keywords = [];
        res.data.weather.forEach(item => {
            keywords.push(item.main);
            descr.push(item.description);
        });
        cit.textContent = res.data.name;
        maininfo.textContent = descr.join(', ');
        temperature = res.data.main.temp;
        humidity = res.data.main.humidity;
        wind = res.data.wind.speed;
        Update();
        let apikey1 = '4kxh9DwW8dRlGLHREK2WgvrrP8FoI6tl';
        let url1 = `https://api.giphy.com/v1/gifs/search?api_key=${apikey1}&q=${keywords[0]}`;
        axios.get(url1).then(res => {
            let r = getRandomInt(0, (res.data.data.length));
            if (r == fn) {
                r = (r + 1) % (res.data.data.length);
            }
            let path = res.data.data[r].embed_url;
            let o = document.querySelector('.im1');
            o.src = path;
            fn = r;
        });
        keywords = [];
        descr = [];
     });
    
});