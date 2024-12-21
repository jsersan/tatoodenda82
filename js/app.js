var banner = []; //Array con las rutas de las imágenes del banner
var i = null; //Variable con la posición del array de imágenes de la imagen actual


$(document).ready(function () {

    /*************** PETICIONES ********************/

    //PETICIÓN PARA CARGAR TODAS LAS CATEGORÍAS
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.categorias.php',
        dataType: 'json'
    })
        .done(function (data) {
            /*
                Es necesario recorrer dos veces las categorías para prevenir errores.
                Si una subcategoría aparece antes que una categoría principal, tratar de 
                añadirla a la categoría principal provocaría un error.
            */

            var cats = [];
            //Guarda en cats todas las categorias y escribe las principales
            data.categorias.forEach(cat => {
                var categoria = {
                    nombre: cat.nombre,
                    id: cat.id,
                    padre: cat.padre
                };
                cats.push(categoria);
                if (cat.id == cat.padre) {
                    var html = `<li class="menuitem elem">
                                    <span  data_id=${cat.id} class="categoria">${cat.nombre.toUpperCase()}</span>
                                    <ul id="subcat${cat.id}" class="subcat"></ul>
                                </li>`;
                    $("#menu").append(html);
                    $(`#subcat${cat.id}`).css("display", "none");
                    $(".elem").mouseover(function () {
                        $(this).find(".subcat").css("display", "block");
                    });
                    $(".elem").mouseout(function () {
                        $(this).find(".subcat").css("display", "none");
                    });
                }
            });
            //Recorre el array con categorias y escribe las subcategorias
            cats.forEach(cat => {
                if (cat.id != cat.padre) {
                    var html = `<li data_id=${cat.id} class="menuitem categoria">${cat.nombre.toUpperCase()}</li>`;
                    $(`#subcat${cat.padre}`).append(html);
                }
            });
            var html = `<li id='fincat' data_id="todo" class="menuitem categoria">VER TODO</li>`;
            $("#menu").append(html);
            aniadirEventosCategorias();
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error obteniendo las categorías");
        });


    //PETICIÓN PARA OBTENER LA LISTA DE IMÁGENES DEL BANNER
    //Esta petición devuelve el listado de los archivos contenidos en el directorio img/banner
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.files.php',
        dataType: 'json',
        data: 'folder=img/banner'
    })
        .done(function (data) {
            // Guardar todas las rutas de imágenes en un array, inicializar la variable con la posición y cargar la primera

            let json = data.imagenes;
            for (let i in json) {
                var img = json[`${i}`];
                banner.push("img/banner/" + img);
            }
            i = 0;
            $("#bannerimg").attr("src", banner[i]);

        })
        .fail(function () {
            console.error("Error cargando las imágenes del banner");
        })



    //CARGAR EL BANNER Y LOS ARTÍCULOS (HOME)
    loadhome();


    /*************** EVENTOS ********************/

    //EVENTO PARA VER EL HOME AL HACER CLICK 
    $(".home").click(loadhome);

    // EVENTO PARA "<" Y ">" DEL BANNER
    $("#orward").click(function () {
        pasarBanner();
    })
    $("#bannerback").click(function () {
        if (i == 0) { //Si es la primera imagen
            i = banner.length - 1;
        } else {
            i--;
        }
        $("#bannerimg").attr("src", banner[i]);
    })

    $("#login").click(function () {
        crearDivLogin();
    })

    $("#searchinput").on('keypress', function (e) {
        var code = (e.Code ? e.Code : e.which);
        if (code == '13') {
            buscar();
        }
    })
    $("#searchicon").click(function () {
        buscar();
    });

    //COMPROBAR SI ESTÁ INICIADA SESIÓN
    if (sessionStorage.getItem('user') != null) {
        $("#login").find("img").attr('src', 'img/icons/logout.png');
        if (esAdmin()) {
            html = `<li class='menuitem adminoptions'><img src='img/icons/settings.png' id='imgprofile'/>ADMINISTRAR</li>`;
            $(`${html}`).insertAfter("#search");
            aniadirEventoAdmin();
        } else {
            user = JSON.parse(sessionStorage.getItem('user'));
            html = `<li class='menuitem profile'><img src='img/icons/login.png' id='imgprofile'/>${user.username}</li>`;
            $(`${html}`).insertAfter("#search");
            aniadirEventoPerfil();
        }
    }

    /********* CARRITO ************/
    escribirNCarrito();
    aniadirEventoCarrito();
})

