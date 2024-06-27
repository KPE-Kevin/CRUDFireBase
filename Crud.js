(function () {

    const config = {
        apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        //projectId: "formulario2-b6be5",
        storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        //messagingSenderId: "522161596122",
        //appId: "1:522161596122:web:53c8708930831788c027e3"
    };

    // Initialize Firebase
    firebase.initializeApp(config);

    const preObject = document.getElementById('tareas');
    //Crear Referencias
    const dbRefObject = firebase.database().ref('Asignacion');

    var txtNombreTarea = document.getElementById('nombreT');
    var txtEstatusTarea = document.getElementById('estado-tarea');
    var txtDescripcionTarea = document.getElementById('descripcion');
    var txtIDTarea = document.getElementById('idTarea');
    var txtOpcion = document.getElementsByName('accion');

    var btnAgregar = document.getElementById('btnrealizar');


    btnAgregar.addEventListener('click', function () {

        var nombreTarea = txtNombreTarea.value;
        var estadoTarea = txtEstatusTarea.value;
        var descripcionTarea = txtDescripcionTarea.value;
        var idTarea = txtIDTarea.value;
        const dbRefObjectAgregar = firebase.database().ref('Asignacion');
        const dbRefObjectEM = firebase.database().ref('Asignacion/' + idTarea);

        var objeto = {
            Tarea: nombreTarea,
            Estado: estadoTarea,
            Descripcion: descripcionTarea

        }

        let valorSeleccionado;
        for (const opcion of txtOpcion) {
            if (opcion.checked) {
                valorSeleccionado = opcion.value;
                break;
            }
        }


        if (valorSeleccionado == 'Agregar') {
            dbRefObjectAgregar.push(objeto);
        } else if (valorSeleccionado == 'Modificar') {
            dbRefObjectEM.update(objeto);
        } else if (valorSeleccionado == 'Eliminar') {
            dbRefObjectEM.remove();
        }
        //insertar
        //dbRefObjectAgregar.push(objeto);

        //eliminar
        //dbRefObjectEM.remove();

        //Modificar
        //dbRefObjectEM.update(objeto);
    });


    dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

}());