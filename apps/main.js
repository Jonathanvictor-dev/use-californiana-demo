const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const btnCarrinhoDetlhePedido = document.querySelector('.container-btn-abrir-carrinho');
const containerCarrinho = document.querySelector('.container-carrinho')

btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
btnCarrinhoDetlhePedido.addEventListener('click', abrirCarrinho)

function abrirCarrinho() {
    containerCarrinho.classList.remove('hidden');
};


