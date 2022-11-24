let user = ""
let groupSelected 

document.querySelector("dialog.hello").addEventListener("cancel", () => {
    event.preventDefault()   
})

document.querySelector("dialog.hello form").addEventListener("submit", () =>{
    event.preventDefault()

    let modal = document.querySelector("dialog.hello")
    let inputName = document.querySelector("input#nome")
    let spanUser = document.querySelector("span.user")

    user = inputName.value
    spanUser.innerHTML = user
    modal.close()

})

document.querySelector("button.create-group").addEventListener("click", () => {
    document.querySelector("dialog.new-group").showModal()
})

document.querySelector("dialog.new-group button:first-child").addEventListener("click", () => {
    document.querySelector("dialog.new-group").close()
})


document.querySelector("dialog.new-group form").addEventListener("submit", () =>{
    event.preventDefault()

    let modal = document.querySelector("dialog.new-group")
    let inputNameGroup = document.querySelector("input#nome-grupo")

    createGroup(inputNameGroup.value)

    modal.close()
})

document.querySelector(".chat form").addEventListener("submit", () =>{
    event.preventDefault()

    let inputContentMessage = document.querySelector("input#message")

    createMessage(inputContentMessage.value)    

    inputContentMessage.value = ""
})

function refreshGroups(){
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos",
    }).then(
        function(response){
            renderizeGroups(response.data);
        }
    ).catch(
        function(error){
            console.log(error);
        }
    )
}

function refreshMessages(groupID){
    axios({
        method: "GET",
        url: `https://server-json-lms.herokuapp.com/grupos/${groupID}/mensagens`,
    }).then(
        function(response){
            renderizeMessages(response.data);
        }
    ).catch(
        function(error){
            console.log(error);
        }
    )
}


function createGroup(nameGroup){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos",
        data: {
            nome: nameGroup
        }
    }).then(
        function(){
            refreshGroups()
        }
    ).catch(
        function(error){
            console.log(error)
        }
    )
}

function createMessage(message){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/mensagens",
        data: {
            nome: user,
            corpo: message,
            grupoId: groupSelected,
        }
    }).then(
        function(){
            refreshMessages(groupSelected)
        }
    ).catch(
        function(error){
            console.log(error)
        }
    )
}

function renderizeMessages(messagesData){
    console.log(messagesData)
    let container = document.querySelector("div.messages");
    container.innerHTML = "";

    for(let message of messagesData){
        if(message.nome == user){
            container.innerHTML += 
            `<div class="message user">
                <p>${message.corpo}</p> 
            </div>`  
        }else{
            container.innerHTML += 
            `<div class="message">
                <span>${message.nome}</span>
                <p>${message.corpo}</p> 
            </div>`  
        } 
    }
}

function renderizeGroups(groupsData){
    let container = document.querySelector("div.cards");

    container.innerHTML = "";

    for(let group of groupsData){
        container.innerHTML += 
        `<div class="group" data-idGroup="${group.id}">
            <div class="image-group"></div>
            <span>${group.nome}</span>
        </div>`   
    }

    for(let group of document.querySelectorAll("div.group")){
        let id = parseInt(group.getAttribute("data-idGroup"))
        group.addEventListener("click", () => {
            refreshMessages(id)

            groupSelected = id
            removeSelectedGroups()
            group.classList.add("selected")
        })
    }
}

function removeSelectedGroups(){
    for(let group of document.querySelectorAll("div.group")){
        group.classList.remove("selected")
    }
}

document.querySelector("dialog.hello").showModal()
refreshGroups()