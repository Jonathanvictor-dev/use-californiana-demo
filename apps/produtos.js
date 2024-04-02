const listaDeProdutos = [
    {
        img: 'img/blusa-feminina-rosa.jpg',
        img1: 'img/blusa-feminina-rosa.jpg',
        img2: 'img/blusa-feminina-rosa.jpg',
        alt: 'Blusa de manga curta',
        titulo: 'Camisa Curta',
        descricao:'Clique para ver os tamanhos e cores disponíveis.',
        preco: 49.90,
        tamanho: 'P',
        tamanho1: 'M',
        tamanho2: 'G',
        cor: 'Rosa',
        cor1: 'Branco',
        cor2: 'Azul',
        categoria: 'blusa',
        quantidade: 1 
    },

    {
        img: 'img/vestido-feminino-rosa.jpg',
        img1: 'img/vestido-feminino-rosa.jpg',
        img2: 'img/vestido-feminino-rosa.jpg',
        alt: 'Vestido Floral',
        titulo: 'Vestido Floral',
        descricao:'Clique para ver os tamanhos e cores disponíveis.',
        preco: 79.90,
        tamanho: 'P',
        tamanho1: 'M',
        tamanho2: 'G',
        cor: 'Rosa',
        cor1: 'Roxo',
        cor2: 'Azul',
        categoria: 'vestido',
        quantidade: 1 
    },


];

function exibirListaDeProdutos(produtos = listaDeProdutos) {
    const containerDosProdutos = document.querySelector('.container-main');
    containerDosProdutos.innerHTML = '';

    produtos.forEach((produto, index) => {
        containerDosProdutos.innerHTML += `
        <div class="container-card" id="produto-${index}">
            <div class="card-img">
                <img src="${produto.img}" alt="${produto.alt} "">
            </div>
            <div class="card-info">
                <h3 class="card-titulo">
                    ${produto.titulo} 
                </h3>
                <p class="card-descricao">
                    ${produto.descricao} 
                </p>
                <p class="card-preco">
                    R$ ${produto.preco.toFixed(2)} 
                </p>
            </div>
        </div>
        `
    });

    listaDeProdutos.forEach((produto, index) => {
        const produtoElemento = document.getElementById(`produto-${index}`); // Armazena o index de cada produto 

        if (produtoElemento) { // Verfica se o elemento existe 
            produtoElemento.addEventListener('click', function() {            
                window.location.href = `detalhe-produto.html?indice=${index}`; // Direciona para a tela de detalhes do produto
            });
        };

    });
};

function filtrarCategoria(listaDeProdutos) {
    const listaCategorias = document.querySelectorAll('.itens-lista-categorias');

    listaCategorias.forEach(categoria => {
        categoria.addEventListener('click', function() {
            const categoriaSelecionada = categoria.getAttribute('name').toLowerCase(); // Convertendo para minúsculas
            const produtosFiltrados = listaDeProdutos.filter(produto => produto.categoria.toLowerCase() === categoriaSelecionada);
            exibirListaDeProdutos(produtosFiltrados);
        });
    });
};

const botaoLimparFiltro = document.querySelector('#botao-limpar-filtro');
const inputPesquisa = document.querySelector('#input-pesquisa');

botaoLimparFiltro.addEventListener('click', function() {
    exibirListaDeProdutos(); // Chama a função exibirListaDeProdutos sem passar nenhum argumento
});

inputPesquisa.addEventListener('input', function() {
    const termoPesquisa = inputPesquisa.value.toLowerCase(); // Obtém o termo de pesquisa e converte para minúsculas
    const produtosFiltrados = listaDeProdutos.filter(produto =>
        produto.titulo.toLowerCase().includes(termoPesquisa) ||
        produto.descricao.toLowerCase().includes(termoPesquisa) ||
        produto.categoria.toLowerCase().includes(termoPesquisa)
    ); // Filtra os produtos com base no termo de pesquisa

    exibirListaDeProdutos(produtosFiltrados); // Exibe os produtos filtrados
});

document.addEventListener('DOMContentLoaded', function() {
    const listaCategorias = document.querySelectorAll('.itens-lista-categorias');

    listaCategorias.forEach(function(categoria) {
        categoria.addEventListener('click', function() {
            // Remove a classe 'active' de todos os elementos da lista
            listaCategorias.forEach(function(item) {
                item.classList.remove('active');
            });

            // Adiciona a classe 'active' apenas ao elemento clicado
            this.classList.add('active');
        });
    });
});

exibirListaDeProdutos(listaDeProdutos);
filtrarCategoria(listaDeProdutos);
