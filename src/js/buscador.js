document.addEventListener('DOMContentLoaded',function(){

    iniciarApp();

});

function iniciarApp(){

    buscarPorFecha();

}

function buscarPorFecha(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input',function(e){
        const fechaSeccionada = e.target.value;

        window.location = `?fecha=${fechaSeccionada}`;
    });
}