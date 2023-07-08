// https://www.omdbapi.com/?s=batman&y=2011&page=1&type=movie&apikey=ae64b988

let search = document.getElementById("search");
let year = document.getElementById("year");
let button = document.getElementById("button");
let main2 =document.getElementById("main2")
let searchVal;
let url;
let yearVal = null;
let data;
let addInLocStr = JSON.parse(localStorage.getItem("arr"));
let moviePage = JSON.parse(localStorage.getItem("arr2"));
let idd1;
let idd2;
if (localStorage.getItem("arr") == null) {

    localStorage.setItem("arr", "[]");
}
if (localStorage.getItem("arr2") == null) {

    localStorage.setItem("arr2", "[0]");
}
// let localLength = JSON.parse(localStorage.getItem("arr")).length;
let div = document.getElementById("div");
let div2 = document.getElementById("div2");
let container = document.getElementsByClassName("container");

let url2 = "https://www.omdbapi.com/?s=batman&page=1&type=movie&apikey=ae64b988";
let url3 = "https://www.omdbapi.com/?s=avenger&page=1&type=movie&apikey=ae64b988";
let url4 = "https://www.omdbapi.com/?s=hulk&page=1&type=movie&apikey=ae64b988";


let xmlHttpreq = (url, cont,abc) => {

    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = () => {
        let data2 = xhr.responseText;
        data2 = JSON.parse(data2);
        mainObj = data2.Search;

        // console.log(data2.Search[0].Poster); 
        // console.log(data2.Search);
        for (let i = 0; i < mainObj.length; i++) {
            if (data2.Search[i].Poster != "N/A") { // Title, Year,Poster

                container[cont].innerHTML += `<div class="card" style="width: 12rem;">
                <a href="movieDetailPage.html" class="${abc}"> <img src="${mainObj[i].Poster}" class="card-img-top" alt="..." width="150px" height="150px"></a>
                                <div class="card-body">
                                    <h6 >Movie:- <span id="span1">${mainObj[i].Title}</span></h6>
                                    <h6 >Year:- <span id="span2">${mainObj[i].Year}</span></h6>
                                   <!-- <a href="#" class="btn btn-primary addd">Add To Favoutite</a> -->
                                </div>
                        </div>`
            }
        }

        let mvp = document.getElementsByClassName(`${abc}`);
        for (let i = 0; i < mvp.length; i++) {
            // mvp[i].addEventListener("click", addinLocal);
            mvp[i].onclick=function(){
                // event.preventDefault();
                moviePage.splice(0, 1, { "Poster": data2.Search[i].Poster, "Title": data2.Search[i].Title, "Type": data2.Search[i].Type, "Year": data2.Search[i].Year });
                localStorage.setItem("arr2", JSON.stringify(moviePage));
                console.log(i," ", " is click")
                // console.log( Object.keys(moviePage[0]).length)
            }
        }
        // console.log(mvp.length)

    }
}
xmlHttpreq(url2, 0,"i");
xmlHttpreq(url3, 1,"ii");
xmlHttpreq(url4, 2,"iii");

