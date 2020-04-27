<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include 'clase.php';

$proceso = new gasolineras;

switch ($_POST['accion']) {
    case "1"://listado de estados
        echo $proceso->tomar_estados();
        break;
    case "2"://busqueda de municipios en base al estado
        echo $proceso->tomar_municipios($_POST['id_estado']);
        break;
    case "3":
        $sintaxis = ""; //busqueda y conteo de gasolineras
        if (!$_POST['estado'] == "0" && !$_POST['estado'] == null && !$_POST['estado'] == "") { //validación de campo estado
            if (!$_POST['municipio'] == "0" && !$_POST['municipio'] == null && !$_POST['municipio'] == "") { //validación de campo municipio
                $consulta = "  municipio.id_municipio='" . $_POST['municipio'] . "' ";
            } else {
                $consulta = "  estado.id_estado='" . $_POST['estado'] . "' ";
            }
        }else{
            $consulta="";
        }

        if (!$_POST['codigo_postal'] == "0" && !$_POST['codigo_postal'] == null && !$_POST['codigo_postal'] == "") {//validación de campo Código podtal
            $consulta = "  cp.nombre='" . $_POST['codigo_postal'] . "' ";
        }
        if (!$_POST['tamano_consulta'] == "0" && !$_POST['tamano_consulta'] == null && !$_POST['tamano_consulta'] == "") {// define el tamaño de la consulta
            $tamano = $_POST['tamano_consulta'];
        } else {
            $tamano = 15;
        }
        if (!$_POST['paginacion'] == "0" && !$_POST['paginacion'] == null && !$_POST['paginacion'] == "") {// en base a este número y a la paginación, define en donde empezará a tomar los datos
            $paginacion=$_POST['paginacion'];
        }else
            $paginacion=1;
        
        echo $proceso->consultar_gasolineras($consulta, $paginacion, $tamano, $_POST['modo']);
        break;
}

$proceso->cerrar();
unset($proceso);
