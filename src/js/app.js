let paso=1;

let pasoInicial=1;

let pasoFinal=3;


const cita ={
    id:'',
    nombre:'',
    fecha:'',
    hora:'',
    servicios:[]
}
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();



});

function iniciarApp(){
    mostrarSeccion()
    tabs();
    botonesPaginador();

    paginaSiguiente();

    paginaAnterior();

    consultarAPI();

    nombreCliente();
    idCliente();

    seleccionarFecha();

    seleccionarHora();

    mostrarResumen();
}

function mostrarSeccion(){

    const seccionOcultar = document.querySelector('.mostrar');
    if(seccionOcultar){
    seccionOcultar.classList.remove('mostrar');
    }

    const pasosSelector=`#paso-${paso}`
    const seccion = document.querySelector(pasosSelector);
    seccion.classList.add('mostrar');


    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');}

    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');



}


function tabs(){

    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton=>{

        boton.addEventListener('click',function(e){

           paso=parseInt(e.target.dataset.paso);
           botonesPaginador();
           mostrarSeccion();
       

        })

    });
    
}

function botonesPaginador(){

    const paginaanterior = document.querySelector('#anterior');
    const paginasiguiente = document.querySelector('#siguiente');
    if(paso===1){
        paginaanterior.classList.add('ocultar');
        paginasiguiente.classList.remove('ocultar');

    
    }else if(paso===3){
        paginaanterior.classList.remove('ocultar');
        paginasiguiente.classList.add('ocultar');
        mostrarResumen();
      
    }else{
        paginaanterior.classList.remove('ocultar');
        paginasiguiente.classList.remove('ocultar');
        

    }
    
  
    
}


function paginaAnterior(){

    const paginaanterior = document.querySelector('#anterior');
    paginaanterior.addEventListener('click',function(){
        if(paso<=pasoInicial) return;
        paso--;
        botonesPaginador();
        mostrarSeccion();

    });
    
}

function paginaSiguiente(){

    const paginasiguiente = document.querySelector('#siguiente');
    paginasiguiente.addEventListener('click',function(){
        if(paso>=pasoFinal) return;
        paso++;
        botonesPaginador();
        mostrarSeccion();

    });
    

}
async function consultarAPI(){
    try{
        const url = 'http://${location.origin}/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

    }
    catch(error){
        console.log(error);
    }



    
}

function mostrarServicios(servicios){
    servicios.forEach(servicio=>{
        const {id,nombre,precio} = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent= nombre;
        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent= `${precio} €`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);

        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);


        document.querySelector('#servicios').appendChild(servicioDiv);

    });

}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;

    
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    if(servicios.some(agregado=>agregado.id===id)){

        cita.servicios = servicios.filter(agregado =>agregado.id!=id);
        divServicio.classList.remove('seleccionado');
        


    }else{

        cita.servicios =[...servicios,servicio];

        divServicio.classList.add('seleccionado');
    }
   

    

    
}

function nombreCliente(){

    cita.nombre = document.querySelector('#nombre').value;
    
    
}

function idCliente(){

    cita.id = document.querySelector('#id').value;
    
    
}


function seleccionarFecha(){

    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input',function(e){
        const dia = new Date(e.target.value).getUTCDay();
        console.log(dia);
        if([6,0].includes(dia)){
          
           
              e.target.value='';   
              mostrarAlerta('Fines de Semana no permitidos','error','.formulario');
        }
        else{

            
            cita.fecha = e.target.value;

        }
    });

}
function seleccionarHora(){

    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input',function(e){
            const horaCita = e.target.value;
            const hora = horaCita.split(":")[0];
            if(hora < 10 || hora > 18){
            
                e.target.value='';
                mostrarAlerta('Hora no permitida','error','.formulario');

            }

            else {

                cita.hora = e.target.value;
            }
    });
}
function mostrarAlerta(mensaje, tipo,elemento,desaparece=true){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {

        alertaPrevia.remove;
    };
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;

    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    if(desaparece){
         setTimeout(() => {
              alerta.remove();
          }, 3000);}
}


function mostrarResumen(){

    const resumen = document.querySelector('.contenido-resumen');
    while(resumen.firstChild){

        resumen.removeChild(resumen.firstChild);
    }
    
    if(Object.values(cita).includes('')|| cita.servicios.length ===0){

        mostrarAlerta('Hacen Falta Datos o Servicios','error','.contenido-resumen',false);
        return;
    }

    const{nombre, fecha,hora,servicios} = cita;


    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen Servicios';
    resumen.appendChild(headingServicios);

    servicios.forEach(servicio=>{
        const {id,precio,nombre} = servicio;
        const contenedorServicio= document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        
        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: </span> ${precio} €`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
       
    })

    
    const headingCitas = document.createElement('H3');
    headingCitas.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCitas);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre: </span>${nombre}`;

    const fechaobj = new Date(fecha);
    const dia = fechaobj.getDate()+2;
    const mes =  fechaobj.getMonth();
    const year =  fechaobj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year,mes,dia));
    const opciones = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
    const fechaformateada = fechaUTC.toLocaleDateString('es-ES',opciones);
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha: </span>${fechaformateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora: </span>${hora} horas`;

    const boton1 = document.createElement('BUTTON');
    boton1.classList.add('boton');
    boton1.textContent= 'Reservar';
    boton1.onclick = reservarCita; 

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(boton1);

    
    
    
}



async function reservarCita(){

    const{fecha,hora,servicios,id}= cita;

    const idServicios = servicios.map(servicio => servicio.id);
     const datos = new FormData();

     datos.append('fecha',fecha);
     datos.append('hora',hora);
     datos.append('usuarioId',id);
     datos.append('servicios',idServicios);
     try{
     const url= 'http://${location.origin}/api/citas';


    
     const respuesta = await  fetch(url,{

            method: 'POST',
            body: datos

     });


     const resultado = await respuesta.json();
     if(resultado.resultado){
        Swal.fire({
            icon: 'success',
            title: 'Cita Creada',
            text: 'Tu cita fue creada correctamente',
            button:'OK'
          }).then(() =>{
            setTimeout(()=>{
                window.location.reload();
            },3000);
          })
     }

   
     }

     catch(error){

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al cargar la cita'
          });

    }

    
     

}