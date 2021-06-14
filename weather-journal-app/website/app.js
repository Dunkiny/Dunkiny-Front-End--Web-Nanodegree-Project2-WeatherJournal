/* Global Variables */
const apikey='&units=metric&appid=e5db94b5a0b717a19966aa719b90ad23';
const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip="
const userHolders = document.getElementById('entryHolder').getElementsByTagName('div');
const feelings=document.getElementById('feelings');
const buttonGenerate=document.getElementById('generate')
const entryHolders= document.getElementById('entryHolder').querySelectorAll('div')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//create function for the button generate
buttonGenerate.addEventListener("click" ,async function actToClick(){
    const zipcode= document.getElementById('zip').value;
    const content = document.getElementById('feelings').value
    getData(baseUrl,zipcode,apikey,content)
})
async function getData(baseUrl,zipcode,apikey){
    const url = `${baseUrl}${zipcode}${apikey}`
    const res=await fetch(url)
    try{
        // store the info from the api and add all the data to the ui
        const requestData=await res.json();
        postData('http://localhost:8080/alldata', requestData)
        .then(postDataUI("http://localhost:8080/alldata"))
        return requestData;
    }catch(error){
        console.log("error", error)
    }
}
async function postData(url,requestData){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      projectData={
        date: d   ,
        temperature: requestData.main.temp,
        content:feelings.value
    }

    return response.json();

}
async function postDataUI(url){
    const urlFetch = await fetch(url)
    try{
        const res = urlFetch.res
        document.getElementById('date').innerHTML=projectData.date;
        document.getElementById('temp').innerHTML=projectData.temperature;
        document.getElementById('content').innerHTML=projectData.content
    }catch(error){
        console.log('error',error)
    }
    
}