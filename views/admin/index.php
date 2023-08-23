<h1 class="nombre-pagina">Panel de Administración</h1>

<?php
    include_once __DIR__ . '/../templates/barra.php';
?>
<h2>Buscar Citas</h2>
<div class="busqueda">
    <form  class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" name="fecha" id="fecha" value="<?php echo $fecha; ?>">
        </div>


    </form>
</div>
<?php

    if(count($citas)===0){
        echo '<h2>No hay citas </h2>';
    }
?>
<div id="citas-admin">
<ul class="citas">

<?php 
 
    $idCita=1;
    foreach($citas as $key => $cita){
        
        if($idCita != $cita->id){
            $total = 0;
?>

<li>
    <p> ID: <SPAN><?php echo $cita ->id;?></SPAN></p>
    <p> HORA: <SPAN><?php echo $cita ->hora;?></SPAN></p>
    <p> CLIENTE: <SPAN><?php echo $cita ->cliente;?></SPAN></p>
    <p> EMAIL: <SPAN><?php echo $cita ->email;?></SPAN></p>
    <p> TELEFONO: <SPAN><?php echo $cita ->telefono;?></SPAN></p>
    <H3>SERVICIOS</H3>
    
    <?php }

    $idCita = $cita->id;
    ?>

<p class="servicio"> <?php echo $cita ->servicio . ": " . $cita->precio;?></SPAN></p>
    
<?php 
    $total +=  $cita->precio;
    $actual = $cita-> id;
    $proximo = $citas[$key + 1] -> id ?? 0;
    if(esUltimo($actual,$proximo)){
        
        ?>

        <p class="total"> Total: <span><?php echo $total; ?>€</span></p>
        <form action="/api/eliminar" method="POST">
            <input type="hidden" name="id" value="<?php echo $cita->id;?>">
            <input type="submit" value="Eliminar" class="boton-eliminar">
        </form>
<?php
    }

   
}
?>
</ul>


<?php
    $script = "<script src ='build/js/buscador.js'></script>"

?>


</div>