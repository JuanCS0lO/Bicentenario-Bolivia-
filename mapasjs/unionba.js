window.value = ""; //variable de municipio
//eventos diferidos de HTML
var ggjson; //variable del mapa municipal
var ggjson1; //variable del mapa departamental
/* elegir el poligono desde el municipio */
function clickHandler(object) {
    window.value = object.id;
    object.style.backgroundColor = 'red';
    object.style.color = 'navy';

    //limpio si hay un mapa anterior
    if (map.hasLayer(ggjson))
        map.removeLayer(ggjson);

    if (map.hasLayer(ggjson1))
        map.removeLayer(ggjson1);

    //cargo el mapa del departamento seleccionado
    ggjson1 = new L.GeoJSON(states, {
        filter: function (feature) { //filtro
            if (feature.properties.COD_DEP === window.value.substring(0, 2))
                return true;
        },
        style: function (feature) { //estilo visual
            return {
                weight: 2,
                opacity: 3,
                color: '#ff0000',
                dashArray: '',
                fillOpacity: 0.1
            };
        }
    });
    map.addLayer(ggjson1); //adicionado al mapa
    //console.log(window.value);
    //cargo el mapa del municipio seleccionado
    ggjson = new L.GeoJSON(countries, {
        filter: function (feature) { //filtro
            if (feature.properties.c_ut == window.value)
                return true;
        },
        style: function (feature) { //estilo visual
            return {
                fillColor: '#ff0000',
                weight: 1,
                opacity: 3,
                color: '#ffffff',
                dashArray: '',
                fillOpacity: 0.7
            };
        }
    });
    map.addLayer(ggjson); //adicionado al mapa

    setTimeout(function () {
        //map.removeLayer(ggjson1);
        ggjson1.bringToBack();
        ggjson.bringToBack();
    }, 7000);
}



/* funcion al hacer click */
function clearMap() {
  map.removeLayer(ggjson1);
  map.removeLayer(ggjson);
}

//NombreMuni
function dataMuni(object) {
    let uri = object.id; //obtenemos el codigo del municipio 010101 Sucre p.e.
    var url = "https://localhost/" + uri +"/"; //cargamos la direccion web

    var win = window.open(url, '_blank'); //abrimos la nueva pestaña
    win.focus(); //ponemos foco en la nueva pestaña abierta
}

//Elegir los tipos de mapa a trabajar
function getValor() {
    var ele = document.getElementsByName('color'); //obtiene el valor elegido
    for (i = 0; i < ele.length; i++) {
        var imageUrl = "blanco.png"; // valor por defecto en la imagen
        if (ele[i].checked) {
            console.log(ele[i].value);
            //direccionar URL
            switch (ele[i].value) {
            case 'Actividad':
                imageUrl = "po26_com_1_2.png"; //poner el nombre del archivo correcto
                break;
            case 'Agropecuaria':
                imageUrl = "po01_agr_1.jpg";
                break;
            case 'Industria':
                imageUrl = "po08_ind_1.jpg";
                break;
            case 'Bienes':
                imageUrl = "vbp_0white.jpg";
                break;
            case 'Servicios':
                imageUrl = "vbp30_serv_0.jpg";
                break;
            case 'Población':
                imageUrl = "vbp_0.jpg";
                break;
            case 'Producción':
                imageUrl = "po04_gap_1.jpg";
                break;
            case 'Ocupación':
                imageUrl = "vbp04_gap_0.jpg";
                break;
            case 'Inversión':
                imageUrl = "vbp01_agr_0.jpg";
                break;
            case 'Departamental':
                imageUrl = "vbp04_gap_0.jpg";
                break;
            case 'Municipal':
                imageUrl = "vbp06_hid_0.jpg";
                break;
            case 'Regional':
                imageUrl = "vbp07_min_0.jpg";
                break;
            default: //Otra
                imageUrl = "po06_hid_1.jpg";
                break;
            }
            var imageBounds = [
                [-9.555667, -69.644167],
                [-22.8999, -57.455]
            ];
            L.imageOverlay(imageUrl, imageBounds).addTo(map);
        }
    }
}

//on mouse out
function fueraFoco(object) {
    object.style.backgroundColor = "#ffffff"; //color fondo
    object.style.color = "#b7a7a7"; // color letra
}
