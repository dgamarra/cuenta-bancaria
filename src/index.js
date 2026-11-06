import { Banco } from './banco.js';

// Demo de la app bancaria: node src/index.js
const banco = new Banco('Banco IW');

const ana = banco.crearCuenta('Ana Pérez', 'ES1111111111', 1000);
const luis = banco.crearCuenta('Luis Gómez', 'ES2222222222', 200);

console.log(`Titular: ${ana.titular} | Saldo: ${ana.verSaldo()}`);

ana.depositar(500);
console.log(`Tras depósito de 500: ${ana.verSaldo()}`);

ana.retirar(300);
console.log(`Tras retiro de 300: ${ana.verSaldo()}`);

banco.transferir('ES1111111111', 'ES2222222222', 400);
console.log(`Tras transferencia de 400 a Luis: Ana=${ana.verSaldo()} Luis=${luis.verSaldo()}`);

console.log(`Saldo total del banco: ${banco.saldoTotal()}`);
