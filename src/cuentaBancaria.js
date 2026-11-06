/**
 * Representa una cuenta bancaria con saldo, titular y número de cuenta.
 * Opera depósitos, retiros y transferencias validando cada monto.
 */
export class CuentaBancaria {
  #titular;
  #numeroCuenta;
  #saldo;

  constructor(titular, numeroCuenta, saldoInicial = 0) {
    if (typeof titular !== 'string' || titular.trim() === '') {
      throw new Error('El titular es obligatorio');
    }
    if (typeof numeroCuenta !== 'string' || numeroCuenta.trim() === '') {
      throw new Error('El número de cuenta es obligatorio');
    }
    if (typeof saldoInicial !== 'number' || !Number.isFinite(saldoInicial)) {
      throw new Error('Monto inválido');
    }
    if (saldoInicial < 0) {
      throw new Error('El saldo inicial no puede ser negativo');
    }

    this.#titular = titular.trim();
    this.#numeroCuenta = numeroCuenta.trim();
    this.#saldo = this.#redondear(saldoInicial);
  }

  get titular() {
    return this.#titular;
  }

  get numeroCuenta() {
    return this.#numeroCuenta;
  }

  get saldo() {
    return this.#saldo;
  }

  /** Devuelve el saldo actual de la cuenta. */
  verSaldo() {
    return this.#saldo;
  }

  /** Suma el monto al saldo y devuelve el nuevo saldo. */
  depositar(monto) {
    this.#validarMonto(monto);
    this.#saldo = this.#redondear(this.#saldo + monto);
    return this.#saldo;
  }

  /** Resta el monto al saldo y devuelve el nuevo saldo. */
  retirar(monto) {
    this.#validarMonto(monto);
    if (monto > this.#saldo) {
      throw new Error('Fondos insuficientes');
    }
    this.#saldo = this.#redondear(this.#saldo - monto);
    return this.#saldo;
  }

  /**
   * Transfiere un monto de esta cuenta a otra.
   * @returns {{origen: number, destino: number}} nuevos saldos
   */
  transferir(monto, cuentaDestino) {
    this.#validarMonto(monto);
    if (!(cuentaDestino instanceof CuentaBancaria)) {
      throw new Error('Cuenta destino inválida');
    }
    if (cuentaDestino === this) {
      throw new Error('No se puede transferir a la misma cuenta');
    }

    this.retirar(monto);
    cuentaDestino.depositar(monto);

    return { origen: this.#saldo, destino: cuentaDestino.saldo };
  }

  #validarMonto(monto) {
    if (typeof monto !== 'number' || !Number.isFinite(monto)) {
      throw new Error('Monto inválido');
    }
    if (monto <= 0) {
      throw new Error('El monto debe ser mayor que 0');
    }
  }

  #redondear(valor) {
    return Math.round(valor * 100) / 100;
  }
}