function loadhome() {
    $("#banner").css("display", "block");
    setInterval(function() {pasarBanner(); }, 5000);
    $("#titulo").text("Novedades");
    escribirNCarrito();
    //PETICIÓN PARA OBTENER LOS PRODUCTOS
    //Si se manda sin parámetros, manda 8 productos en orden descendente (id)
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.productos.php',
        dataType: 'json'
    })
        .done(function (data) {
            $("#articulos").html("");
            var prods = data.prods;
            var length = Object(prods).length;
            for (var i = 0; i < length; i++) {
                var prod = prods[`${i}`];
                var html = `<div class='articulo' data_id='${prod.id}'>
                            <img src='img/${prod.carpetaimg}/${prod.imagen}' alt='${prod.nombre}' />
                            <h2>${prod.nombre}</h2>
                            <h3>${formatearPrecio(prod.precio)}</h3>
                            <p>${prod.descripcion}</p>
                        </div>`;
                $("#articulos").append(html);
            }

            aniadirEventosArticulos();
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error cargando los artículos");
        })

}

function pasarBanner() {
    if (i == banner.length - 1) { //Si es la última imagen
        i = 0;
    } else {
        i++;
    }
    $("#bannerimg").attr("src", banner[i]);
}

function aniadirEventosCategorias() {
    //EVENTO PARA VER ARTÍCULOS POR CATEGORÍA
    //Se esconde el banner y se cargan los productos de esa categoría
    $(".categoria").click(function () {
        $("#banner").css("display", "none");
        $("#titulo").text($(this).text());
        var cat = $(this).attr("data_id");
        if (cat == "todo") {
            cat = 0;
        }
        $.ajax({
            type: 'POST',
            url: 'php/servicios/get.productos.php',
            dataType: 'json',
            data: 'categoria=' + cat
        })
            .done(function (data) {
                $("#articulos").html("");
                var prods = data.prods;
                var length = Object(prods).length;
                for (var i = 0; i < length; i++) {
                    var prod = prods[`${i}`];
                    var html = `<div class='articulo' data_id='${prod.id}'>
                                    <img src='img/${prod.carpetaimg}/${prod.imagen}' alt='${prod.nombre}' />
                                    <h2>${prod.nombre}</h2>
                                    <p>${prod.descripcion}</p>
                                </div>`;
                    $("#articulos").append(html);
                }
                aniadirEventosArticulos();
            })
            .fail(function (data) {
                console.log(data);
                console.error("Error cargando los artículos");
            })
    })
}

function aniadirEventosArticulos() {
    //EVENTO PARA LOS ARTÍCULOS
    //Se abre un panel con el artículo y las diferentes opciones y un botón de añadir al carrito
    $(".articulo").click(function () {
        crearPanelBloqueo();
        var idart = $(this).attr("data_id");
        obtenerArticulo(idart); //Obtienen el artículo y llama a crearDivArticulo

    })
}


function obtenerArticulo(idart) {
    //Petición para obtener el artículo
    var articulo = null;
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.producto.php',
        dataType: 'json',
        data: 'articulo=' + idart
    })
        .done(function (data) {
            if (data.articulo != null) {
                articulo = data.articulo[0];
            }
            var colores = [];
            //Petición para obtener los colores del artículo
            $.ajax({
                type: 'POST',
                url: 'php/servicios/get.colores.php',
                dataType: 'json',
                data: 'articulo=' + idart
            })
                .done(function (data) {
                    if (data.colores != null) {
                        colores = data.colores;
                    }
                    //Una vez que se obtienen los colores y datos del artículo, creación del div
                    //Sólo funciona dentro del último done, ya que fuera trata de ejecutarlo
                    //antes de haber recogido la información de la petición
                    crearDivArticulo(articulo, colores);
                })
                .fail(function (data) {
                    console.log(data);
                    console.error("Error cargando las opciones");
                });
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error cargando las opciones");
        })
}

