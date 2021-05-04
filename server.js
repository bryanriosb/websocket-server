'use strict'

/* Creamos un servidor http y conectamos las
funciones de socket a este servidor */
const app = require('express')();
const amqp = require('amqplib');

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

const connections = new Set();

const redis = require('redis');
const broker = 'amqp://localhost:5672';
const pattern ='elevation';
const exchangeName = 'task';
const exchangeType = 'topic';



/* Esta función recibe cualquier petición de
conexión desde un socket en el navegador (cliente)
e imprime en consola que un nuevo usuario se ha
conectado */
io.on('connection', async (socket) => {
  	console.log('Cliente Conectado...');
  	connections.add(socket); 	
  	  	
/*  	const redisClient = redis.createClient();
  	redisClient.setMaxListeners(0);*/


	/* Cuando el socket cliente envíe un mensaje
		llamado 'subscribe', el socket se suscribe al
		canal de redis que tiene por nombre el ID de
		la tarea de Celery 
	*/
	socket.on('subscribe', async (queue) => {
		console.log('### TaskID ###');
		console.log('task_id', queue);

		const connection = await amqp.connect(broker)
	  	const channel = await connection.createChannel()
	  	await channel.assertQueue(queue)
		await channel.assertExchange(exchangeName, exchangeType, {durable: false})
		await channel.bindQueue(queue, exchangeName, pattern)
		
		/*redisClient.subscribe(celeryTaskId);*/

		await channel.consume(queue, (message) => {
		    let msg = JSON.parse(message.content.toString());
		    console.log('### Mensaje ###');
		    console.log(msg);
		    socket.emit('result', message.content.toString())
		    
		    /*channel.ack(message);*/
		});

	});

	/*redisClient.on("subscribe", function(channel, count) {
		console.log('### Subscribe Channel ###');
		console.log(channel)
	});*/

	/* Cuando redis genere una publicación (message)
	el mesaje de esa publicación se emite al socket
	bajo el nombre de 'result' */
	/*redisClient.on('message', (channel, message) => {
		console.log('### Canal ###');
	 	console.log(channel);	
	  	
	  	console.log('### Mensaje ###');
	  	socket.emit('result', message);
	  	redisClient.unsubscribe();
		
	});*/

	

	/*redisClient.on("error", error => console.log(error));*/
	
	socket.on('disconnect', () => {
  		connections.delete(socket);
  		console.log('Cliente Deconectado...');
	/*  	if (redisClient) {
		  	redisClient.unsubscribe();
		  	redisClient.end(true);
	  	}*/
	});
});

/* Levantamos el servidor http y lo ponemos a
escuchar en el puerto 3000 */
http.listen(3000, () => {
  console.log('Escuchando en el puerto 3000...');
});
