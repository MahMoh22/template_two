let toTop = document.querySelector(".toTop");
let barsIcon = document.querySelector("header nav .bars-icon");
let navMenu = document.querySelector("header nav ul");
let lis = document.querySelectorAll("header nav ul li");
let search = document.querySelector("header nav .search-icon");
let homeSection = document.getElementById("HOME");
let next = document.querySelector(".next");
let prev = document.querySelector(".previous");
let bgBullets = document.querySelectorAll("#HOME .bullets-div .bullets li");
let services = document.getElementById("SERVICES");
let filterLis = document.querySelectorAll("#PORTFOLIO .filter ul li");
let galleryPhotos = document.querySelectorAll("#PORTFOLIO .gallery .photo");
let testimonials = document.querySelectorAll("#ABOUT .about-content .testimonials .testimonial-content");
let teBullets = document.querySelectorAll("#ABOUT .bullets-div .bullets li");
let bullet1 = document.querySelector(".t-one");
let bullet2 = document.querySelector(".t-two");
let bullet3 = document.querySelector(".t-three");
let statsBg = document.querySelector("#ABOUT");
let stats = document.querySelectorAll("#ABOUT .about-img2 .about-colored-area .stats .stat span");
let skellsContent = document.querySelector("#ABOUT .about-content .skells");
let progSpans = document.querySelectorAll(".skell .progress span");
let cards = document.querySelectorAll("#PRICING .cards .card span");
let pricing = document.getElementById("PRICING");


let currentImg = 2;
let statStarted = false;
let cardStarted = false;


//bars icon.
barsIcon.onclick = function() {
    let menuStyle = getComputedStyle(navMenu);
    let menuDisplay = menuStyle.display;
    if(menuDisplay == "none") {
        navMenu.style.display = "block";
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        homeSection.appendChild(overlay);
        window.onclick = function(e) {
        if(e.target == overlay){
            overlay.remove();
            navMenu.style = "";
        }
        }
        lis.forEach(li => li.onclick = function() {
            navMenu.style = "";
            overlay.remove();
        })
    } else {
        navMenu.style = "";
        overlay.remove();
    }
    
}


//Search tab.
search.onclick = function() {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    window.onclick = function(e) {
        if(e.target == overlay){
        overlay.remove();
        }
    }
    
    let searchBox = document.createElement("div");
    searchBox.className = "searchBox";
    overlay.appendChild(searchBox);
    
    let searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.className = "searchBar";
    searchBar.placeholder = "search here";
    searchBox.appendChild(searchBar);
    
    let searchBtn = document.createElement("button");
    searchBtn.className = "searchBtn";
    searchBtn.innerHTML = "Search";
    searchBox.appendChild(searchBtn);
    searchBtn.onclick = function() {
        searchBar.value = "";
        searchBtn.style.backgroundColor = "#30b4e4";
    }
    
    let searchClose = document.createElement("span");
    searchClose.className = "searchClose";
    searchClose.innerHTML = "X";
    searchBox.appendChild(searchClose);
    homeSection.appendChild(overlay);
    searchClose.onclick = function() {
        overlay.remove();
    }

}



// Change landing background image.
next.onclick = function() {
    if(currentImg == 3){
        currentImg = 1;
    } else {
        currentImg++;
    }
    homeSection.style.backgroundImage = `url(../images/landing-img${currentImg}.jpg)`;
    changeActiveClass();
}

prev.onclick = function() {
    if(currentImg == 1){
        currentImg = 3;
    } else {
        currentImg--;
    }
    homeSection.style.backgroundImage = `url(../images/landing-img${currentImg}.jpg)`;
    changeActiveClass();
}

function changeActiveClass () {
    bgBullets.forEach(li => {
        li.classList.remove("active");
    if(li.dataset.img == currentImg){
        li.classList.add("active");
    }
    });
}

bgBullets.forEach(li => {
    li.addEventListener("click", function(e){
        bgBullets.forEach(li => li.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentImg = e.currentTarget.dataset.img;
        homeSection.style.backgroundImage = `url(../images/landing-img${currentImg}.jpg)`;
    })
})






toTop.onclick = function() {
    window.scrollTo(0, 0)
}




//portfolio filter gallery
filterLis.forEach(li  => {
    li.addEventListener("click", (e) => {
        let filterName = e.currentTarget.dataset.filter;
        filterLis.forEach(li => {
            li.classList.remove("active");
            e.currentTarget.classList.add("active");
        })
        if(filterName == "all"){
            galleryPhotos.forEach(photo => photo.style.display = "block");
        } else {
            galleryPhotos.forEach(photo => {
                if(photo.classList.contains(filterName)){
                    photo.style.display = "block";
                } else {
                    photo.style.display = "none";
                }
            })
        }
    })
})





//change testimonial content
setInterval(changeTestimonial, 5000);

function changeTestimonial () {
    if(bullet1.classList.contains("active")){
        bullet2.click();
    } else if(bullet2.classList.contains("active")){
        bullet3.click();
    } else if(bullet3.classList.contains("active")){
        bullet1.click();
    }
}


teBullets.forEach(li => {
    li.addEventListener("click", function (e) {
        teBullets.forEach(li => li.classList.remove("active"));
        e.currentTarget.classList.add("active");
        testimonials.forEach(t => t.style.display = "none");
        document.querySelector(e.currentTarget.dataset.testimonialnum).style.display = "block";
    })
})







window.onscroll = function() {
    //scroll to top button
    if(window.scrollY >= services.offsetTop - 200){
        toTop.style.display = "block";
    } else {
        toTop.style.display = "none";
    }

    //fill stats
    if(window.scrollY >= statsBg.offsetTop){
        if(!statStarted){
            stats.forEach(stat => {
                let counter = setInterval(() => {
                    stat.textContent++;
                    if(stat.textContent == stat.dataset.num) {
                        clearInterval(counter);
                    }
                }, 2000 / stat.dataset.num)
            })
        }
        statStarted = true;
    } 

    //fill skells bars
    if(window.scrollY >= skellsContent.offsetTop - 250){
        progSpans.forEach((span) => {
            span.style.width = span.dataset.width;
        });
    } else {
        progSpans.forEach(span => span.style.width = 0);
    }

    //fill cards price
    if(window.scrollY >= pricing.offsetTop){
        if(!cardStarted){
            cards.forEach(card => {
                let counter = setInterval(() => {
                    card.textContent++;
                    if(card.textContent == card.dataset.cast){
                        clearInterval(counter);
                    }
                }, 1000 / card.dataset.cast)
            })
        }
        cardStarted = true;
    }
}





