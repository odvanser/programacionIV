document.addEventListener("DOMContentLoaded",e=>{
    document.addEventListener("submit",event=>{
        event.preventDefault();
        let $resp = document.querySelector("#lblSaludo");
        nombre = document.querySelector("#txtNombre").Value;
    
        $resp.innerHTML= 'iniciando peticion del servee....';
        
        fetch('saludo.php').then(resp=>resp.text()).then(resp=>{
            $resp.innerHTML = 'Hola $(nombre) desde el servidor $(resp)'
        })


        
    });
});