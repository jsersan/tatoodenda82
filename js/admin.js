var categorias = [];

$("document").ready(function() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null || user.username != 'admin') {
        window.open('index.html','_self');
    }
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.categorias.php',
        dataType: 'json'
    })
        .done(function (data) {
            categorias = data.categorias;
            var cats = [];
            data.categorias.forEach(cat => {
                    var html = `<tr id='cat${cat.id}'>
                                    <td class='catnom'>${cat.nombre}</td>
                                    <td class='catpadre' data-id=${cat.padre}></td>
                                    <td>
                                        <input data-id=${cat.id} type="button" class="editarcat" value="EDITAR"/>
                                    </td>
                                    <td>
                                        <input data-id=${cat.id} type="button" class="eliminarcat" value="ELIMINAR"/>
                                    </td>
                                </tr>`;
                    $("#editcat").append(html);
                    $("#selecpadre").append(`<option value='${cat.id}' >${cat.nombre}</option>`);
                    cats[`${cat.id}`] = cat;
            })
            $(".catpadre").each(function() {
                var id = $(this).attr('data-id');
                var txt = cats[`${id}`].nombre;
                if (txt == $(this).prev().text()) {
                    txt = "-";
                }
                $(this).text(txt);
            })
            aniadirEventosCategorias();
            cargarCategoriasNuevoArt();
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error obteniendo las categorías");
        });

    $.ajax({
            type: 'POST',
            url: 'php/servicios/get.productos.php',
            dataType: 'json',
            data: 'categoria=0'
        })
            .done(function (data) {
                data.prods.forEach(prod => {
                    var html = `<tr>
                                    <td>${prod.nombre}</td>
                                    <td>${formatearPrecio(prod.precio)}</td>
                                    <td>${prod.categoria}</td>
                                    <td>
                                        <input data-id=${prod.id} type="button" class="editarart" value="EDITAR"/>
                                    </td>
                                    <td>
                                        <input data-id=${prod.id} type="button" class="eliminarart" value="ELIMINAR"/>
                                    </td>
                                </tr>`;
                    $("#editart").append(html);
                })
                aniadirEventosArticulos();
            })
            .fail(function (data) {
                console.log(data);
                console.error("Error cargando los artículos");
            })

    $(".volver").click(function() {
        window.open('index.html','_self');
    })

})

function aniadirEventosCategorias() {
    $("#btnaniadircat").click(function() {
        var nombre = $("#txtnomcat").val().trim();
        var padre = $("#selecpadre").val();
        if (nombre != "" && padre != ""){
        $.ajax({
            type: 'POST',
            url: 'php/servicios/add.categoria.php',
            dataType: 'json',
            data: 'nombre=' + nombre +'&padre=' + padre
        })
            .done(function () {
                Swal.fire({
                    title: 'La categoría se ha añadido con éxito',
                    type: 'success',
                    confirmButtonColor: '#52667a'
                }).then(() => {
                      location.reload();
                  })
            })
            .fail(function (data) {
                console.log(data);
                console.error("Error obteniendo las categorías");
            });
        } else {
            Swal.fire({
                title: 'Debes rellenar todos los campos del formulario',
                type: 'error',
                confirmButtonColor: '#52667a'
            })
        }
    })
    $(".editarcat").click(function() {
        crearDivEditCat($(this).attr('data-id'));
        //Al cargar las imagenes, seleccionar una por defecto
        //Añadir color -> imagen
    })
    $(".eliminarcat").click(function() {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta categoría?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#52667a',
            cancelButtonColor: '#52667a',
            confirmButtonText: 'Borrar la categoría',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                var id = $(this).attr("data-id");
                $.ajax({
                    type: 'POST',
                    url: 'php/servicios/remove.categoria.php',
                    dataType: 'json',
                    data: 'id=' + id
                })
                    .done(function () {
                        Swal.fire({
                            title: 'La categoría se ha eliminado con éxito',
                            type: 'success',
                            confirmButtonColor: '#52667a'
                        }).then(() => {
                              location.reload();
                          })
                    })
                    .fail(function (data) {
                        console.log(data);
                        console.error("Error eliminando categoría");
                    });
            }
          })
        
    })

}

