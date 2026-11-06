import { describe, it, expect, beforeEach } from 'vitest';
import { CuentaBancaria } from '../src/cuentaBancaria.js';

describe('CuentaBancaria', () => {
  let cuenta;

  beforeEach(() => {
    cuenta = new CuentaBancaria('Ana Pérez', 'ES1234567890', 1000);
  });

  describe('constructor', () => {
    it('debe crear una cuenta con titular, número y saldo inicial', () => {
      expect(cuenta.titular).toBe('Ana Pérez');
      expect(cuenta.numeroCuenta).toBe('ES1234567890');
      expect(cuenta.saldo).toBe(1000);
    });

    it('debe permitir crear una cuenta sin saldo inicial (saldo 0)', () => {
      const nueva = new CuentaBancaria('Luis Gómez', 'ES0000000001');
      expect(nueva.saldo).toBe(0);
    });

    it('debe lanzar error si el saldo inicial es negativo', () => {
      expect(() => new CuentaBancaria('Ana', 'ES1', -20)).toThrow(
        'El saldo inicial no puede ser negativo'
      );
    });

    it('debe lanzar error si faltan datos obligatorios', () => {
      expect(() => new CuentaBancaria('', 'ES1', 100)).toThrow(
        'El titular es obligatorio'
      );
      expect(() => new CuentaBancaria('Ana', '', 100)).toThrow(
        'El número de cuenta es obligatorio'
      );
    });
  });

  describe('verSaldo', () => {
    it('debe devolver el saldo actual', () => {
      expect(cuenta.verSaldo()).toBe(1000);
    });

    it('debe reflejar el saldo tras varias operaciones', () => {
      cuenta.depositar(500);
      cuenta.retirar(200);
      expect(cuenta.verSaldo()).toBe(1300);
    });
  });

  describe('depósito', () => {
    it('debe sumar el monto depositado al saldo', () => {
      const nuevoSaldo = cuenta.depositar(250);
      expect(cuenta.saldo).toBe(1250);
      expect(nuevoSaldo).toBe(1250);
    });

    it('debe acumular varios depósitos', () => {
      cuenta.depositar(100);
      cuenta.depositar(200);
      expect(cuenta.saldo).toBe(1300);
    });

    it('debe lanzar error si el monto no es un número válido', () => {
      expect(() => cuenta.depositar('abc')).toThrow('Monto inválido');
      expect(() => cuenta.depositar(NaN)).toThrow('Monto inválido');
    });

    it('debe lanzar error si el monto es cero o negativo', () => {
      expect(() => cuenta.depositar(0)).toThrow('El monto debe ser mayor que 0');
      expect(() => cuenta.depositar(-50)).toThrow('El monto debe ser mayor que 0');
    });

    it('debe aceptar montos con decimales redondeados a 2 cifras', () => {
      cuenta.depositar(10.555);
      expect(cuenta.saldo).toBe(1010.56);
    });
  });

  describe('retiro', () => {
    it('debe restar el monto retirado del saldo', () => {
      const nuevoSaldo = cuenta.retirar(400);
      expect(cuenta.saldo).toBe(600);
      expect(nuevoSaldo).toBe(600);
    });

    it('debe lanzar error si no hay fondos suficientes', () => {
      expect(() => cuenta.retirar(2000)).toThrow('Fondos insuficientes');
      expect(cuenta.saldo).toBe(1000);
    });

    it('debe permitir retirar exactamente todo el saldo', () => {
      cuenta.retirar(1000);
      expect(cuenta.saldo).toBe(0);
    });

    it('debe lanzar error si el monto es cero o negativo', () => {
      expect(() => cuenta.retirar(0)).toThrow('El monto debe ser mayor que 0');
      expect(() => cuenta.retirar(-10)).toThrow('El monto debe ser mayor que 0');
    });

    it('debe lanzar error si el monto no es un número válido', () => {
      expect(() => cuenta.retirar(undefined)).toThrow('Monto inválido');
    });
  });

  describe('transferencia', () => {
    let destino;

    beforeEach(() => {
      destino = new CuentaBancaria('Luis Gómez', 'ES9876543210', 200);
    });

    it('debe mover el saldo de la cuenta origen a la destino', () => {
      const resultado = cuenta.transferir(300, destino);
      expect(cuenta.saldo).toBe(700);
      expect(destino.saldo).toBe(500);
      expect(resultado).toEqual({ origen: 700, destino: 500 });
    });

    it('debe lanzar error si la cuenta destino no existe', () => {
      expect(() => cuenta.transferir(100, null)).toThrow(
        'Cuenta destino inválida'
      );
    });

    it('debe lanzar error si la cuenta destino es la misma', () => {
      expect(() => cuenta.transferir(100, cuenta)).toThrow(
        'No se puede transferir a la misma cuenta'
      );
    });

    it('debe lanzar error si la cuenta origen no tiene fondos suficientes', () => {
      expect(() => cuenta.transferir(5000, destino)).toThrow(
        'Fondos insuficientes'
      );
      expect(destino.saldo).toBe(200);
    });

    it('debe lanzar error si el monto es inválido y no modificar saldos', () => {
      expect(() => cuenta.transferir(0, destino)).toThrow(
        'El monto debe ser mayor que 0'
      );
      expect(cuenta.saldo).toBe(1000);
      expect(destino.saldo).toBe(200);
    });
  });
});
