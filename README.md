Proyecto: Pagina web App clientes para soluciones digitales

Autor: Mariano Alejandro Visgarra

Descripcion: 
App web que trae un listado de "clientes" en la base de datos y los imprime en la pagina inicial en forma de tabla con sus datos correspondientes. 
Las acciones de la app son las de Leer, Filtrar, Editar, Crear y Eliminar como se ha establecido en la peticion del proyecto. Tambien al momento de editar y eliminar un cliente, se emite dentro de la pagina un PopUp para confirmar el cambio o la eliminacion del cliente en la base de datos. O en casos de faltante de datos como por ejemplo al momento de buscar un cliente que no se encuentre por su documento o crear un cliente sin nombre o documento.


Tecnologias utilizadas para backend (*Puerto 4500*):

*Mongo Atlas (_por lo cual no esta subida en el documento la base de datos. Se encuentra en la nube_)
*Node js
*Express
*mongoose
*cors
*nodemon
*morgan
*body-parser


Tecnologias utilizadas para Frontend (*Puerto 3000*)

*React
*axios
*sweetalert2
*bootstrap


Instrucciones de uso de la web: 

Entrar desde dos terminales distintas al servidor (server) y al frontend (client) con los comandos cd y el nombre de la carpeta.
Luego ingresar dentro de la terminal del backend el comando "npm run dev" para encender el servidor. Por ultimo ejecutar el comando "npm start" en el cliente para abrir la pagina.

Nos encontramos con la barra de navegacion con las distintas secciones y botones que indican la funcionalidad a utilizar. Al comenzar, podemos ingresar por el apartado de Crear clientes antes de mostrarlos, ya que si no hay nada en la base de datos, la busqueda devolvera un PopUp con un error. Luego de crearlos podremos acceder normalmente.
Tenemos la seccion de "mostrar clientes" donde listamos los clientes de manera automatica desde la base de datos al ingresar a la pagina o dejando el filtro vacio
Luego podemos realizar las acciones anteriormente descriptas al desplegarse la tabla con la informacion por cada cliente o bien filtrando por su DNI.


Espero que les guste! Saludos!