function cargarCategoriasNuevoArt(){
    html = `<option value="" selected disabled hidden></option>`;
    categorias.forEach(cat => {
        if (cat.id != cat.padre) {
                html += `<option value='${cat.id}' > ${cat.nombre} </option>`;
        }
    })
    $("#nuevoartcat").html(html);
}

function aniadirEventosArticulos() {
    $(".editarart").click(function() {
        var id = $(this).attr('data-id');
        crearDivEditArt(id);
    })
    $(".eliminarart").click(function() {
        Swal.fire({
            title: '¿Estás seguro de eliminar este artículo?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#52667a',
            cancelButtonColor: '#52667a',
            confirmButtonText: 'Borrar el artículo',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                var id = $(this).attr("data-id");
                $.ajax({
                    type: 'POST',
                    url: 'php/servicios/remove.producto.php',
                    dataType: 'json',
                    data: 'id=' + id
                })
                    .done(function (data) {
                        Swal.fire({
                            title: 'El artículo se ha eliminado con éxito',
                            type: 'success',
                            confirmButtonColor: '#52667a'
                        }).then(() => {
                              location.reload();
                        })
                    })
                    .fail(function (data) {
                        console.log(data);
                        console.error("Error eliminando artículo");
                    });
            }
          })
        
    })
    $("#btnaniadirart").click(function() {
        var nombre = $("#nuevoartnombre").val().trim();
        var descripcion = $("#nuevoartdescripcion").val().trim();
        var precio = $("#nuevoartprecio").val();
        var cat = $("#nuevoartcat").val();
        var carpetaimg = $("#nuevoartfolder").val().trim();
        if (nombre != "" && precio != "" && cat != "" && carpetaimg != "") {
            $.ajax({
                type: 'POST',
                url: 'php/servicios/add.producto.php',
                dataType: 'json',
                data: 'nombre=' + nombre + '&descripcion=' + descripcion + '&precio=' + precio + '&categoria=' + cat + '&carpetaimg=' + carpetaimg
            })
                .done(function (data) {
                    const files = document.querySelector('[type=file]').files;
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                    
                        formData.append('files[]', file);
                    }
                    formData.append('carpetaimg',$("#nuevoartfolder").val().trim());
                    formData.append('id', data.id);
                    $.ajax({
                        type: 'POST',
                        url: 'php/servicios/upload.imagenes.php',
                        dataType: 'text',  
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: formData
                    })
                        .done(function (data) {
                            
                            Swal.fire({
                                title: 'El artículo se ha añadido con éxito',
                                type: 'success',
                                confirmButtonColor: '#52667a'
                            }).then(() => {
                                
                                crearDivColores(data, true);
                            })
                        })
                        .fail(function (data) {
                            console.log(data);
                            console.error("Error subiendo las imágenes");
                        });
                        
                })
                .fail(function (data) {
                    console.log(data);
                    console.error("Error obteniendo las categorías");
                });
        } else {
            Swal.fire({
                title: 'Debes rellenar todos los campos del formulario',
                type: 'error',
                confirmButtonColor: '#52667a'
            })
        }
    })
}

function aniadirEventoCerrar() {
    $("#cerrar").click(function() {
        cerrarModal();
    })
}

function aniadirEventoEditCategoria() {
    $("#savecat").click(function() {
        var id = $(this).attr('data-id');
        var nombre = $("#newnomcat").val().trim();
        var padre = $("#newpadrecat").val();
        if (padre == 'sin') {
            padre = id;
        }
        if (nombre == '') {
            //ERROR
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/servicios/edit.categoria.php',
                dataType: 'json',
                data: 'id=' + id + '&nombre=' + nombre + '&padre=' + padre
            })
                .done(function (data) {
                    Swal.fire({
                        title: 'La categoría se ha actualizado con éxito',
                        type: 'success',
                        confirmButtonColor: '#52667a'
                    }).then(() => {
                          location.reload();
                      })
                })
                .fail(function (data) {
                    console.log(data);
                    console.error("Error modificando categoría");
                });
        }
    })
}