function crearDivArticulo(articulo, colores) {
    //Creación del div para mostrar el artículo
    var html = `<div id='modal' class='verarticulo'>
                    <div id='artimgs'>
                        <img id='imgart' src='img/${articulo.carpetaimg}/${articulo.imagen}' alt='${articulo.nombre}'/>`;
    html += `<div id='divminiaturas'><div class='slider' width='300px'>`;
    colores.forEach(color => {
        html += `<div>
                <img id='${color.color}' class='miniatura' src='img/${articulo.carpetaimg}/${color.imagen}' alt=${color.color} />
                </div>`
    })
    html += `</div></div></div>
            <div id='arttext'>
                <h1>${articulo.nombre}</h1>
                <h2 id="precio">${formatearPrecio(articulo.precio)}</h2>
                <p>${articulo.descripcion}</p>
                <form>
                <p>
                    <label>Selecciona color: </label>`;
    if (colores.length > 0) {
        html += `<select id='cmbcolor'>
                    <option value="" selected disabled hidden></option>`;
        colores.forEach(color => {
            html += `<option value='${color.color}'>${color.color}</option>`
        })
        html += `</select></p>`;
    }
    html += `   <div class='cantidad'>
                    <input type='button' id='cantmenos' value='-' />
                    <input type='number' id='cant' value='1' minvalue='1'/>
                    <input type='button' id='cantmas' value='+' />
                </div>
                <p><input type='button' id='add' value='AÑADIR AL CARRITO' /></p>
                <input type='hidden' id='idart' value='${articulo.id}' />
                </form>
                <input type='button' id='cerrar' value='x' />
            </div>
        </div>`;
    $("body").append(html);
    //Evento del botón
    var precio = $("#precio").text().substring(0, ($("#precio").text().length - 1));
    var nombre = $(".verarticulo").find("h1").text();
    $("#add").on('click', function () {
        var img = $("#imgart").attr('src');
        aniadirAlCarrito($("#idart").val(), $("#cmbcolor").val(), $("#cant").val(), precio, nombre, img);
    });
    //Evento para cerrar
    aniadirEventoCerrar();
    //Eventos para cambiar de color
    aniadirEventosColor();
    //Evento para los botones + y -
    aniadirEventosCantidad();
    //slick
    $('.slider').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 2
      });
}

function crearPanelBloqueo() {
    $("body").append("<div id='block'></div>");
}

function aniadirEventoCerrar() {
    $("#cerrar").click(function () {
        cerrarModal();
    })
}

function cerrarModal() {
    $("#modal").remove();
    $("#block").remove();
}

function aniadirEventosColor() {
    $(".miniatura").click(function () {
        var color = $(this).attr('id');
        var src = $(this).attr('src');
        $("#imgart").attr('src', src);
        //Desseleccionar opción anterior
        $("#cmbcolor option:selected").removeAttr("selected");
        //Seleccionar opción adecuada
        $("#cmbcolor option").each(function () {
            if ($(this).val() == color) {
                $(this).attr('selected', true);
            }
        })
    })
    $("#cmbcolor").on('change', function () {
        $(this).css('border', 'solid 1px lightgray');
        var color = $(this).val();
        var src = $(`#${color}`).attr('src');
        $("#imgart").attr('src', src);
    })
}

function aniadirEventosCantidad() {
    $("#cantmas").click(function () {
        var cant = parseInt($("#cant").val()) + 1;
        $("#cant").attr("value", cant.toString())
    });
    $("#cantmenos").click(function () {
        var cant = parseInt($("#cant").val()) - 1;
        if (cant > 0) {
            $("#cant").attr("value", cant.toString())
        }
    });
}

function aniadirAlCarrito(idart, color, cant, precio, nombre, img) {
    if (color != null) {
        //Comprobar que se haya seleccionado color
        if (sessionStorage.getItem("pedido") == null) {
            sessionStorage.setItem("pedido", "{}");
        }
        var pedido = JSON.parse(sessionStorage.getItem("pedido"));
        //Ver si el artículo con el mismo color ya estaba en el carrito
        if (pedido[`${idart}`] != null) {
            //Transformar el JSON con el pedido del artículo a objeto
            var obj = JSON.parse(pedido[`${idart}`]);
            if (obj[`${color}`] != null) {
                //Si estaba, añadir unidades
                obj[`${color}`] = parseInt(obj[`${color}`]) + parseInt(cant);
            } else {
                //Si no estaba el color, añadirlo
                obj[`${color}`] = cant;
                obj[`${color}img`] = img;
            }
            //Volver a transformar el objeto a string
            pedido[`${idart}`] = JSON.stringify(obj);
        } else {
            //Sino, añadir el artículo
            pedido[`${idart}`] = `{"nombre":"${nombre}", "precio":"${precio}", "${color}": "${cant}", "${color}img":"${img}"}`;
        }
        //Guardar el pedido
        sessionStorage.setItem("pedido", JSON.stringify(pedido));
        //Cerrar la ventana
        cerrarModal();
        //Actualizar el número de items del carrito
        escribirNCarrito();
    } else {
        $("#cmbcolor").css('border', 'solid 3px red');
    }
}

