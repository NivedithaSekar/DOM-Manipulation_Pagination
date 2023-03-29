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
    const listOfPages = await pagination(pageNumber,numberOfPages)
    createPages(listOfPages);

    //displaying user Data
    userList.slice(startingIndex,startingIndex+usersPerPage).forEach(data => {
        const userDiv = document.createElement('div');
        userDiv.setAttribute('class',"user-container");
        userDiv.innerHTML = `<p> ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>`;
        list_container.appendChild(userDiv);
    })

    //Pagination
    //pages button
    function pagination(current, last) {
        var current = current,
            last = last,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;
    
        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }
    
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
    
        return rangeWithDots;
    }


    function createPages(pageList){
        console.log(pageList);
        //prev page button
        const prevPage = document.createElement('button');
        prevPage.innerHTML = "<<";
        prevPage.setAttribute('id','prevPage')
        prevPage.setAttribute('onclick',`displayData(${pageNumber-1})`);
        pages.appendChild(prevPage);

        //for first page, previous button should be disabled
        if(pageNumber == 1){
            prevPage.setAttribute('disabled',"true");
        }

        //Rangelist Buttons
        for(let i = 0 ; i<pageList.length ; i++){
            const page= document.createElement('button');
            if(pageList[i] != '...'){
                page.setAttribute('onclick',`displayData(${pageList[i]})`);
                if(pageList[i] == pageNumber){
                     page.setAttribute('class','active');
                }
            }else{
                page.style.cursor = 'not-allowed';
            }
            page.innerText = pageList[i];
            pages.appendChild(page);
        }
         //next page button
         const nextPage = document.createElement('button');
         nextPage.innerHTML = ">>";
         nextPage.setAttribute('id','nextPage');
         nextPage.setAttribute('onclick',`displayData(${pageNumber+1})`);
         pages.appendChild(nextPage);
         
         //for last page calculated, next button should be disabled
         if(pageNumber == numberOfPages){
             nextPage.setAttribute('disabled',"true");
     }  
    }
}