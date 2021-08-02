$(document).ready(function () {

    const BASE_URL = 'https://codehelperjandrocode.herokuapp.com/';

    function listarCategorias(){
        $.ajax({
            type: "get",
            url: BASE_URL+"categorias",
            dataType: "json",
            success: function (res) {
                for(i of res){
                    $('#select-category').append(
                            `
                                <option value=${i.id}>${i.nombreCategoria}</option>
                            `
                        )
                } 
            }
        });
    }

    function guardarCategoria(){

        $('#btnGuardarCategoria').on('click', function(){
          const data = {
              //nombreCategoria es el nombre que tiene la propiedad en Java
              nombreCategoria:$('#categoria').val()
          }

          $.ajax({
              url: BASE_URL+"categorias/guardar-categoria",
              type: "post",
              contentType:"application/json",
              data: JSON.stringify(data),
              dataType: "json",
              success: function (res) {
                  listarCategorias()
                  mensajes('Categoría guardada') 
              }
          });

        })
    }

    function cargarMetodos(){

        let categoria = "";

        $('#select-category').on('change', function(){

            categoria =  $('#select-category').val()

            $('#buscador').on('keyup', function(){

                let textoBuscador = $('#buscador').val()

                if(categoria!=null && textoBuscador != ""){
                    $.ajax({
                        type: "get",
                        url: BASE_URL+"categorias/buscar/" +categoria+'/'+textoBuscador ,
                        dataType: "json",
                        success: function (res) {
    
                            for(i of res){
                                $('#lista-metodos').html(
                                    `
                                    <li class="list-group-item">${i.nombreMetodo}</li>
                                    `
                                )

                                $('#github-link').html(
                                    `<a href="${i.url}" target="_blank"> 
                                        <i class="fab fa-github"> &nbsp&nbsp${i.url}<i>
                                    </a>`
                                         
                                )
                            }  
                        }
                    });

                }
                
            })
            
        })
    }

    function guardarMetodo(){

        let idCategoria = "";

        $('#select-category').on('change', function(){
            idCategoria = $('#select-category').val();

           
            $('#btnGuardarMetodo').on('click', function(){

                const data = {
                    nombreMetodo: $('#nombre_metodo').val(),
                    url: $('#url').val()
                }


                $.ajax({
                    type: "post",
                    url: BASE_URL+"guardar-metodo/" + idCategoria,
                    contentType:"application/json",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function (res) {
                        mensajes('Método guardado') 
                    }
                }); 
            })
        })
    }

 
    function mensajes(mensaje){
       $('#message-container').html(
           `<div class="alert alert-success text-center">${mensaje} </div>`
       )
    }

    //llamadas a métodos
    listarCategorias()
    guardarCategoria()
    cargarMetodos()
    guardarMetodo()
  
    

});