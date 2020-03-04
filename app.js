document.addEventListener("DOMContentLoaded", e=>{
    const form = document.querySelector("#frmestadistica");
    form.addEventListener("submit", event=>{
        event.preventDefault();
        var osc=document.getElementById("select").value;  

        var txtdato=document.querySelector("#txtdatos").value;

        let  $resp=document.querySelector("#lblrespu");

        //split sirve para separar los datos
        txtdato.split(",");

            if(osc=="moda"){
                let lista = txtdato.split(",").map(Number);
                let max=0,val=0,defmod=0;
                var counter={};
                var mode =[];
                for(var i in lista){
                    if(!(lista[i] in counter))
                    counter[lista[i]]=0;
                    counter[lista[i]]++;
                    if(counter[lista[i]]==max)
                    mode.push(lista[i]);
                    else if (counter[lista[i]]>max){
                        max = counter[lista[i]];
                        mode = [lista[i]];
                        $resp.innerHTML =`La moda es:  ${(mode)}`;
                    }
                }
                    
            }
            else if(osc=="media"){
              media(txtdato);
            }
            else if(osc=="mediana"){
                let lista = txtdato.split(",").map(Number);
                lista.sort((a,b)=>a-b);
                let lowmiddle = Math.floor((lista.length-1)/2);
                let highmiddle = Math.ceil((lista.length-1)/2);
                let mediana= (lista[lowmiddle]+lista[highmiddle])/2;
                $resp.innerHTML = `La mediana es:  ${(mediana)}`;
            }
             else if(osc=="desviacion tipica"){
              
            }
    });
});

function media(serie=[]){
    //obtener los datos
    var txtdato=document.querySelector("#txtdatos").value;
    var separador=",",
    arreglo=txtdato.split(separador);
    var suma=0;
   //recorre los elementos dentro del arreglo y los suma cada uno
    arreglo.forEach(function(index) {
       suma+=parseInt(index);
     console.log(suma);
    });
    let  $resp=document.querySelector("#lblrespu");
    //imprime la salida
    $resp.innerHTML=`La Media es:  ${(suma/arreglo.length)}`;
}

