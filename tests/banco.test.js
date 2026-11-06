import { describe, it, expect } from 'vitest';
import { Banco } from '../src/banco.js';

describe('Banco', () => {
  it('debe crear una cuenta con saldo inicial 0', () => {
    const banco = new Banco('Banco IW');
    const cuenta = banco.crearCuenta('Ana Pérez', 'ES1111111111');
    expect(cuenta.saldo).toBe(0);
    expect(cuenta.titular).toBe('Ana Pérez');
  });

  it('debe lanzar error si el número de cuenta ya existe', () => {
    const banco = new Banco('Banco IW');
    banco.crearCuenta('Ana', 'ES1111111111');
    expect(() => banco.crearCuenta('Luis', 'ES1111111111')).toThrow(
      'Ya existe una cuenta con ese número'
    );
  });

  it('debe buscar una cuenta por número', () => {
    const banco = new Banco('Banco IW');
    const cuenta = banco.crearCuenta('Ana', 'ES2222222222');
    expect(banco.buscarCuenta('ES2222222222')).toBe(cuenta);
    expect(banco.buscarCuenta('ES-inexistente')).toBeNull();
  });

  it('debe listar todas las cuentas', () => {
    const banco = new Banco('Banco IW');
    banco.crearCuenta('Ana', 'ES3333333333');
    banco.crearCuenta('Luis', 'ES4444444444');
    expect(banco.cuentas).toHaveLength(2);
  });

  it('debe transferir entre dos cuentas del banco', () => {
    const banco = new Banco('Banco IW');
    const origen = banco.crearCuenta('Ana', 'ES5555555555', 1000);
    const destino = banco.crearCuenta('Luis', 'ES6666666666');
    banco.transferir('ES5555555555', 'ES6666666666', 250);
    expect(origen.saldo).toBe(750);
    expect(destino.saldo).toBe(250);
  });

  it('debe lanzar error si alguna cuenta no existe al transferir', () => {
    const banco = new Banco('Banco IW');
    expect(() => banco.transferir('ES5555555555', 'ES6666666666', 10)).toThrow(
      'Cuenta no encontrada'
    );
  });

  it('debe calcular el saldo total del banco', () => {
    const banco = new Banco('Banco IW');
    banco.crearCuenta('Ana', 'ES7777777777', 100);
    banco.crearCuenta('Luis', 'ES8888888888', 250);
    expect(banco.saldoTotal()).toBe(350);
  });
});
