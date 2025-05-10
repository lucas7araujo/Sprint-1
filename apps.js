function adicionarNoticia() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const conteudo = document.getElementById('conteudo').value;
    const data = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    if (!titulo || !autor || !conteudo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const id = Date.now();

    const noticia = { id, titulo, autor, conteudo, data };
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.push(noticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));

    const noticiasContainer = document.getElementById('noticias-container');
    noticiasContainer.innerHTML = '';

    const noticiaDiv = document.createElement('div');
    noticiaDiv.classList.add('noticia');
    noticiaDiv.setAttribute('data-id', id);

    const h4 = document.createElement('h4');
    h4.textContent = titulo;

    const pAutor = document.createElement('p');
    pAutor.textContent = `Autor: ${autor}`;

    const pConteudo = document.createElement('p');
    pConteudo.textContent = conteudo;

    const pData = document.createElement('p');
    pData.textContent = `Publicado em ${data}.`;
    pData.classList.add('data-noticia');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('botaoeditar');
    btnEditar.onclick = () => editarNoticia(h4, pAutor, pConteudo, btnEditar, btnExcluir, containerBotoes, id);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.classList.add('botaoexcluir');
    btnExcluir.onclick = () => excluirNoticia(id, noticiaDiv);

    const containerBotoes = document.createElement('div');
    containerBotoes.classList.add('container-botoes');
    containerBotoes.appendChild(btnEditar);
    containerBotoes.appendChild(btnExcluir);

    noticiaDiv.appendChild(h4);
    noticiaDiv.appendChild(pAutor);
    noticiaDiv.appendChild(pConteudo);
    noticiaDiv.appendChild(pData);
    noticiaDiv.appendChild(containerBotoes);

    noticiasContainer.appendChild(noticiaDiv);

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('conteudo').value = '';
}

function editarNoticia(h4, pAutor, pConteudo, btnEditar, btnExcluir, containerBotoes, id) {
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

        let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

        let index = noticias.findIndex(n => n.id === id);

        if (index !== -1) {
            noticias[index].titulo = h4.textContent;
            noticias[index].autor = pAutor.textContent.replace('Autor: ', '');
            noticias[index].conteudo = pConteudo.textContent;

            localStorage.setItem('noticias', JSON.stringify(noticias));
        }

        containerBotoes.innerHTML = '';
        containerBotoes.appendChild(btnEditar);
        containerBotoes.appendChild(btnExcluir);
    };

    containerBotoes.innerHTML = '';
    containerBotoes.appendChild(btnSalvar);
}

function excluirNoticia(id, noticiaDiv) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

    let index = noticias.findIndex(n => n.id === id);

    if (index !== -1) {
        noticias.splice(index, 1);
        localStorage.setItem('noticias', JSON.stringify(noticias));
    }

    noticiaDiv.remove();
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

                btnExcluir.onclick = () => {
                    noticiaDiv.remove();
                
                    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
                
                    let index = noticias.findIndex(n => n.id === noticia.id);
                
                    if (index !== -1) {
                        noticias.splice(index, 1);
                        localStorage.setItem('noticias', JSON.stringify(noticias));
                    }
                };

                noticiaDiv.appendChild(btnExcluir);
                listaNoticias.appendChild(noticiaDiv);
            });
        }
    }
});

const hoje = new Date();
const dataFormatada = hoje.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
document.getElementById('data-atual').textContent = dataFormatada;
