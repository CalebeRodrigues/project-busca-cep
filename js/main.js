const consulta = document.querySelector('.consulta');

if (consulta) consulta.addEventListener('click', (e) => {
    consultaCep();
});

function consultaCep() {
    $.ajax({
        url: 'https://viacep.com.br/ws/14781449/json/',
        type: 'GET',
        success: function (response) {
            console.log(response);
            alert(`A rua selecionada foi: ${response.logradouro} no Bairro: ${response.bairro}`);
        }
    })
}