function formatearPrecio(num) {
    var decimales = cuantosDecimales(num);
    if (decimales > 2) {
        num = num.toFixed(2);
    }
    var numstr = num.toString();
    var ipunto = numstr.indexOf('.');
    if (ipunto == -1) {
        numstr += ".00€";
    } else if (ipunto == (numstr.length - 2)) {
        numstr += "0€";
    } else if (ipunto > (numstr.length - 3)) {
        numstr = numstr.substring(0, (ipunto + 3)) + "€";
    } else {
        numstr += "€";
    }
    return numstr;
}

function cuantosDecimales(num) {
    var str = num.toString();
    var arr = str.split('.');
    if (arr.length == 1) {
        return 0;
    } else {
        return arr[1].length;
    }
}

function escribirNCarrito() {
    var ni = numeroItemsCarrito();
    if (ni == 0) {
        $("#carrito p").css("display", "none");
    } else {
        if ($("#carrito p").css('display') == "none") {
            $("#carrito p").css('display', 'block');
        }
        $("#carrito p").text(ni.toString());
    }
}

function numeroItemsCarrito() {
    var n = 0;
    if (sessionStorage.getItem("pedido") != null) {
        var pedido = JSON.parse(sessionStorage.getItem("pedido"));
        for (item in pedido) {
            var art = JSON.parse(pedido[`${item}`]);
            for (color in art) {
                if (color != "precio" && color != "nombre" && !color.endsWith('img')) {
                    n += parseInt(art[`${color}`]);
                }
            }
        }
    }
    return n;
}

function aniadirEventoCarrito() {
    $("#carrito").click(function () {
        crearDivCarrito();
    })
}

function crearDivCarrito() {
    if (sessionStorage.getItem("pedido") != null) {
        crearPanelBloqueo();
        var html = `<div id='modal' class='vercarrito'>`;
        html += `<table>
                    <thead>
                        <tr>
                            <th> Artículo </th>
                            <th> Color </th>
                            <th> Cantidad </th>
                            <th> Precio(u) </th>
                            <th><span> Precio (total)<span></th>
                            <th></th>
                        <tr>
                    </thead>
                    <tbody>`;
        var pedido = JSON.parse(sessionStorage.getItem("pedido"));
        var total = 0;
        for (item in pedido) {
            var art = JSON.parse(pedido[`${item}`]);
            for (color in art) {
                if (color != "precio" && color != "nombre" && !color.endsWith('img')) {
                    var cant = parseInt(art[`${color}`]);
                    var precio = parseFloat(art.precio);
                    total += (cant * precio);
                    var img = art[`${color}img`]
                    html += `<tr>
                                <td>
                                    <img src='${img}' alt='' class='miniatura' />
                                    ${art.nombre}
                                </td>
                                <td>${color}</td>
                                <td>${cant.toString()}</td>
                                <td>${formatearPrecio(precio)}</td>
                                <td>${formatearPrecio(cant * precio)}</td>
                                <td><span data-id='${item}' color='${color}' class='eliminar'>x</span></td>
                            </tr>`;
                }
            }
        }
            html += `</tbody>
                    <tfoot>
                        <tr>
                            <td colspan='4'>Total:</td>
                            <td>${formatearPrecio(total)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <input type='button' id='procesarcompra' value='PROCESAR COMPRA' />`;

        html += `<input type='button' id='cerrar' value='x' /></div>`;
        $("body").append(html);
    } else {
        Swal.fire({
            title: 'El carrito está vacío',
            type: 'info',
            confirmButtonColor: '#52667a'
        })
    }

    //Evento para hacer checkout del pedido
    aniadirEventoCheckout();
    //Evento para eliminar artículos
    aniadirEventoEliminar();
    //Evento para cerrar
    aniadirEventoCerrar();
}

