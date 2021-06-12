const consulta = document.querySelector('.consulta');

if (consulta) consulta.addEventListener('click', (e) => {
    consultaCep();
});

function consultaCep() {
    const cep = document.querySelector('#cep').value;

    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        type: 'GET',
        success: function (response) {
            exibeInformacoes(response);
        }
    })
}

function exibeInformacoes(resp) {
    const html = `
        <br>

        <center><h2>CEP: ${resp.cep}</h2></center>

        <center>
            <p>
                Logradouro: ${resp.logradouro} <br>
                Bairro: ${resp.bairro} <br>
                Localidade: ${resp.localidade} <br>
                UF: ${resp.uf} <br>
                DDD: ${resp.ddd}
            </p>
        </center>
    `;
    $('.main').html(html);
}
