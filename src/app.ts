//desafio 1

interface Employee {
    code: number,
    name: string,
}

const Caio: Employee = {
    code: 1,
    name: "Caio"
}

//desafio 2

enum Trabalho {
    atriz,
    padeiro
}

interface Humano {
    nome: string,
    idade: number,
    profissao: Trabalho
}

const pessoa1: Humano = {
    nome: "Maria",
    idade: 29,
    profissao: Trabalho.atriz
}

const pessoa2: Humano = {
    nome: "Roberto",
    idade: 19,
    profissao: Trabalho.padeiro
}

const pessoa3: Humano = {
    nome: "Laura",
    idade: 32,
    profissao: Trabalho.atriz
}

const pessoa4: Humano = {
    nome: "Carlos",
    idade: 19,
    profissao: Trabalho.padeiro
}

//desafio 3

let botaoAtualizar = document.getElementById('atualizar-saldo') as HTMLButtonElement;
let botaoLimpar = document.getElementById('limpar-saldo') as HTMLButtonElement;
let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo') as HTMLSpanElement;

campoSaldo.innerHTML = '0';

function somarAoSaldo(soma: number) {
    campoSaldo.innerHTML += soma;
}

function limparSaldo() {
    campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', function () {
    somarAoSaldo(Number(soma.value));
});

botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */


//desafio 4

let apiKey: string = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken: string;
let username: string;
let password: string;
let sessionId: number;
let listId = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLDivElement;
let searchInput = document.getElementById('search') as HTMLInputElement;

loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
})

searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = searchInput.value;

    let listaDeFilmes:any = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title))
        ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
})

function preencherSenha() {
    let inputSenha = document.getElementById('senha') as HTMLInputElement;
    password = inputSenha.value;
    validateLoginButton();
}

function preencherLogin() {
    let inputUsername = document.getElementById('login') as HTMLInputElement;
    username = inputUsername.value;
    validateLoginButton();
}

function preencherApi() {
    let inputApiKey = document.getElementById('api-key') as HTMLInputElement;
    apiKey = inputApiKey.value;
    validateLoginButton();
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

interface Requisicao{
    url:string,
    method:string,
    body?:any
}

interface Body{
    username: string,
    password: string,
    request_token: string
}

class HttpClient {
    static async get(req: Requisicao):Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(req.method, req.url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (req.body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                req.body = JSON.stringify(req.body);
            }
            request.send(req.body);
        })
    }
}

async function procurarFilme(query:string): Promise<unknown>{
    query = encodeURI(query)
    console.log(query)
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
    return result
}

async function adicionarFilme(filmeId:number) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}

async function criarRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    })
    requestToken = result.request_token
}

async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    })
}

async function criarSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
}

async function criarLista(nomeDaLista:string, descricao:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    })
    console.log(result);
}

async function adicionarFilmeNaLista(filmeId:number, listaId:number) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
    console.log(result);
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
}

{/* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/}