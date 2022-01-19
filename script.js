const list_container =document.getElementById('list-container');
const pages = document.getElementById('buttons');
const url = './pagination.json';

async function getData(){
    const data = await fetch(url,{
        method: 'GET',
        headers:{ 
            "Content-Type": "application/json"
        },
    });
    const userList = await data.json();
    //console.log(userList);
    return userList;
}

async function displayData(pageNumber){
    const usersPerPage = parseInt(document.getElementById('userPerPage').value);
    //console.log(usersPerPage);
    const userList = await getData();
    //console.log(userList);
    let numberOfUsers = userList.length;
    const numberOfPages = (numberOfUsers % usersPerPage ? Math.floor(numberOfUsers / usersPerPage) + 1 : numberOfUsers / usersPerPage);
    let startingIndex = (usersPerPage*pageNumber)-usersPerPage;
    list_container.innerHTML = ""
    pages.innerHTML=""

    //displaying user Data
    userList.slice(startingIndex,startingIndex+usersPerPage).forEach(data => {
        const userDiv = document.createElement('div');
        userDiv.setAttribute('class',"table table-bordered user-container");
        userDiv.innerHTML = `<p> ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>`;
        list_container.appendChild(userDiv);
    })

    //Pagination
    //prev page button
    const prevPage = document.createElement('button');
    prevPage.setAttribute('onclick',`displayData(${pageNumber-1})`);
    prevPage.innerText = "<<";
    pages.appendChild(prevPage);
    //for first page, previous button should be disabled
    if(pageNumber == 1){
        prevPage.setAttribute('disabled',"true");
    }
    //pages button
    for(let i = 1; i <= numberOfPages; i++){
        const page= document.createElement('button');
        page.setAttribute('onclick',`displayData(${i})`);
        if(i == pageNumber){
            page.setAttribute('class','active');
        }
        page.innerText = i;
        pages.appendChild(page);
    }
    //next page button
    const nextPage = document.createElement('button');
    nextPage.setAttribute('onclick',`displayData(${pageNumber+1})`);
    nextPage.innerHTML = ">>";
    pages.appendChild(nextPage);
    //for last page calculated, next button should be disabled
    if(pageNumber == numberOfPages){
        nextPage.setAttribute('disabled',"true");
    }  
}