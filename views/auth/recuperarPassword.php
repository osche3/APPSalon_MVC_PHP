<h1 class="nombre-pagina"> Olvide Password</h1>
<p class="descripcion-pagina">Restablece tu password escribiendo tu email
</p>

<?php

    include_once __DIR__ . "/../templates/alertas.php";

?>
<form action="/recuperarPassword" method="POST" class="formulario">
   
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Tu Email"
        
        >
    </div>

   
    <input type="submit" value="Enviar Instrucciones" class="boton">

</form>

<div class="acciones">
    <a href="/">Ya tienes una cuenta?Log In</a>
    <a href="/crearCuenta">¿ Aún no tienes una cuenta? Crear una</a>

</div>