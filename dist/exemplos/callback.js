"use strict";
function printaValoresNumericos(numero1, numero2) {
    console.log(numero1 + numero2);
}
function somarValoresNumericos(numero1, numero2, callback) {
    let resultado = numero1 + numero2;
    return callback(resultado);
}
function aoQuadrado(numero) {
    return numero * numero;
}
console.log(somarValoresNumericos(1, 4, aoQuadrado));
