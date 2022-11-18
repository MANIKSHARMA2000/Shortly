let UlEl = document.getElementById("ul-el")
let InputField = document.getElementById("input-field")
let list = document.getElementById("ul-el")
let NavBtn  = document.getElementById("nav-btn")
let AllNavOpt  = document.getElementById("All-in-one-btn")
let arr = []
var callOne = true;
function one(){
    AllNavOpt.style.display = "inline"
    callOne = false;
}
function two(){
    AllNavOpt.style.display = "none"
    callOne = true;
}
function call(){
    if(callOne){one()}
  else {two()}
  
}
//render Short links 
function renderList(arr){
    let gatherHTML = ""
    for(let i=0; i<arr.length; i++){
    gatherHTML += 
        `<li class="li-el">
            <div class="longUrl">
                ${arr[i].lurl}
            </div>
            <div class="short-urlAndBtn">
                <a id='short-URL' href="">
                    ${arr[i].surl}
                </a>
                <button onclick="copyME()" id="copy-btn">
                     Copy
                </button>
            </div>
        </li>`
        
    }
    UlEl.innerHTML = gatherHTML
    
}
//Short A long URL 
function Short(){
    if(InputField.value){
    const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      apikey: 'c5d11da714e6438c8f131834b6341cc3'
    },
    body: JSON.stringify({destination: `${InputField.value}`})
    };
  
  fetch('https://api.rebrandly.com/v1/links', options)
    .then(response => response.json())
    .then(response => {console.log(response)
    let shortUrl = response.shortUrl
    let lognurl = InputField.value

        let Tempobj = {"surl":shortUrl,"lurl":lognurl}

        arr.push(Tempobj)
        localStorage.setItem("myurl",JSON.stringify(arr))
        renderList(arr)
        InputField.value = ""
    })
    .catch(err => console.error(err))
}
if(!InputField.value){
    InputField.style.border = "1px solid red"
    InputField.placeholder = "Please Add A Link"
    
}
}
//Copy Short URL to Cliopboard
function copyME(){
    list.addEventListener("click",(e)=>navigator.clipboard.writeText(e.path[1].firstElementChild.textContent)
)}
//Render Shorted links From LocalStorage
let urlfromlocalstorage = JSON.parse(localStorage.getItem("myurl"))
if(urlfromlocalstorage){
    console.log(urlfromlocalstorage);
    arr = urlfromlocalstorage
    renderList(arr)
}

      