function aniadirEventoEliminar() {
    $(".eliminar").click(function () {
        var pedido = JSON.parse(sessionStorage.getItem("pedido"));
        var idart = $(this).attr('data-id');
        var color = $(this).attr('color');
        var ln = JSON.parse(pedido[`${idart}`]);
        delete ln[`${color}`];
        pedido[`${idart}`] = JSON.stringify(ln);
        sessionStorage.setItem("pedido", JSON.stringify(pedido));
        cerrarModal();
        escribirNCarrito();
        crearDivCarrito();
    })
}

function crearDivLogin() {
    if (sessionStorage.getItem('user') == null) {
        crearPanelBloqueo();
        var html = `<div id='modal' class='verlogin'>
                        <h1>Login</h1>
                        <table>
                            <tr>
                                <td>
                                    <label>Usuario: </label>
                                </td>
                                <td>
                                    <input type='text' id='loginuser' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Contraseña: </label>
                                </td>
                                <td>
                                    <input type='password' id='loginpass' />
                                </td>
                            </tr>
                        </table>
                        <input type='submit' id='loginsubmit' value='INICIAR SESIÓN'/>
                        <p>¿No estás registrado? <a href="#" id='registro'>¡Regístrate!</a></p>
                        <input type='button' id='cerrar' value='x' />
                    </div>`;
        $("body").append(html);
        //Cambiar icono
        aniadirEventoLogin();
        aniadirEventoCerrar();
        aniadirEventoRegistro();
    } else {
        sessionStorage.removeItem('user');
        $("#login").find("img").attr('src', 'img/login.png');
        location.reload();
    }
}
function aniadirEventoLogin() {
    $("#loginsubmit").click(function () {
        iniciarSesion();
    })
    $("#loginuser").on('keypress', function (e) {
        var code = (e.Code ? e.Code : e.which);
        if (code == '13') {
            iniciarSesion();
        }
    })
    $("#loginpass").on('keypress', function (e) {
        var code = (e.Code ? e.Code : e.which);
        if (code == '13') {
            iniciarSesion();
        }
    })
}
function iniciarSesion() {
    var user = $("#loginuser").val();
    var pass = $("#loginpass").val();
    $.ajax({
        type: 'POST',
        url: 'php/servicios/get.usuario.php',
        dataType: 'json',
        data: 'user=' + user + '&pass=' + pass
    })
        .done(function (data) {
            if (data.user.length == 0) {
                Swal.fire({
                    title: 'Usuario o contraseña erróneos',
                    type: 'error',
                    confirmButtonColor: '#52667a'
                }).then(() => {
                    $("#loginpass").val('');
                })
            } else {
                var user = data.user[0];
                sessionStorage.setItem('user', JSON.stringify(user));
                $("#login").find("img").attr('src', 'img/icons/logout.png');
                if (user.username == 'admin') {
                    //ACTIVAR OPCIONES DE ADMINISTRADOR
                    html = `<li class='menuitem adminoptions'><img src='img/icons/settings.png' id='imgprofile'/>ADMINISTRAR</li>`;
                    $(`${html}`).insertAfter("#search");
                    aniadirEventoAdmin();
                } else {
                    html = `<li class='menuitem profile'><img src='img/icons/login.png' id='imgprofile'/>${user.username}</li>`;
                    $(`${html}`).insertAfter("#search");
                    aniadirEventoPerfil();
                }
                cerrarModal();
            }
        })
        .fail(function (data) {
            console.log(data);
            console.error("Error al iniciar sesión");
        })
}
function esAdmin() {
    if (sessionStorage.getItem('user') == null) {
        return false;
    } else {
        var user = JSON.parse(sessionStorage.getItem('user'));
        if (user.username == 'admin') {
            return true;
        } else {
            return false;
        }
    }
}
function aniadirEventoRegistro() {
    $("#registro").click(function () {
        cerrarModal();
        crearPanelBloqueo();
        crearDivRegistro();
    })
}
function crearDivRegistro() {
    var html = `<div id='modal' class='verregistro'>
                        <h1>Registro</h1>
                        <table>
                            <tr>
                                <td>
                                    <label>Usuario: </label>
                                </td>
                                <td>
                                    <input type='text' id='user' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Contraseña: </label>
                                </td>
                                <td>
                                    <input type='password' id='pass' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Nombre completo: </label>
                                </td>
                                <td>
                                    <input type='text' id='nombre' size='25' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>E-mail: </label>
                                </td>
                                <td>
                                    <input type='email' id='email' size='30'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Direccion: </label>
                                </td>
                                <td>
                                    <input type='text' id='direccion' size='50'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Ciudad: </label>
                                </td>
                                <td>
                                    <input type='text' id='ciudad' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Código Postal: </label>
                                </td>
                                <td>
                                    <input type='text' id='cp' size='5'/>
                                </td>
                            </tr>
                        </table>
                        <input type='submit' id='registrosubmit' value='REGISTRARSE'/>
                        <input type='button' id='cerrar' value='x' />
                    </div>`;
    $("body").append(html);

    aniadirEventoCerrar();
    aniadirEventoNuevoRegistro();
}
function aniadirEventoNuevoRegistro() {
    $("#registrosubmit").click(function () {
        var newuser = validarRegistro();
        if (newuser != null) {
            //Comprobar que el usuario no exista
            $.ajax({
                type: 'POST',
                url: 'php/servicios/get.usuario.php',
                dataType: 'json',
                data: 'user=' + newuser.username
            })
                .done(function (data) {
                    if (data.user.length == 0) {
                        //EL NOMBRE DE USUARIO NO EXISTE

                        //PETCION PARA AÑADIR EL USUARIO A LA BD
                        $.ajax({
                            type: 'POST',
                            url: 'php/servicios/add.usuario.php',
                            dataType: 'json',
                            data: 'username=' + newuser.username +
                                '&password=' + newuser.password +
                                '&nombre=' + newuser.nombre +
                                '&email=' + newuser.email +
                                '&direccion=' + newuser.direccion +
                                '&ciudad=' + newuser.ciudad +
                                '&cp=' + newuser.cp
                        })
                            .done(function (data) {
                                Swal.fire({
                                    title: 'Usuario creado correctamente',
                                    text: 'Recuerda iniciar sesión para procesar la compra',
                                    type: 'success',
                                    confirmButtonColor: '#52667a'
                                })
                                cerrarModal();
                                crearDivLogin();
                            })
                            .fail(function (data) {
                                console.log(data);
                                console.error("Error al crear usuario");
                            })

                    } else {
                        Swal.fire({
                            title: 'El nombre de usuario ya está en uso',
                            type: 'error',
                            confirmButtonColor: '#52667a'
                        })
                    }
                })
                .fail(function (data) {
                    console.log(data);
                    console.error("Error al iniciar sesión");
                })
        }
    })
}

