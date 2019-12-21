<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script src="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js"></script>  

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
      windowInnerHeight: '',
  }), 
  methods: {

  },
  
}
</script>


