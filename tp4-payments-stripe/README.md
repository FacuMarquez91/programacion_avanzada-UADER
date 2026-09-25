# Payments Microservice - NestJS + Stripe

Microservicio de pagos desarrollado con NestJS e integración con Stripe Checkout.

El servicio permite crear sesiones de pago y recibir eventos enviados por Stripe mediante webhooks.

## Requisitos

- Node.js
- npm
- NestJS
- Stripe CLI
- Cuenta o entorno de prueba de Stripe

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.template`.

```env
PORT=3003

STRIPE_SECRET=sk_test_xxxxxxxxxxxxxxxxxxxxx

STRIPE_SUCCESS_URL=http://localhost:3003/payments/success

STRIPE_CANCEL_UR=http://localhost:3003/payments/cancel

STRIPE_ENDPOINT_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

### Variables

- `PORT`: puerto donde se ejecuta la API.
- `STRIPE_SECRET`: clave secreta de Stripe en modo test.
- `STRIPE_SUCCESS_URL`: URL de redirección cuando el pago finaliza correctamente.
- `STRIPE_CANCEL_UR`: URL de redirección cuando el usuario cancela el pago.
- `STRIPE_ENDPOINT_SECRET`: secreto utilizado para verificar la firma de los webhooks de Stripe.

> El archivo `.env` no debe subirse al repositorio.

## Ejecutar la aplicación

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run start:dev
```

Por defecto, la API estará disponible en:

```text
http://localhost:3003
```

## Endpoints

### Crear sesión de pago

```http
POST /payments/create-payment-session
```

Ejemplo de body:

```json
{
  "orderId": "ord-1",
  "currency": "usd",
  "items": [
    {
      "name": "Producto",
      "price": 20,
      "quantity": 1
    }
  ]
}
```

El precio recibido se convierte a la unidad mínima utilizada por Stripe.

Por ejemplo:

```text
20 USD -> 2000 centavos
```

Una respuesta exitosa contiene el identificador y la URL de la Checkout Session:

```json
{
  "id": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

El `orderId` se envía a Stripe mediante `payment_intent_data.metadata`.

### Pago exitoso

```http
GET /payments/success
```

Respuesta:

```json
{
  "ok": true,
  "message": "Payment successful"
}
```

### Pago cancelado

```http
GET /payments/cancel
```

Respuesta:

```json
{
  "ok": false,
  "message": "Payment cancelled"
}
```

## Webhook de Stripe

El endpoint utilizado para recibir eventos de Stripe es:

```http
POST /payments/webhook
```

El webhook utiliza el header:

```text
stripe-signature
```

junto con el cuerpo crudo de la petición (`rawBody`) para verificar que el evento realmente fue enviado por Stripe.

La verificación se realiza utilizando `STRIPE_ENDPOINT_SECRET`.

Cuando se recibe:

```text
charge.succeeded
```

el servicio obtiene el `orderId` almacenado en:

```text
charge.metadata.orderId
```

y lo registra en la consola.

Los eventos no manejados se registran y responden correctamente sin procesarlos como pagos.

## Stripe CLI

Para reenviar eventos de Stripe hacia la API local:

```bash
stripe listen \
  --events charge.succeeded \
  --forward-to http://localhost:3003/payments/webhook
```

Stripe CLI mostrará un secreto similar a:

```text
whsec_xxxxxxxxxxxxxxxxxxxxx
```

Ese valor debe colocarse en:

```env
STRIPE_ENDPOINT_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

Luego se debe reiniciar la aplicación.

## Probar Checkout

Realizar:

```http
POST http://localhost:3003/payments/create-payment-session
```

con:

```json
{
  "orderId": "ord-1",
  "currency": "usd",
  "items": [
    {
      "name": "Producto",
      "price": 20,
      "quantity": 1
    }
  ]
}
```

Abrir en el navegador la URL retornada por Stripe.

Para realizar un pago de prueba se puede utilizar la tarjeta de prueba de Stripe:

```text
4242 4242 4242 4242
```

Utilizar una fecha futura y cualquier CVC válido para el entorno de prueba.

## Probar el webhook
Con la API ejecutándose y Stripe CLI escuchando:

```bash
stripe listen \
  --events charge.succeeded \
  --forward-to http://localhost:3003/payments/webhook
```

Realizar un pago desde la Checkout Session.

Al recibir el evento `charge.succeeded`:

- El webhook responde `200 OK`.
- La consola de la aplicación muestra el `orderId` correspondiente.

## Validaciones

El endpoint de creación de sesiones valida los datos recibidos.

Por ejemplo, los siguientes casos devuelven `400 Bad Request`:

- `items` ausente o vacío.
- Precio negativo.
- Campos adicionales no permitidos.
- Datos con tipos incorrectos.

El webhook también rechaza peticiones que no posean una firma válida de Stripe.

## Tecnologías utilizadas

- NestJS
- TypeScript
- Node.js
- Stripe
- class-validator
- class-transformer
- dotenv