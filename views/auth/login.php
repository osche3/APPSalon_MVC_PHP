<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>
<?php include_once __DIR__ . '/../templates/alertas.php';?>

<form action="" class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            placeholder="Tu Email"
            name="email"
            >
    </div>
    <div class="campo">
       <label for="password">Password</label>
       <input 
                type="password" name="password" id="password" placeholder="Tu password"
                >
       
    </div>
    <input type="submit" class="boton" value="Iniciar Sesión">

</form>
<div class="acciones">
    <a href="/crearCuenta">¿ Aún no tienes una cuenta? Crear una</a>
    <a href="/recuperarPassword"> Recuperar Password</a>
</div>