// let Q;
let searchF = () => {
    searchVal = search.value;
    let xhr = new XMLHttpRequest();
    url = `https://www.omdbapi.com/?t=${searchVal}&plot=full&apikey=ae64b988`;

    // console.log(searchVal)
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function () {
        // console.log(addInLocStr.length);
        data = xhr.responseText;
        data = JSON.parse(data)
        mainObj = data.Poster;
        // console.log(typeof data);
        if (data.Response == "False" || mainObj == "N/A") {
            if (mainObj == "N/A" && data.Response != "False") {
                // console.log("movie found but didnt get poster/thumbnail")
                div.innerHTML = `<b> Movie found but didn't get poster/thumbnail(image) or more about the movie.</b>`;
            } else {
                // console.log("haa")
                div.innerHTML = `<h2>${data.Error}</h2>`;
            }
        }
        if (search.value == "") {
            div.style.display = "none";
            main2.style.display="block"
        } else {
            div.style.display = "block";
            main2.style.display="none"
        }
        // console.log(mainObj + " " + typeof mainObj);
        if (mainObj != undefined && mainObj != "N/A") {
            // console.log(searchVal);

            div.innerHTML = `<div class="card card1" style="width: 18rem;">
                       <a href="movieDetailPage.html" class="mvpg"> <img src="${mainObj}" title="${data.Title}" class="card-img-top" alt="${data.Title}" width="230px" height="300px"> </a>
                            <div class="card-body">
                                <h5 >Movie:- ${data.Title}</h5>
                                <h6 >Language:- ${data.Language}</h6>
                                <p class="card-text"> ${data.Plot.slice(0, 100)}  <a href="movieDetailPage.html" class="mvpg" style="text-decoration:none;">Read more....</a></p>
                                <a href="#" class="btn btn-primary">Add To Favoutite</a>
                            </div>
                    </div>`

            let mvpg = document.getElementsByClassName("mvpg");
            // console.log(data);
            let addinLocal = function () {
                // event.preventDefault();
                // console.log(data);

                moviePage.splice(0, 1, { "Poster": data.Poster, "Title": data.Title, "Language": data.Language, "Country": data.Country, "Duration": data.Runtime, "Actors": data.Actors, "Writer": data.Writer, "Director": data.Director, "Awards": data.Awards, "Released": data.Released, "Plot": data.Plot });
                localStorage.setItem("arr2", JSON.stringify(moviePage));
            }
            for (let i = 0; i < mvpg.length; i++) {
                mvpg[i].addEventListener("click", addinLocal);
            }

            let favbtn = document.getElementsByClassName("btn-primary")[0];

            let add = (event) => {
                event.preventDefault();

                // addInLocStr.push({ "Poster": data.Poster, "Title": data.Title, "Language": data.Language, "Country": data.Country, "Duration": data.Runtime, "Plot":data.Plot });
                addInLocStr.push(data);

                addInLocStr = [...new Map(addInLocStr.map((m) => [m.Title, m])).values()];

                localStorage.setItem("arr", JSON.stringify(addInLocStr));
                // localLength = addInLocStr.length;
                // console.log(addInLocStr.length);
                favbtn.style.background = "red";
                favbtn.innerHTML = `<span>Added</span> <lord-icon
                src="https://cdn.lordicon.com/egiwmiit.json"
                trigger="loop"
                delay="1000"
                colors="primary:white"
                state="morph-check-in"
                style="width:20px;height:20px">
                </lord-icon>`;

                // favbtn.style.display = "flex"
                favbtn.style.gap= "5%";
                favbtn.style.alignItems="center";
                // favbtn.style.justifyContent= "center";

                let k = 0;
                let id = setInterval(() => {
                    // console.log("added");
                    idd1 = id;
                    document.getElementsByClassName("alert2")[0].style.display = "none";
                    clearInterval(idd2);
                    k++;
                    if (k == 9) {
                        document.getElementsByClassName("alert1")[0].style.display = "none";
                        clearInterval(id);
                    } else {

                        document.getElementsByClassName("alert1")[0].style.display = "block";
                    }
                }, 200)


            }
            favbtn.addEventListener("click", add);
        }
    }
}

