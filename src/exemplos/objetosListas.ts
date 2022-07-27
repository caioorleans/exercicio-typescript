const pessoa = {
    nome: "Marina",
    idade: 30,
    profissao: "Advogada"
}

pessoa.idade = 29;

const andre: {nome: string, idade:number, profissao: string} = {
    nome: 'André',
    idade: 21,
    profissao: 'desenvolvedor'
};

enum Profissao {
    professora,
    atriz,
    desenvolvedora,
    jogadora
}

interface Pessoa {
    nome: string,
    idade: number,
    profissao?: Profissao,
}

interface Estudante extends Pessoa{
    materias: string[]
}

const vanessa: Pessoa = {
    nome: 'Vanessa',
    idade: 53,
    profissao: Profissao.desenvolvedora
}

const jessica: Estudante = {
    nome:'Jessica',
    idade:28,
    profissao:Profissao.atriz,
    materias:['Matemática', 'Português']
}

const eduarda: Estudante = {
    nome:'Eduarda',
    idade:28,
    materias:['Matemática']
}

function listar(lista: string[]){
    for(const item in lista){
        console.log('- ', item);
    }
}

listar(jessica.materias);