<template>
    <v-toolbar-items>
    <v-btn :class="isActive('about')" text><router-link to="/">Wstęp</router-link></v-btn>
    <v-btn :class="isActive()" text><router-link to="/places">Miejsca</router-link></v-btn>
    <v-btn :class="isActive('routes')" text><router-link to="/routes">Trasy</router-link></v-btn>
    </v-toolbar-items>
</template>


<script>

export default {
  components: {  },
  props: ['active'],
  data() {
    return {

    }
  },

  watch: {
  },
  methods: {

      isActive(active) {
          console.log('Active: ', active);
          console.log('this active: ', this.active);

          if(active === this.active) return 'active';
      }

  },
  created() {

  },

  computed: {



  },
  
};
</script>




<style lang="scss">



</style>

