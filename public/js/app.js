function init(){
    $("[class*='mostrar']").off("click").click(function(e){
        let modulo = $(this).data("modulo"),
            form   = $(this).data("form");
        fetch(`public/vistas/${modulo}/${form}.html`).then( resp=>resp.text()).then(resp=>{
            $(`#vista-${form}`).html(resp).draggable();

            $(`#btn-close-${form}`).click(()=>{
                $(`#vista-${form}`).html("");
            });

            import(`../vistas/${modulo}/${form}.js`).then(module=>{
                module.modulo();
            });
            init();
        }) ;  
    })
}
init();