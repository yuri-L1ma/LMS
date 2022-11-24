let hamburguerButton = document.querySelector("li.hamburguer-button")
let postButton = document.querySelector("li button.post-button")
let backButton = document.querySelector(".backbutton")
let cancelPostButton = document.querySelector("dialog button.cancel")
let createPostButton = document.querySelector("dialog button.post")
let menuMovel = document.querySelector("nav.menu-movel")
let content = document.querySelector("main")
let modal = document.querySelector("dialog")
let body = document.querySelector("body")
let previousButton = document.querySelector("section.slider .arrows .arrow-left")
let nextButton = document.querySelector("section.slider .arrows .arrow-right")
let projector = document.querySelector("section.slider .projector")
let slider = document.querySelector("section.slider")
let countImage = 0;

let textAreaPost = document.querySelector("dialog textarea")
let inputNamePost = document.querySelector("dialog input#name")
let inputUserPost = document.querySelector("dialog input#user")


let posts = []
let idPost = 0


backButton.onclick = function(){
    menuMovel.classList.toggle("active")
    body.classList.toggle("shrinked")
}

hamburguerButton.onclick = function(){
    menuMovel.classList.toggle("active")
    body.classList.toggle("shrinked")
}

postButton.onclick = function(){
    modal.showModal()
}

cancelPostButton.onclick = function(){
    event.preventDefault()
    modal.close()
}

createPostButton.onclick = function(){
    event.preventDefault()
    
    let post = {
        id: idPost,
        name: inputNamePost.value,
        user: inputUserPost.value,
        description: textAreaPost.value
    }

    idPost++

    posts.push(post)
    
    content.innerHTML += createPost(post)

    modal.close()
};

function createPost(post){
    let isPinned = ""

    if(post.id == 0){
        isPinned = "pinned"
    }

    let div_post =
     `
    <div class="post ${isPinned}" data-post="${post.id}">
        <div class="user">
            <div class="photo"></div>
            <div>
                <h1>${post.name}</h1>
                <span>${post.user}</span>
            </div>
        </div>
        <p>${post.description}</p>
    </div>
    `

    return div_post
}

function changePinned(){
    let pinned = document.querySelector(".post.pinned")
    
    if(pinned != null){
        let new_pinned = posts[Math.floor(Math.random()*posts.length)]
        document.querySelector(`div[data-post="${new_pinned.id}"]`).classList.toggle("pinned")

        pinned.classList.toggle("pinned")
    }
}

setInterval(changePinned, 2000)

let direction = -1;

nextButton.onclick = function(){
    if (direction === 1) {
        projector.prepend(projector.lastElementChild);
        slider.style.justifyContent = "flex-start"
        direction = -1;
    }
    
    projector.style.transform = "translate(-20%)";
}

previousButton.onclick = function(){
    if(direction === -1){
        projector.appendChild(projector.firstElementChild)
        direction = 1;
    }
    slider.style.justifyContent = "flex-end";
    projector.style.transform = "translate(20%)";
}

projector.addEventListener("transitionend", function(){

    if(direction === -1){
        projector.appendChild(projector.firstElementChild)
    }else if(direction === 1){
        projector.prepend(projector.lastElementChild)
    }
    projector.style.transition = "none"
    projector.style.transform = "translate(0)"
    setTimeout(function(){
        projector.style.transition = "all .8s ease"  
    })
})
