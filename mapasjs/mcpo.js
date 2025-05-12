// Variable de seleccion de municipio
var selected = null;
/*
Una función que define las opciones de Ruta para diseñar líneas
y polígonos GeoJSON, llamada internamente cuando se agregan datos.
 */
function style(feature) {
    return {
        //fillColor: '#ffffff', //color de relleno M A P A - M U N S
        weight: 0.01, // grosor de la linea
        opacity: 0.01, //opacidad del color de relleno
        //color: getColor(feature.properties.CodigoDepa),
        color: '#ffffff', //color del borde ajustado: C4B3AD
        dashArray: '', //marcado de las lineas
        fillOpacity: 0.0005 //transparencia
    };
}

/*
Una función que define las opciones de Ruta para diseñar líneas
y polígonos GeoJSON al poner encima el mouse, llamada internamente
cuando se agregan datos.
 */
function highlightFeature(layer) {
    //var layer = e.target; // rescata el municipio elegido
    layer.setStyle({
        //fillColor: '#ffFF00', //cambia el relleno del area mouse en el mapa
        weight: 1, //grosor de la linea
        color: '#F83D8C', //color del borde area mouse en el mapa
        transparency: 'true', //transparencia
        dashArray: '', //puntos de linea
        fillOpacity: 1 //transparencia
    });
    // mensaje del popup <div class="leaflet-tooltip-own"> </div>
    var contentString = '<small><p style="font-size:9pt;"><b>Departamento:</b> ' +
        layer.feature.properties.DEPARTAMEN +
        '</p><p style="font-size:9pt;"><b>Provincia:</b>' + layer.feature.properties.PROVINCIA +
        '</p><p style="font-size:9pt;"><b>Municipio:</b>' + layer.feature.properties.MUNICIPIO + '</p></small>';
    
    layer.bindTooltip(contentString, {
        permanent: false,
        opacity: 0.75
    }).openTooltip(); //guardar el popup con su estilo

    //si es un navegador compatible enviar al fondo
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function whenClicked(layer) {
    if (selected !== null) {
        var previous = selected;
    }
    //var layer = e.target; // rescata el municipio elegido
    layer.setStyle({
        //fillColor: '#ffFF00', //cambia el relleno del area mouse en el mapa
        weight: 1, //grosor de la linea
        color: '#F83D8C', //color del borde area mouse en el mapa
        transparency: 'true', //transparencia
        dashArray: '', //puntos de linea
        fillOpacity: 1 //transparencia
    });
 
    // mensaje del popup <div class="leaflet-tooltip-own"> </div>
   var contentString = '<small><p style="font-size:9pt;"><b>Departamento:</b> ' +
        layer.feature.properties.DEPARTAMEN +
        '</p><p style="font-size:9pt;"><b>Provincia:</b>' + layer.feature.properties.PROVINCIA +
        '</p><p style="font-size:9pt;"><b>Municipio:</b>' + layer.feature.properties.MUNICIPIO + '</p></small>';
    //obtener datos del municipio para unir A-B
    var valor = layer.feature.properties.c_ut;
    var tabla = document.getElementById("tbl1"); //tabla
    var tr = tabla.getElementsByTagName("tr"); //fila
    for (i = 0; i < tr.length; i++) { //loop por fila
        var td = tr[i].getElementsByTagName("td"); //rescatar celdas
        for (j = 0; j < td.length; j++) { //loop por celda
            var spanArray = td[j].getElementsByTagName('span');
            var control = spanArray[0].id;
            //console.log(control);
            if (control == valor) { //comparo con el municipio
                spanArray[0].style.background = "red"; //resalto el fondo municipio
                spanArray[0].style.color = "navy"; // color de texto municipio
            } else {
                spanArray[0].style.background = "#ffffff"; //no resalta nada
                spanArray[0].style.color = "#b7a7a7"; // color de texto municipio original
            }
        }
    }

    layer.bindTooltip(contentString, {
        permanent: false,
        sticky: "true",
        className: 'myCSSClass'
    }).openTooltip(); //guardar el popup con su estilo
    selected = layer;
    if (previous) {
        resetHighlight(previous);
    }
    //si es un navegador compatible enviar al fondo
    if (!L.Browser.edge && !L.Browser.opera) {
        layer.bringToFront();
    }
}

/*
Quitar los resaltados del mapa
 */
function resetHighlight(layer) {
    //console.log(e.target);
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        geojson.resetStyle(layer); //quitar el resaltado
    }
    geojson.closeTooltip(); //cierra el popup
}

/*
ampliar el zoom con el mouse
 */