function validarRegistro() {
    var user = $("#user").val().trim();
    var pass = $("#pass").val();
    var nombre = $("#nombre").val().trim();
    var email = $("#email").val().trim();
    var direccion = $("#direccion").val().trim();
    var cp = $("#cp").val().trim();
    var ciudad = $("#ciudad").val().trim();

    if (user == "" || pass == "" || email == "" || direccion == "" || cp == "" || ciudad == "") {
        Swal.fire({
            title: 'Debes rellenar todos los campos del formulario',
            type: 'error',
            confirmButtonColor: '#52667a'
        })
        return null;
    } else {
        var newuser = {};
        newuser.username = user;
        newuser.password = pass;
        newuser.nombre = nombre;
        newuser.email = email;
        newuser.direccion = direccion;
        newuser.ciudad = ciudad;
        newuser.cp = cp;
        return newuser;
    }

}
function buscar() {
    var search = $("#searchinput").val().trim();
    $("#searchinput").val("");
    if (search == "") {
        Swal.fire({
            title: 'Debes introducir un texto para realizar la búsqueda',
            type: 'error',
            confirmButtonColor: '#52667a'
        })
    } else {
        $.ajax({
            type: 'POST',
            url: 'php/servicios/get.search.php',
            dataType: 'json',
            data: 'search=' + search
        })
            .done(function (data) {
                $("#banner").css("display", "none");
                $("#titulo").text("Resultados de la búsqueda \"" + search + "\"");
                $("#articulos").html("");
                var prods = data.prods;
                var length = Object(prods).length;
                for (var i = 0; i < length; i++) {
                    var prod = prods[`${i}`];
                    var html = `<div class='articulo' data_id='${prod.id}'>
                                <img src='img/${prod.carpetaimg}/${prod.imagen}' alt='${prod.nombre}' />
                                <h2>${prod.nombre}</h2>
                                <h3>${formatearPrecio(prod.precio)}</h3>
                                <p>${prod.descripcion}</p>
                            </div>`;
                    $("#articulos").append(html);
                }

                aniadirEventosArticulos();
            })
            .fail(function (data) {
                console.log(data);
                console.error("Error cargando los artículos");
            })
    }
}
function aniadirEventoAdmin() {
    $(".adminoptions").click(function () {
        window.open('admin.html', '_self');
    })
}

