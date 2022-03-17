let bookName = document.querySelector("#book-name");
let author = document.querySelector("#author");
let year = document.querySelector("#year");
let isbn = document.querySelector("#isbn");
let add = document.querySelector("#add");
let bookAdded = document.querySelector(".book-added");
let outFeld = document.querySelector(".out-feld");
let div1 = document.querySelector(".book-status");
let clearBtn = document.querySelector(".clear-btn");




let bookArray = [];



// DARKMODE

var box = document.querySelector(".toggle");

let a = 0 ;

box.addEventListener("click",function(){
    if (a == 0){
        toRight();
        a += 1 ;
        toLocalStorge(a);
    }else {
        toLeft();
        a -= 1 ;
        toLocalStorge(a);
    }
    console.log()
})

function toLocalStorge (a){
    if (a == 1){
        localStorage.setItem("darkMode", "enabled");
        applyDarkMode();
    }else {
        localStorage.setItem("darkMode", "disapled");
        applyDarkMode();
    }
}
function applyDarkMode(){
    darkMode = localStorage.getItem("darkMode");
    if (darkMode == "enabled"){
       
        addDarkClasses();
        
    }else{
        
        removeDarkClasses();
    }
}
function addDarkClasses(){
    document.body.classList.add('dark');
    document.body.classList.remove('white');
}
function removeDarkClasses(){
    document.body.classList.remove('dark');
    document.body.classList.add('white');
    
}

function toRight (){
    box.style.setProperty('--boxRight','3px');
    box.style.setProperty('--boxBeforeBackColor','#eee');
    box.style.setProperty('--boxAfterBackColor','#5e5b5b');
    box.style.color = "#333";
    
   
}
function toLeft() {
    box.style.setProperty('--boxRight','28px');
    box.style.setProperty('--boxBeforeBackColor','#333');
    box.style.setProperty('--boxAfterBackColor','#eee');
    box.style.color = "#eee";
    
}






applyDarkMode();
if(localStorage.getItem("darkMode") == "enabled"){
    toRight()
}else {
    toLeft();
}





if (localStorage.getItem("books")){
    bookArray = JSON.parse(localStorage.getItem("books"));
}

getDataFromLocalStorage();

add.onclick = function(){
    if (bookName.value !== "" && author.value !== "" && year.value !== "" && isbn.value !== ""){
        let validation1 = /\d{3}\-\d\-\d{5}\-\d{3}\-\d/ig ;
        let validationIsbn = validation1.test(isbn.value);
        let validation2 = /\d{1,4}/ig ;
        let validationYear = validation2.test(year.value);

        if(validationYear === true){
            if (validationIsbn === true){
                books(bookName.value,author.value,year.value,isbn.value);
                bookName.value = "";
                author.value = "";
                year.value = "";
                isbn.value = "";
                bookGetAdded();
            }else {
                bookNotAdded("Invalied ISBN");
            }
        }else {
            bookNotAdded("Ivalied Year");
        }  
    }else {
        bookNotAdded("Invalied Input");
    }
}

function books (val1,val2,val3,val4){
    let booksObject = {
        id:Date.now(),
        title:val1,
        author1:val2,
        year1:val3,
        isbn1:val4,
    }
    
    bookArray.push(booksObject); 
    booksToPage(bookArray);
    toLocalStorage(bookArray);
}

function bookGetAdded (){
    div1.innerHTML = `Book Added`;
    div1.classList.remove("wrong");
    div1.classList.add("added");
}

function bookNotAdded(inputStatus){
    div1.innerHTML = inputStatus ;
    div1.classList.remove("added");
    div1.classList.add("wrong");
}

function booksToPage (bookArray){
    bookAdded.innerHTML = "";
    bookArray.forEach(function (book){
        let div2 = document.createElement("div");
        div2.classList.add("book-added1");
        div2.setAttribute("data-id",book.id);
        bookAdded.appendChild(div2);
        
        let div3 = document.createElement("div");
        div3.classList.add("book");
        div3.innerHTML = `<span class="name-1">Book Name :  </span>  <span>${book.title}</span> `;
        div2.appendChild(div3);

        let div4 = document.createElement("div");
        div4.classList.add("book");
        div4.innerHTML = `<span class="name-1">Author :  </span>${book.author1}` ;
        div2.appendChild(div4);

        let div5 = document.createElement("div");
        div5.classList.add("book");
        div5.innerHTML = `<span class="name-1">Year :  </span> ${book.year1}` ;
        div2.appendChild(div5);

        let div6 = document.createElement("div");
        div6.classList.add("book");
        div6.classList.add("book1");
        div6.innerHTML = `<span class="name-1">ISBN :  </span>${book.isbn1}` ;
        div2.appendChild(div6);

        let div7 = document.createElement("div");
        div7.classList.add("book");
        div7.classList.add("remove-btn");
        div7.innerHTML = "X";
        div2.appendChild(div7);
        div7.onclick = function (){
            removeBook(this.parentElement.getAttribute("data-id"));
            this.parentElement.remove();
        }
    })
    

}

function removeBook(taskID){
     bookArray = bookArray.filter(function (ele){
        return ele.id != taskID ;
    })
    toLocalStorage(bookArray);
}

clearBtn.onclick = function(){
    bookArray = [];
    bookAdded.innerHTML = "";
    window.localStorage.clear();

}

function toLocalStorage(bookArray) {
    window.localStorage.setItem("books",JSON.stringify(bookArray));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("books")
    if(data) {
        let tasks = JSON.parse(data);
        booksToPage(tasks);
    }
}

