const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const btnCarrinhoDetlhePedido = document.querySelector('.container-btn-abrir-carrinho');
const containerCarrinho = document.querySelector('.container-carrinho');
const btnWhatsDuvidas = document.querySelector('#whatsapp');

btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
btnCarrinhoDetlhePedido.addEventListener('click', abrirCarrinho);
btnWhatsDuvidas.addEventListener('click', footerAbrirWhatsDuvidas);

function abrirCarrinho() {
    containerCarrinho.classList.remove('hidden');
};


function footerAbrirWhatsDuvidas() {
    let mensagem = 'Olá, tenho uma dúvida!';    

    const numeroWhatsapp = '82998313115';
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
};

