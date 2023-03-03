const loadPhone = async (searchTex, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTex}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhone(data.data,dataLimit)
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''
    const showAllBox = document.getElementById('showAll-box')
   if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10)
showAllBox.classList.remove('d-none')
   }
   else{
    showAllBox.classList.add('d-none')
   }
    const noPhone = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    <div class="card p-10">
                            <img src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                    <button onclick = "loadDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
                                    
                            </div>
                        </div>
    `
        phoneContainer.appendChild(phoneDiv)
        console.log(phone)
    });
    toggleSpinner(false);
}

 const processSearch = dataLimit =>{
    toggleSpinner(true);
    const textField = document.getElementById('search-field');
    const searchText = textField.value;
    loadPhone(searchText, dataLimit);
}
document.getElementById('search-btn').addEventListener('click', function () {
 processSearch(10)
})

document.getElementById('search-field').addEventListener('keyup', function(e){
    if(e.key = 'Enter'){
        processSearch(10)
    }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch();
    console.log(processSearch)
})
const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json();
   displayDetails(data.data)
}

const displayDetails = phone =>{
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>release:${phone.releaseDate ? phone.releaseDate : 'no info found'}</p>
    <p>storage:${phone.mainFeatures ? phone.mainFeatures.storage:'no info found'
    }
    `
    
}
loadPhone('apple');