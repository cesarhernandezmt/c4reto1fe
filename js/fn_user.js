const LOCAL = "http://localhost:8083/";
const SERVER = "http://xxx.xxx.xxx.xxx:8083/";


function consultarUsuarios(){

    $.ajax({
        url: SERVER + "api/user/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success: function(response){
            console.log(response);
            listarUsuariosAlert(response)
        },
        error: function(jqXHR, textStatus, errorThrown){
            
        }
    });

}

function listarUsuariosAlert(response){

    for(i = 0; i < response.length; i++){
        alert(" | " + response[i].id + " | " + response[i].email+ " | " + response[i].password + " | " + response[i].name + " | ");
    } 

}


function registrarUsuario(){

    if($.trim($("#regName").val()) == "" || $.trim($("#regPassword1").val()) == "" || $.trim($("#regPassword2").val()) == "" || $.trim($("#regEmail").val()) == ""){
        alert("Por favor ingrese todos los campos solicitados, para poder registrar la cuenta de usuario en el sistema.");
    }
    else{
        if($("#regPassword1").val() == $("#regPassword2").val()){

            let myData = {
                email: $("#regEmail").val(),
                password: $("#regPassword1").val(),
                name: $("#regName").val()
            }

            console.log(myData);
            let dataToSend=JSON.stringify(myData);

            $.ajax({
                url: SERVER + "api/user/new",
                method:"POST",
                dataType:"json",
                contentType:"application/json",
                data:dataToSend,
                success:function(response){
                        console.log(response);
                        /*$("#listaUsuarios").empty();
                        $("#regName").val("");
                        $("#regPassword1").val("");
                        $("#regEmail").val("");
                        consultarUsuarios();*/
                        console.log("Se ha añadido el registro de la cuenta de usuario");
                        alert("Se ha añadido el registro de la cuenta de usuario")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.");
                    alert("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.")
                }                
            });

        }
        else{
            alert("Las contraseñas ingresadas no coinciden. Por favor verifique e intente nuevamente.");
        }
    }

}


function iniciarSesion(){

    if($.trim($("#inEmail").val()) == "" || $.trim($("#inPassword").val()) == ""){
        alert("Por favor ingrese todos los campos de registro solicitados, para poder iniciar sesión.");
    }
    else{

        let myData = {
            email: $("#inEmail").val(),
            password: $("#inPassword").val()
        }

        $.ajax({
            url: SERVER + "api/user/" + myData.email + "/" + myData.password,
            method:"GET",
            dataType:"json",
            contentType: "application/json",
            success: function(response){
                console.log(response);
                /*alert(response)*/
                if(response.id != null){
                    alert("Bienvenido " + response.name + ". Ha iniciado sesión existosamente.")
                }
                else{
                    alert("La cuenta de usuario con la que intenta ingresar no existe en el sistema. Por favor revise los datos de su cuenta e intente nuevamente.")
                }

            },
            error: function(jqXHR, textStatus, errorThrown){
            
            }
        });


    }

}

/*
function listarUsuarios(response){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"ID"+"</th>";
    myTable+="<th>"+"CORREO ELECTRONICO"+"</th>";
    myTable+="<th>"+"CONTRASEÑA"+"</th>";
    myTable+="<th>"+"NOMBRE"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";

    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].id+"</td>";
        myTable+="<td>"+response[i].email+"</td>";        
        myTable+="<td>"+response[i].password+"</td>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].id+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].id+')">Borrar</button><center></td>';
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#listaUsuarios").html(myTable);
    

}


function existeUsuario(){

    if($.trim($("#inEmail").val()) == ""){
        alert("Por favor ingrese el campo de registro solicitado, para poder verificar si esta registrada la cuenta de usuario.");
    }
    else{

        let myData = {
            email: $("#inEmail").val(),
        }

        $.ajax({
            url: SERVER + "api/user/" + myData.email,
            method:"GET",
            dataType:"json",
            contentType: "application/json",
            success: function(response){
                console.log(response);
                alert(response)
            },
            error: function(jqXHR, textStatus, errorThrown){
            
            }
        });
        

    }
}
*/