function aniadirEventoEditArticulo() {
    $("#saveart").click(function() {
        var id = $(this).attr('data-id');
        var nombre = $("#newnomart").val().trim();
        var descripcion = $("#newdescripcion").val().trim();
        var precio = $("#newprecio").val();
        var cat = $("#newcatart").val();
        if (nombre == '') {
            //ERROR
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/servicios/edit.producto.php',
                dataType: 'json',
                data: 'id=' + id + '&nombre=' + nombre + '&descripcion=' + descripcion + '&precio=' + precio + '&categoria=' + cat
            })
                .done(function (data) {
                    Swal.fire({
                        title: 'La categoría se ha actualizado con éxito',
                        type: 'success',
                        confirmButtonColor: '#52667a'
                    }).then(() => {
                          location.reload();
                      })
                })
                .fail(function (data) {
                    console.log(data);
                    console.error("Error modificando categoría");
                });
        }
    })
}

function aniadirEventosColores() {
    $("#masColores").click(function() {
        guardarColores($(this).attr('data-id'));
        cerrarModal();
        crearDivColores($(this).attr('data-id'), false);
    })
    $("#guardarColores").click(function() {
        if ($("#defaultimg") != null) {
            guardarImagenDefault($(this).attr('data-id'));
        }
        guardarColores($(this).attr('data-id'));
        Swal.fire({
            title: 'Los colores se han guardado con éxito',
            type: 'success',
            confirmButtonColor: '#52667a'
        }).then(() => {
              location.reload();
        })
    })
}

function guardarImagenDefault(id) {
    $.ajax({
        type: 'POST',
        url: 'php/servicios/update.imagen.producto.php',
        dataType: 'json',
        data: 'id=' + id + '&img=' + $("#defaultimg").val() 
    })
        .done(function (data) {
            console.log(data);
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error añadiendo imagen por defecto");
        });
}

function guardarColores(id) {
    var colores = "";
    var colors = [];
    var imgs = []
    $('.txtcolor').each(function(){
        var txt = $(this).val().trim();
        if (txt != '') {
            colors.push(txt);
        }
    });
    $('.seleccolor').each(function(){
        var txt = $(this).val();
        if (txt != '') {
            imgs.push(txt);
        }
    });
    for (var i = 0; i < colors.length; i++) {
        colores += colors[i] + ";" +  imgs[i] +"/"
    }
    $.ajax({
        type: 'POST',
        url: 'php/servicios/add.colores.php',
        dataType: 'json',
        data: 'id=' + id + '&colores=' + colores
    })
        .done(function (data) {
            console.log(data);
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error añadiendo imagen por defecto");
        });
}

function crearDivEditCat(id) {
    crearPanelBloqueo();
    var nombre = $(`#cat${id} td.catnom`).first().text();
    var padre = $(`#cat${id} td.catpadre`).first().attr('data-id');
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.categoria.php',
        dataType: 'json',
        data: 'id=' + id
    })
        .done(function (data) {
            var html = `<div id='modal' class='vereditcat'>
                        <h1>Editar categoría </h1>
                        <table>
                            <tr>
                                <td>
                                    <label>Nombre: </label>
                                </td>
                                <td>
                                    <input type='text' id='newnomcat' value='${nombre}'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Padre: </label>
                                </td>
                                <td>
                                    <select id='newpadrecat'>
                                    <option value="sin" >Sin Padre</option>`
            categorias.forEach(cat => {
                if (cat.id == padre) {
                    html += `<option value='${cat.id}' selected> ${cat.nombre} </option>`;
                } else {
                    html += `<option value='${cat.id}' > ${cat.nombre} </option>`;
                }
            })
            html +=                `</select>
                                </td>
                            </tr>
                        </table>
                        <input type='submit' id='savecat' data-id='${id}' value='ACTUALIZAR'/>
                        <input type='button' id='cerrar' value='x' />
                    </div>`;
            $("body").append(html);

            aniadirEventoEditCategoria();
            aniadirEventoCerrar();
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error obteniendo información del artículo");
        });
}

