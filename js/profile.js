var userid = JSON.parse(sessionStorage.getItem('user')).id;

$("document").ready(function() {
    cargarDatosForm();

    $("#actualizarDatos").click(function() {
        comprobarPass();
    })

    $(".volver").click(function() {
        window.open('index.html', '_self');
    })

    $.ajax({
            type: 'POST',
            url: 'php/servicios/get.pedidos.php',
            dataType: 'json',
            data: 'id=' + userid
        })
        .done(function(data) {
            //Devuelve 'pedidos' con los idpedido de este user y 'lineas' con las líneas de pedido
            var pedidos = []
            data.pedidos.forEach(pedido => {
                var objpedido = pedido;
                objpedido.lineas = [];
                for (var i = 0; i < data.lineas.length; i++) {
                    var ln = data.lineas[i];
                    if (ln.idpedido == objpedido.id) {
                        delete ln['idpedido'];
                        objpedido.lineas.push(ln);
                    }
                }
                pedidos.push(pedido);
            });
            pedidos.forEach(pedido => {
                html = `<div class='pedido'>
                            <table>
                                <tr id='titulo' class='titulo'>
                                    <th>ref.: #${pedido.id} </th>
                                    <th>
                                        <span>${pedido.fecha}</span>
                                    </th>
                                    <th>
                                        <div class='see'>
                                            <img src='img/icons/binoculars.png' />
                                            <img src='img/icons/arrow-down.png' class='arrow'/>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Producto</th>
                                    <th>Color</th>
                                    <th>Cantidad</th>
                                </tr>`;
                for (var i = 0; i < pedido.lineas.length; i++) {
                    var ln = pedido.lineas[i];
                    html += `<tr>
                                <td>${ln.nombre}</td>
                                <td>${ln.color}</td>
                                <td>${ln.cant}</td>
                            </tr>`;
                }
                html += `<tr>
                                <td colspan='2'> Precio total: </td>
                                <td>${formatearPrecio(pedido.total)}</td>
                            </tr>
                        </table>
                    </div>`;
                $("#pedidos").append(html);
            });

            aniadirEventoPedidos();
        })
        .fail(function(data) {
            console.log(data);
            console.error("Error subiendo las imágenes");
        });
})

function aniadirEventoPedidos() {
    $(".see").click(function() {
        if ($(this).hasClass('desplegado')) {
            $(this).find(".arrow").attr('src', 'img/icons/arrow-down.png');
            $(this).closest("table").find($("tr")).each(function(i, element) {
                if (!$(element).hasClass("titulo")) {
                    $(element).css('display', 'none');
                }
            })
            $(this).removeClass('desplegado');
        } else {
            $(this).find(".arrow").attr('src', 'img/icons/arrow-up.png');
            $(this).closest("table").find($("tr")).each(function(i, element) {
                if (!$(element).hasClass("titulo")) {
                    $(element).css('display', 'table-row');
                }
            })
            $(this).addClass('desplegado');
        }
    })
}

async function comprobarPass() {
    const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (password) {
        var username = JSON.parse(sessionStorage.getItem('user')).username;
        $.ajax({
                type: 'POST',
                url: 'php/servicios/get.usuario.php',
                dataType: 'json',
                data: 'user=' + username
            })
            .done(function(data) {
                if (data.user.length != 0) {
                    var username = $("#txtusername").val();
                    var pass = $("#txtpass").val();
                    var email = $("#txtemail").val();
                    var nom = $("#txtnombre").val();
                    var dir = $("#txtdireccion").val();
                    var ciudad = $("#txtciudad").val();
                    var cp = $("#txtcp").val();
                    var id = JSON.parse(sessionStorage.getItem('user')).id;
                    $.ajax({
                            type: 'POST',
                            url: 'php/servicios/update.usuario.php',
                            dataType: 'json',
                            data: 'id=' + id + '&username=' + username + '&pass=' + pass + '&email=' + email + '&nombre=' + nom + '&direccion=' + dir + '&ciudad=' + ciudad + '&cp=' + cp
                        })
                        .done(function(data) {
                            //Actualizar usuario en sesión
                            sessionStorage.setItem('user', JSON.stringify(data.user[0]));
                            $("#txtpass").val("");
                            Swal.fire({
                                title: 'Datos actualizados con éxito',
                                type: 'success',
                                confirmButtonColor: '#52667a'
                            }).then(() => {
                                cargarDatosForm();
                            })
                        })
                        .fail(function(data) {
                            console.log(data);
                            console.error("Error al actualizar los datos");
                        })

                } else {
                    Swal.fire({
                        title: 'La contraseña es incorrecta',
                        type: 'error',
                        confirmButtonColor: '#52667a'
                    })
                }
            })
            .fail(function(data) {
                console.log(data);
                console.error("Error al comprobar contraseña");
            })
    }

}

function cargarDatosForm() {
    var user = JSON.parse(sessionStorage.getItem('user'));

    $("#txtusername").val(user.username);
    $("#txtemail").val(user.email);
    $("#txtnombre").val(user.nombre);
    $("#txtdireccion").val(user.direccion);
    $("#txtciudad").val(user.ciudad);
    $("#txtcp").val(user.cp);
}

function formatearPrecio(num) {
    var decimales = cuantosDecimales(num);
    if (decimales > 2) {
        num = parseFloat(num).toFixed(2);
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