function aniadirEventoPerfil() {
    $(".profile").click(function () {
        window.open('profile.html', '_self');
    })
}

function aniadirEventoCheckout() {
    $("#procesarcompra").click(function () {
        if (sessionStorage.getItem('user') != null) {
            cerrarModal();
            crearDivCheckout();
        } else {
            Swal.fire({
                title: 'Debes iniciar sesión para poder procesar la compra',
                type: 'error',
                confirmButtonColor: '#52667a'
            })
            cerrarModal();
            crearDivLogin();
        }
    })
}

function crearDivCheckout() {
    crearPanelBloqueo();
    var user = JSON.parse(sessionStorage.getItem('user'));
    var html = `<div id='modal' class='vercheckout'>
                <div id='receptor'>
                    <div>
                        <h1>Se enviará a: </h1>
                        <div class='datos'>
                            ${user.nombre}
                            <br/>
                            ${user.email}
                            <br/>
                            ${user.direccion}
                            <br/>
                            ${user.cp}
                            <br/>
                            ${user.ciudad}
                        </div>
                    </div>
                    <div>
                        <h1>Dirección de facturación: </h1>
                        <div class='datos'>
                            ${user.nombre}
                            <br/>
                            ${user.email}
                            <br/>
                            ${user.direccion}
                            <br/>
                            ${user.cp}
                            <br/>
                            ${user.ciudad}
                        </div>
                    </div>
                </div>
                <br/>
                <h1>Productos: </h1>
                <table>
                    <thead>
                        <tr>
                            <th> Artículo </th>
                            <th> Color </th>
                            <th> Cantidad </th>
                            <th> Precio(u) </th>
                            <th> Precio (total)</th>
                        </tr>
                    </thead>`;
    
    var pedido = JSON.parse(sessionStorage.getItem("pedido"));
    var total = 0;
    for (item in pedido) {
        var art = JSON.parse(pedido[`${item}`]);
        for (color in art) {
            if (color != "precio" && color != "nombre" && !color.endsWith('img')) {
                var cant = parseInt(art[`${color}`]);
                var precio = parseFloat(art.precio);
                total += (cant * precio);
                var img = art[`${color}img`]
                html += `<tr>
                                <td>${art.nombre}</td>
                                <td>${color}</td>
                                <td>${cant.toString()}</td>
                                <td>${formatearPrecio(precio)}</td>
                                <td>${formatearPrecio(cant * precio)}</td>
                            </tr>`;
            }
        }
    }
    html += `   <tfoot><tr>
                    <td colspan='4'>Total:</td><td>${formatearPrecio(total)}</td>
                </tr></tfoot>
                </table>
                <input type='button' id='comprar' value='COMPRAR' />
                <input type='button' id='cerrar' value='x' />
                </div>`;

    $("body").append(html);
    aniadirEventoCerrar();
    aniadirEventoCompra();
}
function aniadirEventoCompra() {
    $("#comprar").click(function () {
        var iduser = JSON.parse(sessionStorage.getItem('user')).id;
        var strpedido = sessionStorage.getItem('pedido');
        var pedido = JSON.parse(sessionStorage.getItem("pedido"));
        var total = 0;
        for (item in pedido) {
            var art = JSON.parse(pedido[`${item}`]);
            var precio = art.precio;
            for (color in art) {
                if (color != "precio" && color != "nombre" && !color.endsWith('img')) {
                    var cant = art[`${color}`];
                    total += (cant * precio);
                }
            }
        }
        $.ajax({
            type: 'POST',
            url: 'php/servicios/add.pedido.php',
            dataType: 'json',
            data: 'iduser=' + iduser + '&pedido=' + strpedido + '&total=' + total
        })
            .done(function (data) {
                Swal.fire({
                    title: 'Pedido realizado con éxito',
                    text: 'Le informaremos al recibir la confirmación del pago',
                    type: 'success',
                    confirmButtonColor: '#52667a'
                })
                sessionStorage.removeItem("pedido");
                escribirNCarrito();
                cerrarModal();
            })
            .fail(function (data) {
                console.log(data);
                console.error("Error eliminando artículo");
            });
    })
}