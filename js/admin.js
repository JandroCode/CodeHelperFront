$(document).ready(function () {

    const BASE_URL = 'https://codehelperjandrocode.herokuapp.com/';

    function listarCategorias(){
        $.ajax({
            type: "get",
            url:  BASE_URL+"listado-categorias",
            dataType: "json",
            success: function (res) {

                let data = ''

                res.forEach(el => {
                    data+=`
                       <tr>
                            <td>${el.nombreCategoria}</td>
                            <td>
                                <button idCategoria = ${el.id} class="btn btn-danger" id="btnDeleteCategoria">
                                    <i class="fas fa-trash"></i>
                                </button> 

                                &nbsp

                                <button idCategoria = ${el.id} type="button" id="btnModificarCategoria" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </td>
                       </tr>
                    `
                });
                $('#lista').html(data)
            }
        });
    }

    function eliminarCategoria(){
        $(document).on('click', '#btnDeleteCategoria', function(){

            if(confirm('Seguro de eliminar ?')){
                let boton = $(this)[0];
                let idCategoria = $(boton).attr('idCategoria')
    
                $.ajax({
                    type: "delete",
                    url: BASE_URL+"admin/eliminar/"+idCategoria,
                    success: function (res) {
                        console.log(res)
                        console.log('Categoría eliminada')
                        mensajes('Categoría eliminada')
                        listarCategorias();
                    }
                });
            }
        })
    }

    function cargarCategoria(){
        $(document).on('click', '#btnModificarCategoria', function(){
            let boton = $(this)[0];
            let idCategoria = $(boton).attr('idCategoria')

            $.ajax({
                type: "get",
                url: BASE_URL+"buscar-categoria/"+ idCategoria,
                dataType: "json",
                success: function (res) {
                    $('#nombre_categoria').html(
                        `
                            <input id="nombre" type="text" class="form-control" value="${res.nombreCategoria}" />
                            <input id="id" type="hidden" class="form-control" value="${res.id}" />
                        `
                    )  
                }
            });
        }) 
    }

    function modificarCategoria(){
        $(document).on('click', '#modificar_categoria', function(){

            let idCategoria = $('#id').val()

            const data = {
                id:$('#id').val(),
                nombreCategoria:$('#nombre').val()
            }

            $.ajax({
                type: "put",
                url: BASE_URL+"categorias/actualizar/"+idCategoria ,
                contentType:'application/json',
                data:JSON.stringify(data),
                dataType: "json",
                success: function (res) {
                    listarCategorias();
                    mensajes('Modificada')
                }
            }); 
        })
    }

    function mensajes(mensaje){
        $('#admin-message-container').html(
            `<div class="alert alert-success text-center">${mensaje}</div>`
        )
     }


    //llamadas a funciones
    listarCategorias()
    eliminarCategoria()
    cargarCategoria()
    modificarCategoria()
    
    
});