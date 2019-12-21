<template>
  <v-row justify="center">
    <v-dialog v-model="menu" fullscreen hide-overlay transition="dialog-bottom-transition">

      <v-card class="menu-card">

         <v-row
            align="center"
            justify="center"
            style="height: 100%;"
          >
            <v-col md="5" class="menu">
              <img 
                src="https://ziemiasadecka.appen.pl/img/logo_sadeckie.png"

              />
              <router-link to="/" >Wstęp</router-link>
              <router-link to="/places">Miejsca</router-link>
              <router-link to="/routes">Trasy</router-link>
            </v-col>
          </v-row>
        
       
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>


export default {
  components: {  },
  props: ['menu'],
  data() {
    return {

    }
  },

  watch: {

  },
  methods: {

 
    
  },
  created() {
      console.log("jestem");
      console.log(this.menu);

  },
  computed: {



  },
  
};
</script>




<style lang="scss">



</style>

