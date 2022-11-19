const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const screenType = params.id ? 'edit' : 'create';

function createOrEdit(){
    //Inicia a massa de dados
    let payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        totalCost: document.querySelector('#totalCost').value,
        idClient: localStorage.getItem("idClient")
    }

    //Enviar para API
    fetch(`https://63445b95242c1f347f84beac.mockapi.io/api/projects${screenType == 'edit' ? '/' + params.id : ''}`, {
        method: screenType == 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if(screenType == 'edit'){
            Swal.fire({
                title: 'Bom trabalho!',
                text: "Editado com sucesso!",
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "list.html"
                }
              })
        }
        else{
            Swal.fire({
                title: 'Bom trabalho!',
                text: "Cadastrado com sucesso!",
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "list.html"
                }
              })
        }
    })
    .catch(error => {
        Swal.fire(
            'Oops!',
            'Erro no servidor',
            'error'
          )
        console.log(error)
    })
}

window.onload = function(){
    setScreenTypeTexts();
    fillInputs();
}

function fillInputs() {
    if (screenType === 'edit') {
        fetch(`https://622cd1e6087e0e041e147214.mockapi.io/api/projects/${params.id}`)
            .then(response => response.json())
            .then(project => {
                document.querySelector("#title").value = project.title;
                document.querySelector("#totalCost").value = project.totalCost;
                document.querySelector("#description").value = project.description;
            })
    }
}

function setScreenTypeTexts(){
    //MODO CRIAR
    if(screenType == 'create'){
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar"
    }

    //MODO EDITAR
    if(screenType == 'edit'){
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar"
    }
}