function crearDivEditArt(id) {
    crearPanelBloqueo();
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.producto.php',
        dataType: 'json',
        data: 'articulo=' + id
    })
        .done(function (data) {
            var art = data.articulo[0];
            var html = `<div id='modal' class='vereditart'>
                        <h1>Editar artículo </h1>
                        <table>
                            <tr>
                                <td>
                                    <label>Nombre: </label>
                                </td>
                                <td>
                                    <input type='text' id='newnomart' value='${art.nombre}'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Descripción: </label>
                                </td>
                                <td>
                                    <textarea id='newdescripcion' rows='3' cols='40'> ${art.descripcion} </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Precio: </label>
                                </td>
                                <td>
                                    <input type='number' size='2' id='newprecio' value='${art.precio}'/>€
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Categoría: </label>
                                </td>
                                <td>
                                    <select id='newcatart'>`
            categorias.forEach(cat => {
                if (cat.id != cat.padre) {
                    if (cat.id == art.categoria) {
                        html += `<option value='${cat.id}' selected> ${cat.nombre} </option>`;
                    } else {
                        html += `<option value='${cat.id}' > ${cat.nombre} </option>`;
                    }
                }
            })
            html +=                `</select>
                                </td>
                            </tr>
                        </table>
                        <input type='submit' id='saveart' data-id='${id}' value='ACTUALIZAR'/>
                        <input type='button' id='cerrar' value='x' />
                    </div>`;
            $("body").append(html);

            aniadirEventoEditArticulo();
            aniadirEventoCerrar();
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error obteniendo información de la categoría");
        });
}

function crearDivColores(idart, defaultimg) {
    crearPanelBloqueo();
    var html = `<div id='modal' class='veraddcolores large'>`;
    if (defaultimg){
        html += `<h1>Imagen por defecto</h1>
                    <div>
                        <label>Selecciona una imagen para mostrar: </label>
                        <select id='defaultimg' class='selecimgs'>
                        </select>
                    </div>`;
    }
                        
    html +=         `<h1>Añadir colores</h1>
                        <table>
                            <tr>
                                <th>Color</th>
                                <th>Nombre de la imagen</th>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>`
        if (!defaultimg) {
                                html += `<tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' class='txtcolor'/>
                                </td>
                                <td>
                                    <select class='selecimgs seleccolor'>
                                    </select>
                                </td>
                            </tr>`;
        }
        html +=             `<tr>
                                <td style='text-align: right'>
                                    <input type='submit' id='guardarColores' data-id='${idart}' value='GUARDAR'/>
                                </td>
                                <td style='text-align: left'>
                                    <input type='submit' id='masColores' data-id='${idart}' value='AÑADIR MÁS COLORES'/>
                                </td>
                            </tr>
                        </table>
                        
                        <input type='button' id='cerrar' value='x' />
                    </div>`;
            $("body").append(html);
            $("#cerrar").click(function() {
                location.reload();
            })
            rellenarSelectColores();
            aniadirEventosColores();
            aniadirEventoCerrar();
}

function formatearPrecio(num) {
    var decimales = cuantosDecimales(num);
    if (decimales > 2){
        num = num.toFixed(2);
    }
    var numstr = num.toString();
    var ipunto = numstr.indexOf('.');
    if (ipunto == -1) {
        numstr += ".00€";
    } else if (ipunto == (numstr.length - 2)) {
        numstr += "0€";
    } else if (ipunto > (numstr.length -3)) {
        numstr = numstr.substring(0, (ipunto+3)) + "€";
    } else {
        numstr +="€";
    }
    return numstr;
}

function cuantosDecimales(num) {
    var str = num.toString();
    var arr = str.split('.');
    if (arr.length == 1){
        return 0;
    } else {
        return arr[1].length;
    }
}

function crearPanelBloqueo() {
    $("body").append("<div id='block'></div>");
}

function cerrarModal() {
    $("#modal").remove();
    $("#block").remove();
}

function rellenarSelectColores() {
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.files.php',
        dataType: 'json',
        data: 'folder=img/' + $("#nuevoartfolder").val().trim()
    })
        .done(function (data) {
            var html = '<option value="" selected disabled hidden></option>';
            data.imagenes.forEach(file => {
                html += `<option value='${file}' > ${file} </option>`
            })
            $(".selecimgs").html(html);

        })
        .fail(function (data) {
            console.log(data);
            console.error("Error cargando los nombres de archivo");
        })
}