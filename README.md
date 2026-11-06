# cuenta-bancaria

App de cuenta bancaria en JavaScript con POO, desarrollada con TDD (Vitest).

## Procesos

- **Depósito**: suma un monto al saldo.
- **Retiro**: resta un monto (valida fondos suficientes).
- **Transferencia**: mueve un monto entre dos cuentas.
- **Ver saldo**: consulta el saldo actual.

## Estructura

```
src/
  cuentaBancaria.js   # clase CuentaBancaria (depósito, retiro, transferencia, saldo)
  banco.js            # clase Banco (administra cuentas y transferencias entre ellas)
  index.js            # demo de uso
tests/
  cuentaBancaria.test.js
  banco.test.js
```

## Clases

- `CuentaBancaria(titular, numeroCuenta, saldoInicial = 0)`
  - `depositar(monto)` → nuevo saldo
  - `retirar(monto)` → nuevo saldo
  - `transferir(monto, cuentaDestino)` → `{ origen, destino }`
  - `verSaldo()` → saldo actual
- `Banco(nombre)`
  - `crearCuenta(titular, numeroCuenta, saldoInicial = 0)`
  - `buscarCuenta(numeroCuenta)`
  - `transferir(origen, destino, monto)`
  - `saldoTotal()`

## Reglas de negocio

- Los montos deben ser números finitos y mayores que 0.
- No se puede retirar ni transferir más de lo disponible (fondos insuficientes).
- No se puede transferir a la misma cuenta ni a una cuenta inválida.
- Los saldos se redondean a 2 decimales.
- Un número de cuenta no puede repetirse en el mismo banco.

## Ejecutar

```bash
npm install
npm test          # corre la suite de tests (Vitest)
npm run test:watch
node src/index.js # demo en consola
```