let main = document.getElementsByClassName("main")
let favrte = document.getElementById("favrte");
let y = 0;
let favShow = function () {
    // console.log(addInLocStr.length);
    // console.log(addInLocStr[0]);
    y++;
    if (addInLocStr.length > 0 && y == 1) {
        // console.log("hieieie")
        for (let i = 0; i < addInLocStr.length; i++) {
            // console.log(addInLocStr)
            div2.innerHTML += `<div class="card card2" style="width: 13rem; margin-top: 2rem; justify-content: center;">
            <a href="movieDetailPage.html" class="mvpgg"> <img src="${addInLocStr[i].Poster}" class="card-img-top" alt="${addInLocStr[i].Title}" width="120px" height="180px" title="${addInLocStr[i].Title}"></a>
                               
                                    <p><strong>Movie:-</strong><span class="card-title">${addInLocStr[i].Title}</span></p>
                                    <p class="card-text"><strong>Country:-</strong> ${addInLocStr[i].Country}</p>
                                    <p class="card-text"><strong>Duration:-</strong> ${addInLocStr[i].Runtime}</p>
                                    <a href="#" class="btn btn-primary delete"  style="width: 5rem;">Delete</a>
                                
                        </div>`
        }
    }
    else if (div2.style.display == "flex") {
        // console.log("wewewe")
        div2.innerHTML = "";
        div2.style.display = "none";
        y = 0;
    }

    let mvpgg = document.getElementsByClassName("mvpgg");

    for (let i = 0; i < mvpgg.length; i++) {
        mvpgg[i].onclick = function () {
            // event.preventDefault();
            console.log(i, " ", " is click");
            moviePage.splice(0, 1, { "Poster": addInLocStr[i].Poster, "Title": addInLocStr[i].Title, "Language": addInLocStr[i].Language, "Country": addInLocStr[i].Country, "Duration": addInLocStr[0].Runtime, "Actors": addInLocStr[i].Actors, "Writer": addInLocStr[i].Writer, "Director": addInLocStr[i].Director, "Awards": addInLocStr[i].Awards, "Released": addInLocStr[i].Released, "Plot": addInLocStr[i].Plot });
            localStorage.setItem("arr2", JSON.stringify(moviePage));
        }
    }

    if (favrte.innerText == "Favourite") {
        favrte.innerHTML = `  <lord-icon
            src="https://cdn.lordicon.com/nhfyhmlt.json"
            trigger="loop"
            delay="500"
            colors="primary:#121331"
            style="width:50px;height:2.5rem" title="click me">
        </lord-icon>`;
        favrte.style.background = "transparent"
        favrte.style.border = "none"
        favrte.style.position = "fixed"
        favrte.style.top = "60"
        favrte.style.right = "-13px"
        for (let i = 0; i < main.length; i++) {
            main[i].style.display = "none"
        }
        div2.style.display = "flex";
        main2.style.display="none"
    } else {
        favrte.innerText = `Favourite`
        favrte.style.background = ""
        favrte.style.border = ""
        favrte.style.position = "absolute"
        favrte.style.top = "60"
        favrte.style.right = "0px"
        for (let i = 0; i < main.length; i++) {
            main[i].style.display = "flex"
        }
        main2.style.display="block"
    }
    if (search.value != "") {
        main2.style.display="none"
    } 

    let deletee = document.getElementsByClassName("delete");
    let del = function (event) {
        event.preventDefault();
        for (let j = 0; j < deletee.length; j++) {
            deletee[j].onclick = function () {
                addInLocStr.splice(j, 1);
                // localLength--;
                // console.log(localLength);
                localStorage.setItem("arr", JSON.stringify(addInLocStr));
                // window.location.reload();
                this.parentNode.remove();
                // j=0;

                let m = 0;
                let id2 = setInterval(() => {
                    // console.log("delete");
                    clearInterval(idd1);
                    idd2 = id2;
                    document.getElementsByClassName("alert1")[0].style.display = "none";
                    m++;
                    if (m == 9) {
                        document.getElementsByClassName("alert2")[0].style.display = "none";
                        clearInterval(id2);
                    } else {

                        document.getElementsByClassName("alert2")[0].style.display = "block";
                    }
                }, 200)
            };
        }
    }

    for (let i = 0; i < deletee.length; i++) {
        deletee[i].addEventListener("click", del);
    }

}

favrte.addEventListener("click", favShow);
search.addEventListener("input", searchF)

