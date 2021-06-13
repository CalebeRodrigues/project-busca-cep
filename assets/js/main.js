const consulta = document.querySelector('.consulta');

const alertas = document.querySelector('.alertas');

if (consulta) consulta.addEventListener('click', (e) => {    
    consultaCep();
});

function consultaCep() {
    hideMsgAlerta();
    const progressBar = document.querySelector('.progress');
    progressBar.classList.remove('display-none');
    progressBar.classList.add('display-flex');

    aumentaProgressBar();

    $('.main').html('');
    const cep = document.querySelector('#cep').value;

    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        type: 'GET',
        success: function (response) {
            setTimeout(() => {
                progressBar.classList.remove('display-flex');
                progressBar.classList.add('display-none');
                exibeInformacoes(response);
            }, 1350);
        },
        error: () => { 
            setTimeout(() => {
                progressBar.classList.remove('display-flex');
                progressBar.classList.add('display-none');
                exibeMSG('Por favor digite um CEP válido');
            }, 1250);
        }
    });
    
}

function exibeMSG(msg) {
    alertas.innerText = msg;
    showMsgAlerta();
}

function exibeInformacoes(resp) {
    if(!resp.cep) return exibeMSG('Por favor digite um CEP válido');

    hideMsgAlerta();
    const html = `
        <br>

        <h2 class="position-absolute start-50 translate-middle my-2 titulo">
            Resultado da busca pelo CEP ${resp.cep}
        </h2>

        <br><br>
        
            <p>
                Logradouro: ${resp.logradouro} <br>
                Bairro: ${resp.bairro} <br>
                Localidade: ${resp.localidade} <br>
                UF: ${resp.uf} <br>
                DDD: ${resp.ddd}
            </p>
        
    `;
    $('.main').html(html);
}

function showMsgAlerta() {
    alertas.classList.add('display-flex');
    alertas.classList.remove('display-none');
}

function hideMsgAlerta() {
    alertas.classList.add('display-none');
    alertas.classList.remove('display-flex');
}

function aumentaProgressBar () {
    const progressBar = document.querySelector('.progress-bar');
    
    progressBar.classList.add('progress-value');
}
