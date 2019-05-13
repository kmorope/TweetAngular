# TweetAngular

Para ejecutar este proyecto es necesario arrancar un servidor y un cliente.

## Server

Creado utilizando Node.js y Express, el servidor es necesario para evitar errores de CORS con el API de twitter.

Para ejecutar el servidor solo se necesita ejecutar las siguientes lineas en una ventana de consola

### NPM
```bash
npm install
npm start
```

### Yarn
```bash
yarn
yarn start
```

Se abrira un proceso de node en el puerto 3000 y servira como un API intermediario entre la aplicacion y twitter.

## Cliente

Creado utilizando Angular 7, Typescript y Less, esta aplicacion se ejecuta utilizando el Angular CLI de la siguiente forma:

### NPM
```bash
npm install
```
o

### Yarn
```bash
yarn
````

### Angular CLI

```bash
ng serve --open
```

Para mas informacion sobre la ejecucion avanzada del cliente, dirigirse a el archivo README en la carpeta *client*
