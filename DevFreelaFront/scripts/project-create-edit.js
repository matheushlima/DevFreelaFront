const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const screenType = params.id ? 'edit' : 'create';

function createOrEdit(){
    //Inicia a massa de dados
    let payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        totalCost: document.querySelector('#totalCost').value,
        idClient: 1
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
            alert('Editado com sucesso!');
        }
        else{
            alert('Cadastrado com sucesso!');
        }
        
    })
    .catch(error => {
        alert('Erro no servidor');
        console.log(error)
    })
}

window.onload = function(){
    setScreenTypeTexts();
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