document.addEventListener('DOMContentLoaded', function() { 
    const urlParams = new URLSearchParams(window.location.search); 
    const indice = urlParams.get('indice');
    const produto = listaDeProdutos[indice];
    const containerDetalheDoProduto = document.querySelector('.container-info-item');

    containerDetalheDoProduto.innerHTML = `
    <div class="info-item">
        <div class="info-item-img">
            
        <div class="carousel-container">
            <div class="carousel">
                <div class="carousel-item">
                    <img src="${produto.img}" alt="${produto.alt}">
                </div>
                <div class="carousel-item">
                    <img src="${produto.img1}" alt="${produto.alt}">
                </div>
                <div class="carousel-item">
                    <img src="${produto.img2}" alt="${produto.alt}">
                </div>
            </div>
            <button class="prev-btn"><i class="fa-solid fa-backward"></i></button>
            <button class="next-btn"><i class="fa-solid fa-forward"></i></button>
        </div>

            <a href="index.html" class="btn-voltar">
                <i class="fa-solid fa-angle-left"></i>
            </a>
        </div>

        <h3 class="info-item-titulo">
            ${produto.titulo}
        </h3>

        <div class="preco-quantidade">
            <div class="container-preco">
                <span>R$ ${produto.preco.toFixed(2)}</span>
            </div>

            <div class="container-quantidade">
                <i class="fa-solid fa-minus" id="decrease-btn"></i>
                <span>${produto.quantidade}</span>
                <i class="fa-solid fa-plus" id="increase-btn"></i>
            </div>
        </div>
    </div>

    <div class="tamanho-cor">
        <div class="container-tamanho">
        <h3 class="tamanho-titulo">
            Tamanho disponivel 
        </h3>

        <div class="container-tamanho-input">
        <div class="container-input">
                <input class="input-radio" type="radio" name="tamanho" id="${produto.tamanho}" checked>
                <label for="${produto.tamanho}">${produto.tamanho}</label>                        
            </div>
            <div class="container-input">
                <input class="input-radio" type="radio" name="tamanho" id="${produto.tamanho1}">
                <label for="${produto.tamanho1}">${produto.tamanho1}</label>                        
            </div>
            <div class="container-input">
                <input class="input-radio" type="radio" name="tamanho" id="${produto.tamanho2}">
                <label for="${produto.tamanho2}">${produto.tamanho2}</label>                        
            </div>
        </div>
    </div>

    <div class="container-cor">
        <h3 class="tamanho-titulo">
            Cor disponivel 
        </h3>

        <div class="container-cor-input">
            <div class="container-input">
                <input class="input-radio" type="radio" name="cor" id="${produto.cor}" checked>
                <label for="${produto.cor}">${produto.cor}</label>                        
            </div>
            <div class="container-input">
                <input class="input-radio" type="radio" name="cor" id="${produto.cor1}">
                <label for="${produto.cor1}">${produto.cor1}</label>                        
            </div>
            <div class="container-input">
                <input class="input-radio" type="radio" name="cor" id="${produto.cor2}">
                <label for="${produto.cor2}">${produto.cor2}</label>                        
            </div>
        </div>
    </div>

    <div class="container-btn-finalizar">
        <input type="button" value="Adicionar ao carrinho" id="adicionar-carrinho">
    </div>
    `;

    function atualizarQuantidade(valor) {
        const quantidadeElemento = containerDetalheDoProduto.querySelector('.container-quantidade span');
        produto.quantidade += valor;
        quantidadeElemento.textContent = produto.quantidade;
    };

    const decreaseBtn = containerDetalheDoProduto.querySelector('#decrease-btn');
    const increaseBtn = containerDetalheDoProduto.querySelector('#increase-btn');

    decreaseBtn.addEventListener('click', function() {
        if (produto.quantidade > 1) {
            atualizarQuantidade(-1);
        }
    });

    increaseBtn.addEventListener('click', function() {
        atualizarQuantidade(1);
    });

    const adicionarCarrinhoBtn = containerDetalheDoProduto.querySelector('#adicionar-carrinho');

    adicionarCarrinhoBtn.addEventListener('click', function() {
        const tamanhoSelecionado = containerDetalheDoProduto.querySelector('input[name="tamanho"]:checked').id;
        const corSelecionada = containerDetalheDoProduto.querySelector('input[name="cor"]:checked').id;
        adicionarProdutoAoCarrinho(produto, tamanhoSelecionado, corSelecionada);
        exibirNoCarrinho();
    });

    function adicionarProdutoAoCarrinho(produto, tamanhoSelecionado, corSelecionada) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let produtoExistente = carrinho.find(item => item.titulo === produto.titulo && item.tamanho === tamanhoSelecionado && item.cor === corSelecionada);
        
        if (produtoExistente) {
            produtoExistente.quantidade += 1; // Incrementa a quantidade do produto existente
        } else {
            const produtoNoCarrinho = {
                imagem: produto.img,
                titulo: produto.titulo,
                preco: produto.preco,
                quantidade: 1,
                tamanho: tamanhoSelecionado,
                cor: corSelecionada 
            };
            carrinho.push(produtoNoCarrinho); // Adiciona o novo produto ao carrinho
        }
    
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        const mensagem = document.createElement('div');
        mensagem.textContent = 'Produto adicionado ao carrinho!';
        mensagem.classList.add('mensagem-adicionado-ao-carrinho');
        document.body.appendChild(mensagem);

        // Remover a mensagem após 3 segundos
        setTimeout(() => {
            mensagem.remove();
        }, 3000);

    };
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
        showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
});