# Servidor Node Js WebSocket #
Gestión de datos en tiempo real

### Qué contiene el repositorio? ###
Servidor WebSocket para conexión PubSub de Redis

* Instalación
* Ejecución

### Configuración necearia ###

Indispensable disponer de un servidor de redis en la maquina,  está definido en servidor con express en puerto 3000, socket.IO y el puerto que viene por default en Redis es 6379.

*Instalación de Redis

Actualice su caché de paquetes local de apt e instale Redis ingresando lo siguiente:
```
sudo apt update
sudo apt install redis-server
```

Esto descargará e instalará Redis y sus dependencias. Después de esto, hay un cambio de configuración importante que se debe realizar en el archivo de configuración de Redis, generado automáticamente durante la instalación.

Abra este archivo con su editor de texto preferido:

```
sudo nano /etc/redis/redis.conf

```

Encuentre la directiva supervised dentro del archivo. Esta directiva le permite declarar un sistema init para administrar Redis como un servicio, lo que le proporcionará mayor control sobre su funcionamiento. Por defecto, el valor de la directiva supervised es no. Debido a que se trata de Ubuntu, el cual utiliza el sistema init de systemd, cambie el valor a systemd:

path: /etc/redis/redis.conf

```
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
```

En este momento, es el único cambio que debe aplicar al archivo de configuración de Redis. Por ello, cuando termine guárdelo y ciérrelo. A continuación, reinicie el servicio de Redis para reflejar los cambios realizados en el archivo de configuración:

```
sudo systemctl restart redis.service
```

Con esto, Redis quedará instalado y configurado, funcionará en su equipo. Sin embargo, antes de comenzar a utilizarlo, es conveniente verificar primero si funciona correctamente.

Comience verificando que el servicio de Redis esté en ejecución:

```
sudo systemctl status redis
```

Para comprobar que Redis funcione de forma correcta, establezca conexión con el servidor utilizando el cliente de línea de comandos:

```
redis-cli
```

En la siguiente línea de comandos, realice una prueba de conectividad con el comando ping:

```
ping

```

```
Output
PONG
```
* Intalar dependencias de node
```
npm i
```

### Ejecución ###

```
npm start
```
