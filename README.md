# Volunteco Social Media

## Estudiantes
- Fiorotto Mateo
- Bento Herminia

## Tecnologias
<p class="technologies">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,tailwind,supabase,vite" />
  </a>
</p>

- Vue
- Tailwind
- Supabase
- Vite

---

Este proyecto es una web para la materia **Clientes Web Mobile** del ultimo cuatrimestre en **Escuela Da Vinci**.
Consiste en una red social sobre ecologia, que es la misma tematica de la tesis que estamos realizando.

### Consigna
Desarrollar una red social de tema libre:
- Debe ser una SPA
- Utilizar VITE para el bundling de archivos
- Supabase para almacenar info, en conjunto a la autenticacion. Uso de Postgres, Realtime y Auth.
- Tailwind para estilizar la web
- Vue SFC para la interfaz
- HTML Semantico

### Requerimientos
- Formularios para registro y autenticacion de usuarios
- Pagina donde esten las publicaciones de todos los usuarios (POSTEOS)
- Los usuarios deben poder crear publicaciones
- Debe poderse visitar el perfil de cada usuario, desde donde se puedan ver las publicaciones del mismo
- El perfil del usuario autenticado debe permitir administrar sus datos (nombre/contraseña)

### Evaluaciones adicionales
- Complejidad de la tarea realizada
- Uso correcto de las etiquetas semánticas de HTML
- Coherencia en los nombres de variables, clases, métodos, etc
- Documentación apropiada usando JSDoc
- Estilización del sitio
- Prolijidad en el código
- Prolijidad en la organización de los archivos del proyecto
- Usabilidad del sitio
- Accesibilidad del sitio
- Correcto uso de las herramientas implementadas

### Por hacer

Cosas sencillas:
- JSdoc
- organizar codigo y comentar. Revisar codigo (userprofile, globalchat, myprofile)
- register responsive
- arreglar estilos post btn (ocupa el ancho)
- agregar btnes banner 
- cambiar nombre a algunos metodos (ojo imports)
- Check semantica html
- alertas swal2
- formatear fechas

Cosas mas trabajosas:
- pagina de usuarios individuales
- paginar de editar mi perfil
- deletes (posts). Confirmar con modal o algo
- Responsives

Opcionales (suman):
- alertas y manejo de errores
- feedback form

---

A SOLUCIONAR:

despues de registrarse, solo POSTEOS no registra nuevos mensajes si no se recarga
o nos vamos a otra vista (chat si funciona en primera instancia)

---

commit Hoy: implementacion de loader. Ajustes en el chat, posteos y perfiles. Agregada desuscripcion. Agregada edicion de perfil. Varios fixes. Actualizacion H1.

Cosas por hacer hoy --> modificar posts con la modificacion de chat, arreglar perfiles. Botones banner y formatear fechas