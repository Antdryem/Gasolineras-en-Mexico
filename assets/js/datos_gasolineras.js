/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//carga los datos por defecto

var lugares_info = [];
window.onload = function () {
    tomar_estados();
    cargar_gasolineras();
}


function cargar_gasolineras() {//paginacion, estado, municipio, codigo_postal, tamano_consulta) {
    $.ajax({
        url: "backend/switch_acciones.php",
        type: "post",
        data: {
            accion: 3,
            paginacion: $("input[id=pagina_actual]").val(),
            municipio: $("select[id=filtro_municipio]").val(),
            estado: $("select[id=filtro_estado]").val(),
            codigo_postal: $("input[id=filtro_cp]").val(),
            tamano_consulta: $("input[id=tamano]").val(),
            modo: 0, //modo 0 es tomar datos, modo 1 es contar la cantidad de registros
        },
        success: function (salida) {
            console.log(salida);
            paginador();
            $("tbody").html("");
            $.parseJSON(salida).forEach(
                    function (objeto, id) {
                        $("tbody").append("<tr>\n\
                            <td>" + objeto._id + "</td>\n\
                            <td>" + objeto.razonsocial + "</td>\n\
                            <td>" + objeto.calle + "</td>\n\
                            <td>" + objeto.codigopostal + "</td>\n\
                            <td>" + objeto.longitude + "</td>\n\
                            <td>" + objeto.latitude + "</td>\n\
                        </tr>");

//                        var informacion = {
//                            posicion: {lat: objeto.latitude, lng: objeto.longitude},
//                            nombre: objeto.calle
//                        }
//
//                        lugares_info.push(informacion);
                        //crear_marcador_mapa(parseFloat(objeto.latitude), parseFloat(objeto.longitude), objeto.calle);
                    }
            );
        }
    });
}

function tomar_estados() {
    $.ajax({
        url: "backend/switch_acciones.php",
        type: "post",
        data: {
            accion: 1
        },
        success: function (salida) {
            $.parseJSON(salida).forEach(function (objeto, id) {
                $("select[id=filtro_estado]").append("<option value=" + objeto[0] + " >" + objeto[1] + "</option>");
            });
        }
    });
}

function cambiar_municipios(id_estado) {
    $.ajax({
        url: "backend/switch_acciones.php",
        type: "post",
        data: {
            accion: 2,
            id_estado: id_estado
        },
        success: function (salida) {
            var select_html = "<option value=0 selected>Sin filtro</option>";
            $.parseJSON(salida).forEach(function (objeto, id) {
                select_html += "<option value=" + objeto[0] + ">" + objeto[1] + "</option>";
            });
            $("select[id=filtro_municipio]").html(select_html);
        }

    });
}

function paginador() {
    $.ajax({
        url: "backend/switch_acciones.php",
        type: "post",
        data: {
            accion: 3,
            paginacion: $("input[id=pagina_actual]").val(),
            municipio: $("select[id=filtro_municipio]").val(),
            estado: $("select[id=filtro_estado]").val(),
            codigo_postal: $("input[id=filtro_cp]").val(),
            tamano_consulta: $("input[id=tamano]").val(),
            modo: 1, //modo 0 es tomar datos, modo 1 es contar la cantidad de registros
        },
        success: function (salida) {
            console.log(salida);
            if ($("input[id=tamano]").val() == "0" || $("input[id=tamano]").val() == "")
                var numero = 15;
            else
                var numero = $("input[id=tamano]").val();

            $("a[id=paginas_totales]").text(Math.ceil(salida / numero));
        }
    });
}

function dibujar_mapa() {
    map = new google.maps.Map(document.getElementById('mapita'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8});

}

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat: -28.024, lng: 140.887}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
var locations = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
    {lat: -37.750000, lng: 145.116667},
    {lat: -37.759859, lng: 145.128708},
    {lat: -37.765015, lng: 145.133858},
    {lat: -37.770104, lng: 145.143299},
    {lat: -37.773700, lng: 145.145187},
    {lat: -37.774785, lng: 145.137978},
    {lat: -37.819616, lng: 144.968119},
    {lat: -38.330766, lng: 144.695692},
    {lat: -39.927193, lng: 175.053218},
    {lat: -41.330162, lng: 174.865694},
    {lat: -42.734358, lng: 147.439506},
    {lat: -42.734358, lng: 147.501315},
    {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352}
]

//
//
//var map;
//function initMap() {
//    var myLatLng = {lat: 19, lng: -99};
//
//    var map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 4,
//        center: myLatLng
//    });
//
//    var marker = new google.maps.Marker({
//        position: myLatLng,
//        map: map,
//        title: 'Hello World!'
//    });
//    marker.setMap(null);
//
//
//
//}
//
//
//function crear_marcador_mapa(latitud, longitud, nombre) {
//    var myLatlng = new google.maps.LatLng(latitud, longitud);
//    var mapOptions = {
//        zoom: 4,
//        center: myLatlng
//    }
//    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
//    var marker = new google.maps.Marker({
//        position: myLatlng,
//        title: nombre
//    });
//
//// To add the marker to the map, call setMap();
//    marker.setMap(map);
//}