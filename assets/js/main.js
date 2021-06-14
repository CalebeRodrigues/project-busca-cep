const responsiveMode = function () {
    const formNav = document.querySelector('.form-nav-cep');
    const form = document.querySelector('.form-cep-control');
    
    setInterval(() => {
        if (screen.width < 769) {
            show(form, formNav);
            screenResize(1);
        }
        
        else { 
            screenResize(2);
            show(formNav, form) 
        };

    }, 1);
}

function screenResize (tipo) {
    if (tipo === 1) {
        const navbar = document.querySelector('.navbar-brand');
        navbar.classList.add('fonte-grande');
        const containerPrincipal = document.querySelector('.container') || document.querySelector('.principal');
        containerPrincipal.classList.remove('container');
        containerPrincipal.classList.add('p-4');
        containerPrincipal.classList.add('fonte-grande');
        containerPrincipal.classList.add('principal');
    }
    else if (tipo === 2) {
        const navbar = document.querySelector('.navbar-brand');
        navbar.classList.remove('fonte-grande');
        const containerPrincipal = document.querySelector('.principal') || document.querySelector('.container');
        containerPrincipal.classList.add('container');
        containerPrincipal.classList.remove('p-4');
        containerPrincipal.classList.remove('fonte-grande');
        containerPrincipal.classList.remove('principal');        
    }
}

function show (showForm, hideForm) {
    showForm.classList.add('display-flex');
    showForm.classList.remove('display-none');
    hide(hideForm);
}

function hide (hideForm) {
    hideForm.classList.remove('display-flex');
    hideForm.classList.add('display-none');
}

responsiveMode();

// --------------------------------------------------------------- //

const consultaNav = document.querySelector('.consulta-nav');
const consulta = document.querySelector('.consulta');

const alertas = document.querySelector('.alertas');

if (consultaNav) consultaNav.addEventListener('click', (e) => {    
    consultaCep('#cep-nav');
});

if (consulta) consulta.addEventListener('click', (e) => {    
    consultaCep('#cep');
});

function consultaCep(id) {
    hideMsgAlerta();
    const progressBar = document.querySelector('.progress');
    progressBar.classList.remove('display-none');
    progressBar.classList.add('display-flex');

    aumentaProgressBar();

    $('.main').html('');
    const cep = document.querySelector(id).value;

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
            showErrorMSG(progressBar, 'Por favor digite um CEP válido');          
        }
    });
    
}

function exibeMSG(msg) {
    alertas.innerText = msg;
    showMsgAlerta();
}

function exibeInformacoes(resp) {
    if(!resp.cep) return showErrorMSGTime(document.querySelector('.progress'), 'Por favor digite um CEP válido', 0);

    hideMsgAlerta();
    const html = `
        <br>

        <p class="position-absolute start-50 w-100 translate-middle my-2 p-1 titulo">
            Resultado da busca pelo CEP ${resp.cep}
        </p>

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

function showErrorMSG (progressBar, msg) {
    progressBar.classList.add('display-flex');
    progressBar.classList.remove('display-none');
    setTimeout(() => {
        progressBar.firstElementChild.classList.add('progress-error');
        setTimeout(() => {
            progressBar.classList.remove('display-flex');
            progressBar.classList.add('display-none');
            progressBar.firstElementChild.classList.remove('progress-error');
            exibeMSG(msg);
        }, 950);    
    }, 810);  
}

function showErrorMSGTime (progressBar, msg, time) {
    progressBar.classList.add('display-flex');
    progressBar.classList.remove('display-none');
    setTimeout(() => {
        progressBar.firstElementChild.classList.add('progress-error');
        setTimeout(() => {
            progressBar.classList.remove('display-flex');
            progressBar.classList.add('display-none');
            progressBar.firstElementChild.classList.remove('progress-error');
            exibeMSG(msg);
        }, 950);    
    }, time);  
}