function zoomToFeature(e) { //zoom con el mouse
    //map.fitBounds(e.target.getBounds());
}

/*
marcar cada poligono en el mapa
 */
//marcando cada poligono
function onEachFeature(feature, layer) {
    layer.on({
        'mouseover': function (e) {
            highlightFeature(e.target);
        },
        'mouseout': function (e) {
            resetHighlight(e.target);
        },
        'click': function (e) {
            whenClicked(e.target);
        }
    });
}

//cargar los datos geojson
var data = countries; // carga del variable.js
var map = L.map('map', { //mapa configurado
    center: [-16.3802622, -63.53315519094469],
    zoom: 5.65, //zoom original Ajustar Tamaño MAPA
    zoomSnap: 0.28, //ajuste del zoom
    minZoom: 5.65, //limite minimo zoom
    maxZoom: 5.65, // limite maximo zoom
    autoPan: false, //evita zoom por click
    zoomControl: false // oculta control de zoom
});

//definir los estilos
var myStyle = {
    "color": "#ffffff",
    "weight": 5,
    "opacity": 0.9,
};

var texto = window.location.href;

console.log(texto);
texto = texto.replace("http://localhost:8088/arlat/","");
texto = texto.replace("https://late.arlat.org/","");
texto = texto.replace(".html","");
texto = texto.replace("-2/","");
console.log(texto);
// cargar datos de variable.js
var geojson = new L.GeoJSON(data, {
    style: function (feature) { //estilo visual
            return {
                weight: 1,
                opacity: 3,
                color: '#ff0000',
                dashArray: '',
                fillOpacity: 0.7
            };
        },
	filter: function (feature) { //filtro
        if (feature.properties.c_ut === texto)
            return true;
    },
    onEachFeature: function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                highlightFeature(e.target);
            },
            'mouseout': function (e) {
                resetHighlight(e.target);
            },
            'click': function (e) {
                whenClicked(e.target);
            }
        });
    }
});

//adiciono la mascara al mapa y al fondo
//imageBounds = imageBounds = [[-9.666667,-69.644167], [-22.9,-57.455]];
var imageUrl = "http://late.arlat.org/mapping/blanco.png",
imageBounds = [
    [-9.555667, -69.644167],
    [-22.8999, -57.455]
]; //imagen por defecto
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.dragging.disable(); //evita que el usuario arrastre el mapa
map.doubleClickZoom.disable(); //bloquea el doble clic
map.addLayer(geojson); //agregar mapas de municipios

//Elegir los tipos de mapa a trabajar
function getValor() {
    var ele = document.getElementsByName('color'); //obtiene el valor elegido
    for (i = 0; i < ele.length; i++) {
        var imageUrl = "./po26_com_1.jpg"; // valor por defecto en la imagen
        if (ele[i].checked) {
            console.log(ele[i].value);
            //direccionar URL
            switch (ele[i].value) {
            case 'Actividad':
                imageUrl = "http://late.arlat.org/mapping/po26_com_1_2.png"; //poner el nombre del archivo correcto
                break;
            case 'Agropecuaria':
                imageUrl = "http://late.arlat.org/mapping/po01_agr_1.jpg";
                break;
            case 'Industria':
                imageUrl = "http://late.arlat.org/mapping/po08_ind_1.jpg";
                break;
            case 'Bienes':
                imageUrl = "http://late.arlat.org/mapping/vbp_0white.jpg";
                break;
            case 'Servicios':
                imageUrl = "http://late.arlat.org/mapping/vbp30_serv_0.jpg";
                break;
            case 'Población':
                imageUrl = "http://late.arlat.org/mapping/vbp_0.jpg";
                break;
            case 'Producción':
                imageUrl = "http://late.arlat.org/mapping/po04_gap_1.jpg";
                break;
            case 'Ocupación':
                imageUrl = "http://late.arlat.org/mapping/vbp04_gap_0.jpg";
                break;
            case 'Inversión':
                imageUrl = "http://late.arlat.org/mapping/vbp01_agr_0.jpg";
                break;
            case 'Departamental':
                imageUrl = "http://late.arlat.org/mapping/vbp04_gap_0.jpg";
                break;
            case 'Municipal':
                imageUrl = "http://late.arlat.org/mapping/vbp06_hid_0.jpg";
                break;
            case 'Regional':
                imageUrl = "http://late.arlat.org/mapping/vbp07_min_0.jpg";
                break;
            default: //Otra
                imageUrl = "http://late.arlat.org/mapping/po06_hid_1.jpg";
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

	