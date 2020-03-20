var $ = el => document.querySelector(el),
    frmDocentes = $("#frmDocentes");
frmDocentes.addEventListener("submit", e => {
    e.preventDefault();
    e.stopPropagation();

    let docentes = {
        accion: 'nuevo',
        codigo: $("#txtCodigo").value,
        nombre: $("#txtNombre").value,
        direccion: $("#txtDireccion").value,
        telefono: $("#txtTelefono").value
    };
    fetch(`private/modulos/docentes/procesos.php?proceso=recibirDatos&docentes=
    ${JSON.stringify(docentes)}`).
    then(resp => resp.json()).then(resp => { //error aca sale
        $("#respuesta").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
    });
});