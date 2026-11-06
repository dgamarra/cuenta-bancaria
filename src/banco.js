import { CuentaBancaria } from './cuentaBancaria.js';

/**
 * Agrupa y administra las cuentas bancarias del banco.
 */
export class Banco {
  #cuentas = [];

  constructor(nombre) {
    this.nombre = nombre;
  }

  get cuentas() {
    return [...this.#cuentas];
  }

  /** Crea una cuenta nueva con saldo inicial 0 por defecto. */
  crearCuenta(titular, numeroCuenta, saldoInicial = 0) {
    if (this.buscarCuenta(numeroCuenta)) {
      throw new Error('Ya existe una cuenta con ese número');
    }
    const cuenta = new CuentaBancaria(titular, numeroCuenta, saldoInicial);
    this.#cuentas.push(cuenta);
    return cuenta;
  }

  /** Busca una cuenta por número; devuelve null si no existe. */
  buscarCuenta(numeroCuenta) {
    return this.#cuentas.find((c) => c.numeroCuenta === numeroCuenta) ?? null;
  }

  /** Transfiere monto entre dos cuentas del banco por su número. */
  transferir(origen, destino, monto) {
    const cuentaOrigen = this.buscarCuenta(origen);
    const cuentaDestino = this.buscarCuenta(destino);
    if (!cuentaOrigen || !cuentaDestino) {
      throw new Error('Cuenta no encontrada');
    }
    return cuentaOrigen.transferir(monto, cuentaDestino);
  }

  /** Suma los saldos de todas las cuentas. */
  saldoTotal() {
    return this.#cuentas.reduce((total, c) => total + c.saldo, 0);
  }
}
