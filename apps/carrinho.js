document.addEventListener('DOMContentLoaded', function() {
    const fecharCarrinhoBtn = document.querySelector('#fechar-carrinho');
    const containerCarrinho = document.querySelector('.container-carrinho');

    fecharCarrinhoBtn.addEventListener('click', function() {
        containerCarrinho.classList.add('hidden');
    });

    exibirNoCarrinho();
    exibirValorTotalEQuantidade();

    const finalizarPedidoBtn = document.querySelector('#finalizar-pedido');
    finalizarPedidoBtn.addEventListener('click', function() {
        const total = exibirValorTotalEQuantidade();
        enviarParaWhatsapp(total);
    });
});

function exibirNoCarrinho() {
    const carrinhoItens = document.querySelector('.carrinho-itens');
    const carrinhoTotal = document.querySelector('.carrinho-total span');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;

    carrinhoItens.innerHTML = ''; 

    carrinho.forEach((produto, index) => {
        const itemCarrinho = `
            <div class="carrinho-info">
                <div class="carrinho-img">
                    <img src="${produto.imagem}" alt="${produto.titulo}">
                </div>
                <div class="card-info-produto">
                    <h3 class="card-titulo">
                        ${produto.titulo}
                    </h3>
                    <p class="card-preco">
                        R$ ${produto.preco.toFixed(2)}
                    </p>
                </div>

                <div class="carrinho-qnt">
                    <span class="remover-item" data-index="${index}">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </span>
                    <p class="qtd-item">
                        Qtd: ${produto.quantidade}
                    </p>
                    <div class="container-preco-quantidade">
                        <span>Tamanho: ${produto.tamanho}</span>
                        <span>Cor: ${produto.cor}</span>
                    </div>
                </div>               
            </div>
        `;
        carrinhoItens.innerHTML += itemCarrinho;
        total += produto.preco * produto.quantidade;
    });

    carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Adicionar evento de clique para os botões de remover item
    const botoesRemoverItem = document.querySelectorAll('.remover-item');
    botoesRemoverItem.forEach(botao => {
        botao.addEventListener('click', function() {
            const index = botao.getAttribute('data-index');
            removerItemDoCarrinho(index);
        });
    });
};

function removerItemDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item do carrinho pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirNoCarrinho(); // Atualiza a exibição do carrinho após remover o item
    exibirValorTotalEQuantidade();
};

function exibirValorTotalEQuantidade() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;
    let totalQuantidade = 0;

    carrinho.forEach((produto) => {
        total += produto.preco * produto.quantidade;
        totalQuantidade += produto.quantidade;
    });

    const exibirValorTotal = document.querySelector('.header-nav-preco');
    const exibirQuantidadeTotal = document.querySelector('.indice-carrinho');

    exibirValorTotal.textContent = total.toFixed(2);
    exibirQuantidadeTotal.textContent = totalQuantidade;

    return total.toFixed(2);
};

function enviarParaWhatsapp(total) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let mensagem = 'Olá! Gostaria de fazer o pedido:\n\n';

    carrinho.forEach((produto, index) => {
        mensagem += `   *Peça:* ${produto.titulo}\n`;
        mensagem += `   *Preço:* R$ ${produto.preco.toFixed(2)}\n`;
        mensagem += `   *Quantidade:* ${produto.quantidade}\n`;
        mensagem += `   *Tamanho:* ${produto.tamanho}\n`;
        mensagem += `   *Cor:* ${produto.cor}\n\n`;
    });

    mensagem += `*Total: R$ ${total}*`;

    // Constroi o link do WhatsApp com a mensagem
    const numeroWhatsapp = '82998313115';
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    // Abre a página do WhatsApp com a mensagem pré-preenchida
    window.open(url, '_blank');
};