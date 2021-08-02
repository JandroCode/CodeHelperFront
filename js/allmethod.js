$(document).ready(function () {

    function getAllMethods(){
        $.ajax({
            type: "get",
            url: "http://localhost:8080/metodos/lista",
            dataType: "json",
            success: function (res) {
                data = '';
                res.forEach(el => {
                    data+= `
                        <tr>
                            <td>${el.nombreMetodo}</td>
                            <td>${el.categoria.nombreCategoria}</td>
                            <td>
                                <button class="btn btn-danger"><i class="fas fa-trash"></i></button>

                                <button idMetodo=${el.id} id="btn_cargar_metodo" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </td>
                        </tr>
                    `
                });

                $('#tbody').html(data)
            }
        });

    }

    function cargarMetodo(){
        $(document).on('click', '#btn_cargar_metodo', function(){
            let boton = $(this)[0];
            let idMetodo = $(boton).attr('idMetodo')

            $.ajax({
                type: "get",
                url: "http://localhost:8080/metodos/" +idMetodo,
                dataType: "json",
                success: function (res) {
                    $('#modificar_metodo_form').html(
                        `
                            <input id="nombre_metodo" type="text" value= ${res.nombreMetodo} class="form-control mb-1" />
                            <input id="url_metodo" type="text" value= ${res.url} class="form-control" />
                            <input id="id"   type="hidden" value= ${res.id} class="form-control" />
                        `
                    ) 
                }
            }); 
        })
    }

    function actualizarMetodo(){
        $(document).on('click', '#btnEditMetodo', function(){

            let idMetodo = $('#id').val()

            const data = {
                id:idMetodo,
                nombreMetodo:$('#nombre_metodo').val(),
                url:$('#url_metodo').val()
            }

            $.ajax({
                type: "put",
                url: "http://localhost:8080/metodos/actualizar/"+idMetodo,
                contentType:'application/json',
                data:JSON.stringify(data),
                dataType: "json",
                success: function (res) {
                    getAllMethods()
                    mensajes('Modificado')
                }
            }); 
        })
    }

    function mensajes(mensaje){
        $('#admin-message-container').html(
            `<div class="alert alert-success text-center">${mensaje}</div>`
        )
     }





    //Llamadas a los métodos
    getAllMethods()
    cargarMetodo()
    actualizarMetodo()

    
    
});