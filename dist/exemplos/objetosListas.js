"use strict";
const pessoa = {
    nome: "Marina",
    idade: 30,
    profissao: "Advogada"
};
pessoa.idade = 29;
const andre = {
    nome: 'André',
    idade: 21,
    profissao: 'desenvolvedor'
};
var Profissao;
(function (Profissao) {
    Profissao[Profissao["professora"] = 0] = "professora";
    Profissao[Profissao["atriz"] = 1] = "atriz";
    Profissao[Profissao["desenvolvedora"] = 2] = "desenvolvedora";
    Profissao[Profissao["jogadora"] = 3] = "jogadora";
})(Profissao || (Profissao = {}));
const vanessa = {
    nome: 'Vanessa',
    idade: 53,
    profissao: Profissao.desenvolvedora
};
const jessica = {
    nome: 'Jessica',
    idade: 28,
    profissao: Profissao.atriz,
    materias: ['Matemática', 'Português']
};
const eduarda = {
    nome: 'Eduarda',
    idade: 28,
    materias: ['Matemática']
};
function listar(lista) {
    for (const item in lista) {
        console.log('- ', item);
    }
}
listar(jessica.materias);
