<template>
  <div>
    <div ref="timeline" style="height: 300px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { DataSet, Timeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.min.css'

const timeline = ref(null)

const hechos = [
  { id: 1, content: 'Independencia de Bolivia', start: '1825-08-06' },
  { id: 2, content: 'Guerra del Pacífico', start: '1879-02-14' },
  { id: 3, content: 'Revolución Nacional', start: '1952-04-09' },
  { id: 4, content: 'Nueva Constitución', start: '2009-02-07' },
  { id: 5, content: 'Creación del Estado Plurinacional', start: '2009-01-22' },
  { id: 6, content: 'Guerra del Chaco', start: '1932-06-15' },
  { id: 7, content: 'Elección de Evo Morales', start: '2005-12-18' },
  { id: 8, content: 'Guerra Federal', start: '1898-12-12' },
  { id: 9, content: 'Fundación de La Paz', start: '1548-10-20' },
  { id: 10, content: 'Derrocamiento de Villarroel', start: '1946-07-21' },
  { id: 11, content: 'Masacre de San Juan', start: '1967-06-24' },
  { id: 12, content: 'Muerte de Che Guevara', start: '1967-10-09', className: 'eventoFinalFortnite' },
  { id: 13, content: 'Referéndum Autonómico', start: '2017-03-20' },
  { id: 14, content: 'Crisis política de 2019', start: '2019-11-10' },
  { id: 15, content: 'Elecciones Generales 2020', start: '2020-10-18' },
]

onMounted(() => {
  const container = timeline.value
  const items = new DataSet(hechos)

  const options = {
    zoomable: false,
    moveable: true,
    margin: { item: 20 },
    orientation: 'top',
    showMajorLabels: true,
    showCurrentTime: false,
    editable: false,
  }

  new Timeline(container, items, options)
})
</script>

<style>
.eventoFinalFortnite{
  background-color: #4caf50;
  color: white;
}
</style>
