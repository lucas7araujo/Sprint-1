function adicionarNoticia() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const conteudo = document.getElementById('conteudo').value;


    const noticia = { titulo, autor, conteudo };
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.push(noticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));


    const noticiasContainer = document.getElementById('noticias-container');
    noticiasContainer.innerHTML = '';


    const noticiaDiv = document.createElement('div');
    noticiaDiv.classList.add('noticia');


    const h4 = document.createElement('h4');
    h4.textContent = titulo;

    const pAutor = document.createElement('p');
    pAutor.textContent = `Autor: ${autor}`;

    const pConteudo = document.createElement('p');
    pConteudo.textContent = conteudo;


    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('botaoeditar');
    btnEditar.onclick = () => editarNoticia(h4, pAutor, pConteudo, btnEditar, btnExcluir, containerBotoes);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.classList.add('botaoexcluir');
    btnExcluir.onclick = () => noticiaDiv.remove();


    const containerBotoes = document.createElement('div');
    containerBotoes.classList.add('container-botoes');


    containerBotoes.appendChild(btnEditar);
    containerBotoes.appendChild(btnExcluir);


    noticiaDiv.appendChild(h4);
    noticiaDiv.appendChild(pAutor);
    noticiaDiv.appendChild(pConteudo);
    noticiaDiv.appendChild(containerBotoes);


    noticiasContainer.appendChild(noticiaDiv);

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('conteudo').value = '';
}

function editarNoticia(h4, pAutor, pConteudo, btnEditar, btnExcluir, containerBotoes) {

    const inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.value = h4.textContent;
    inputTitulo.classList.add('input-editar');

    const inputAutor = document.createElement('input');
    inputAutor.type = 'text';
    inputAutor.value = pAutor.textContent.replace('Autor: ', '');
    inputAutor.classList.add('input-editar');

    const textareaConteudo = document.createElement('textarea');
    textareaConteudo.value = pConteudo.textContent;
    textareaConteudo.classList.add('textarea-editar');


    h4.replaceWith(inputTitulo);
    pAutor.replaceWith(inputAutor);
    pConteudo.replaceWith(textareaConteudo);

    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('botaosalvar');


    btnSalvar.onclick = () => {
        h4.textContent = inputTitulo.value;
        pAutor.textContent = `Autor: ${inputAutor.value}`;
        pConteudo.textContent = textareaConteudo.value;

        inputTitulo.replaceWith(h4);
        inputAutor.replaceWith(pAutor);
        textareaConteudo.replaceWith(pConteudo);

        containerBotoes.innerHTML = '';
        containerBotoes.appendChild(btnEditar);
        containerBotoes.appendChild(btnExcluir);
    };

    containerBotoes.innerHTML = '';
    containerBotoes.appendChild(btnSalvar);
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('detalhes.html')) {
        const listaNoticias = document.getElementById('lista-noticias');
        const noticias = JSON.parse(localStorage.getItem('noticias')) || [];

        if (noticias.length === 0) {
            listaNoticias.innerHTML = "<p class='msg-info'>Nenhuma notícia salva.</p>";
        } else {
            noticias.forEach((noticia, index) => {
                const noticiaDiv = document.createElement('div');
                noticiaDiv.classList.add('noticia');

                noticiaDiv.innerHTML = `
                    <h2>${noticia.titulo}</h2>
                    <p><strong>Autor:</strong> ${noticia.autor}</p>
                    <p>${noticia.conteudo}</p>
                `;

                
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.classList.add('botaoexcluir');

                
                btnExcluir.onclick = () => excluirNoticia(index);

                noticiaDiv.appendChild(btnExcluir); 
                listaNoticias.appendChild(noticiaDiv);
            });
        }
    }
});

function excluirNoticia(index) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

    noticias.splice(index, 1);

    localStorage.setItem('noticias', JSON.stringify(noticias)); 
    location.reload(); 
}




const hoje = new Date();
const dataFormatada = hoje.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
document.getElementById('data-atual').textContent = dataFormatada; 
