// Variable de seleccion de municipio
var selected = null;
var marker = null;
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
    var contentString = "<div style='opacity:0.4!important;height:10%;'><p style='font-size:x-small!important;line-height: 1px!important;'><b>Departamento:</b> " +
        layer.feature.properties.DEPARTAMEN +
        "</p><p style='font-size:x-small!important;line-height: 1px!important;'><b>Provincia:</b>" + layer.feature.properties.PROVINCIA +
        "</p><p style='font-size:x-small!important;line-height: 1px!important;'><b>Municipio:</b>" + layer.feature.properties.MUNICIPIO + "</p></div>";

    marker = L.marker([-12.2,-61.8]).addTo(map);
    var options={
        width: 200,
        height: 60, //size of main popup
        top: 20, //top offset of main popup from map
        left: 230, //left offset of main popup from map
        strenth: 50, //length of the arrow
        base: 10,   // width of the base of arrow
        angle:0,    //dyn value don't care
        //background: "#FF0", //background color of the speechBublle
        borderThick: 1, // the thickness of the borders' speechbubble
        //borderColor: "#0F0",    // color of the border
        borderRadius: 10    // radius for border
    };
    marker.bindSpeechBubble(contentString,options).openSpeechBubble();

    /*layer.bindTooltip(contentString, {
        permanent: false,
        opacity: 0.80
    }).openTooltip([-10.244903,-56.9505987]); //guardar el popup con su estilo

    //si es un navegador compatible enviar al fondo*/
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function whenClicked(layer) {
	var tabla1 = document.getElementById("tbl1"); //tabla
    var tr1 = tabla1.getElementsByTagName("tr"); //fila
	for (i = 1; i < tr1.length; i++) { //loop por fila
        var td1 = tr1[i].getElementsByTagName("td"); //rescatar celdas		
        for (j = 1; j < td1.length - 1; j++) { //loop por celda
            var spanArray1 = td1[j].getElementsByTagName("span");
            var control = spanArray1[0].id;
            spanArray1[0].style.background = "#ffffff"; //no resalta nada
            spanArray1[0].style.color = "#b7a7a7"; // color de texto municipio original
        }
    }



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
    var contentString = "<div style='opacity:0.4!important;'><p style='font-size:x-small!important;line-height: 4px!important;'><b>Departamento:</b> " +
        layer.feature.properties.DEPARTAMEN +
        "</p><p style='font-size:x-small!important;line-height: 4px!important;'><b>Provincia:</b>" + layer.feature.properties.PROVINCIA +
        "</p><p style='font-size:x-small!important;line-height: 4px!important;'><b>Municipio:</b>" + layer.feature.properties.MUNICIPIO + "</p></div>";
    //obtener datos del municipio para unir A-B
	var encontrado = false;
    var valor = layer.feature.properties.c_ut;
    var tabla = document.getElementById("tbl1"); //tabla
    var tr = tabla.getElementsByTagName("tr"); //fila
    for (i = 1; i < tr.length; i++) { //loop por fila
        var td = tr[i].getElementsByTagName("td"); //rescatar celdas		
        for (j = 1; j < td.length - 1; j++) { //loop por celda
            var spanArray = td[j].getElementsByTagName("span");
            var control = spanArray[0].id;
            if (control == valor) { //comparo con el municipio
                spanArray[0].style.background = "red"; //resalto el fondo municipio
                spanArray[0].style.color = "navy"; // color de texto municipio
				encontrado = true;
				break;
            } else {
                spanArray[0].style.background = "#ffffff"; //no resalta nada
                spanArray[0].style.color = "#b7a7a7"; // color de texto municipio original
            }
        }
		if(encontrado)
				break;	
    }

    /*layer.bindTooltip(contentString, {
        permanent: false,
        opacity: 0.75
    }).openTooltip([-10.244903,-56.9505987]); //guardar el popup con su estilo*/
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
    marker = L.marker([-12.2,-61.8]).addTo(map);
    var options={
        height: 80, //size of main popup
        top: 20, //top offset of main popup from map
        left: 200, //left offset of main popup from map
        strenth: 50, //length of the arrow
        base: 10,   // width of the base of arrow
        angle:0,    //dyn value don't care
        //background: "#FF0", //background color of the speechBublle
        borderThick: 0, // the thickness of the borders' speechbubble
        //borderColor: "#0F0",    // color of the border
        borderRadius: 10    // radius for border
    };
    marker.bindSpeechBubble("",options).openSpeechBubble();
    //geojson.closeSpeechBubble();
    //geojson.closeTooltip(); //cierra el popup
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

// cargar datos de variable.js
var geojson = new L.GeoJSON(data, {
    style: style,
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
var imageUrl = "blanco.png",
imageBounds = [[-9.555667, -69.644167],[-22.8999, -57.455]]; //imagen por defecto
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.dragging.disable(); //evita que el usuario arrastre el mapa
map.doubleClickZoom.disable(); //bloquea el doble clic
map.addLayer(geojson); //agregar mapas de municipios