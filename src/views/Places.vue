<template>
  <v-window
    v-model="window"
    class="elevation-1"
    :vertical="vertical"
    :show-arrows="showArrows"
    style="height: 100%;"
    :touchless="windowTouchless"
  >
    <v-window-item :style="'height: ' + (windowInnerHeight - 58) + 'px'">
      <!-- carousel content -->

      <v-card id="lateral">
        <v-toolbar light tabs flat color="white">
          <img
            class="logo"
            v-if="windowInnerWidth >= 768"
            src="https://ziemiasadecka.appen.pl/img/logo_sadeckie.png"
          />
          <v-spacer></v-spacer>
          <toolbar v-if="windowInnerWidth >= 768"></toolbar>
          <v-toolbar-title
            class="justify-center"
            v-if="windowInnerWidth < 768"
            @click="flyHome()"
          >Miejsca</v-toolbar-title>
          <v-spacer></v-spacer>

          <!--<v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>-->
          <div class="menu-button">
            <v-btn icon @click="isMenuOpen = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>

          <template v-slot:extension>
            <v-tabs v-model="tabs" background-color="transparent" :mobile-break-point="1000">
              <v-tab
                v-for="(cat, index) in tabCats"
                :key="index"
                :href="'#cat-' + index"
                @click="changeCat(cat.gsx$id['$t'])"
                :ripple="false"
              >{{cat.gsx$name['$t']}}</v-tab>

              <v-tabs-slider :color="catsSliderColor()"></v-tabs-slider>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>

      <l-map :zoom="zoom" :center="center" ref="map" :options="{zoomControl: false}">
        <v-slide-y-transition>
          <v-snackbar
            v-model="snackbar"
            :top="y === 'top'"
            :multi-line="mode"
            :timeout="0"
            class="point-clicked"
            @click="goToDescription"
          >
            {{ placeName }}
            <v-icon class="ml-1">mdi-chevron-right</v-icon>
          </v-snackbar>
        </v-slide-y-transition>

        <l-tile-layer
          ref="tileLayer"
          :url="url"
          :attribution="attribution"
          :detectRetina="false"
          :options="{dragging: false, zoomOffset: -1, tileSize: 512}"
        ></l-tile-layer>
        <!--flyTo(place.gsx$lat['$t'], place.gsx$lon['$t'])-->
        <l-feature-group ref="group">
          <l-marker
            v-for="(place, index) in category"
            :key="index"
            :lat-lng="[place.gsx$lat['$t'], place.gsx$lon['$t']]"
            @click="pickedPlace(place.gsx$id['$t'], place.gsx$name['$t'] , place.gsx$category['$t'], place.gsx$description['$t'], place.gsx$photo['$t'])"
          >
            <l-icon
              style="width: 30px; height: 30px;"
              :icon-anchor="dynamicAnchor"
              :icon-url="'https://ziemiasadecka.appen.pl/img/ikona_' + placeCats[Number(place.gsx$category['$t']) - 1].gsx$name['$t'].toLowerCase() + '.png'"
            />
          </l-marker>
          <!--<v-locatecontrol/>-->
        </l-feature-group>
      </l-map>

      <v-btn
        absolute
        light
        fab
        top
        right
        small
        color="white"
        class="geolocation"
        @click="geoLocation()"
      >
        <v-icon>mdi-map-marker-radius</v-icon>
      </v-btn>

      <!--<v-btn
        absolute
        light
        fab
        top
        right
        color="white"
        class="menu"
        @click="isMenuOpen = true"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->

      <menu-modal :menu="isMenuOpen"></menu-modal>
    </v-window-item>
    <v-window-item class="place" style="height: calc(100% - 58px);">
      <v-app-bar light tabs flat color="white" fixed>
        <span class="back-button link" @click="backFromDescription">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </span>
      </v-app-bar>

      <v-row align="center" justify="center" @click="backFromDescription" class="main">
        <v-col md="5">
          <h6 class="category">{{ placeCatName }}</h6>
          <h1 class>{{ placeName }}</h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" @click="backFromDescription">
        <v-col md="8" lg="7">
          <!--<v-parallax :src="'http://appen.nazwa.pl/hardlight/projekty/ZiemiaSadeckaPowiatNS/photo/' + placePhoto"></v-parallax>-->
          <v-img
            v-if="placePhoto && placePhoto !== '1piksel.jpg'"
            :src="'https://appen.nazwa.pl/hardlight/projekty/ZiemiaSadeckaPowiatNS/photo/' + placePhoto"
            lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
            class="grey lighten-2"
          ></v-img>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" @click="backFromDescription">
        <v-col md="5">
          <p class="mb-5">{{ placeDesc }}</p>
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<script>
import { LMap, LTileLayer, LFeatureGroup, LMarker, LIcon } from "vue2-leaflet";
import { latLng, icon } from "leaflet";
import vuetify from "../plugins/vuetify";
import MenuModal from "../components/Menu";
import Toolbar from "../components/Toolbar";

//import Vue2LeafletLocatecontrol from '../components/Vue2LeafletLocatecontrol'

export default {
  components: {
    LMap,
    LTileLayer,
    LFeatureGroup,
    LMarker,
    LIcon,
    MenuModal,
    Toolbar
  },
  data() {
    return {
      //drawer: false,
      //group: null,
      windowInnerWidth: "",
      windowInnerHeight: "",

      isMenuOpen: false,

      map: {},
      settings: [],

      places: [],
      placeName: "",
      placeCat: "",
      placeCatName: "",
      placeDesc: "",
      placePhoto: "",

      placeCats: [],
      choosenCategory: "3",
      bottomNav: "recent",
      zoom: 10,

      center: L.latLng(49.554531, 20.756666),

      //url:'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      url:
        "https://api.mapbox.com/styles/v1/szymonkubisa/ck23hhdr80yve1cp6vsp4d7il/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3p5bW9ua3ViaXNhIiwiYSI6Ik1xRmRPN1UifQ.pPBLCZWYgHq_cbJ9_Fxvzw",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: icon({
        iconUrl: "https://ziemiasadecka.appen.pl/img/ikona_sakralne.png",
        iconSize: [42, 52],
        iconAnchor: [16, 37]
      }),

      customText: "Foobar",

      snackbar: false,
      mode: "multi-line",
      y: "top",

      locationLon: 0,
      locationLat: 0,
      altitude: 0,
      heading: 0,

      fab: false,
      hidden: false,
      tabs: null,
      color: "",

      //carousel
      window: 0,
      windowTouchless: true,
      showArrows: false,
      hideDelimiters: true,
      cycle: false,
      vertical: false
    };
  },

  watch: {
    group() {
      this.drawer = false;
    }
  },

  methods: {
    handleResize() {
      this.windowInnerWidth = window.innerWidth;
      this.windowInnerHeight = window.innerHeight;
    },

    flyTo(lat, lon) {
      this.map.flyTo([lat, lon], 16);
    },

    flyHome() {
      this.map.flyTo([49.554531, 20.756666], 9);
    },

    pickedPlace(id, name, cat, desc, photo) {
      console.log(id, name, cat);
      this.placeCat = cat;
      this.placeCatName = this.placeCats[Number(cat) - 1].gsx$desc["$t"];
      this.placeName = name;
      this.placeDesc = desc;
      this.placePhoto = photo;
      this.snackbar = true;
      console.log(this.placeCats);
    },

    goToDescription() {
      window.scrollTo({ top: 0 });
      this.window = 1;
      this.windowTouchless = false;
    },

    backFromDescription() {
      window.scrollTo({ top: 0 });
      this.window = 0;
      this.windowTouchless = true;
    },

    fitBounds() {
      //let featureGroup = this.$refs["group"];
      //this.map.fitBounds(featureGroup.getBounds());
      console.log("refs:", this.$refs);
      //console.log('group:', this.$refs.map.fitBounds());
    },

    changeCat(cat) {
      this.snackbar = false;
      console.log("co to : ", cat);
      let catInt = Number(cat);
      //catInt -= 2;
      console.log(catInt);
      let catString = catInt.toString();
      this.choosenCategory = catString;
      console.log("a to: ", catString);

      this.fitBounds();
    },

    catsSliderColor() {
      let cat = Number(this.choosenCategory);
      if (cat === 12) return "natura";
      if (cat === 11) return "uzdrowiska";
      if (cat === 5) return "zamki";
      if (cat === 6) return "schroniska";
      if (cat === 7) return "konie";
      if (cat === 15) return "noclegi";
      if (cat === 10) return "parkilin";
      if (cat === 8) return "zima";
      if (cat === 9) return "woda";
      if (cat === 4) return "kultura";

      if (cat !== 11) return "red";
    },

    geoLocation() {
      this.map.on("locationfound", this.onLocationFound);
      this.map.on("locationerror", this.onLocationError);

      this.map.locate({ setView: true, maxZoom: 16 });

      /*
      if(!this.locationLon) {
        if (navigator.geolocation) {
          console.log("geolocation");
          navigator.geolocation.getCurrentPosition(this.onLocationFound);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        this.flyTo(this.locationLat, this.locationLon);
      }
      */
    },

    onLocationFound(e) {
      /*
	  L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map)
        .bindPopup("You are within meters from this point").openPopup();
      this.flyTo(position.coords.latitude, position.coords.longitude)
      this.locationLat = position.coords.latitude;
      this.locationLon = position.coords.longitude;

      L.circle(e.latlng, radius).addTo(map);*/

      var radius = e.accuracy / 2;

      L.marker(e.latlng)
        .addTo(this.map)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

      L.circle(e.latlng, radius).addTo(this.map);

      console.log(e);
      console.log(e.altitude);
      console.log(e.heading);

      this.altitude = e.altitude;
      this.heading = e.heading;
    },

    onLocationError(e) {
      alert(e.message);
    }
  },
  created() {
    // Pobieranie ustawien

    /*     this.map.on("click", function(ev) {
      alert(ev.latlng); // ev is an event object (MouseEvent in this case)
    }); */

    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    let googleSheetID = "1lQXmRmMmf4Rn7WOgyte2ja5q7HTT6Ya99JMnucv7grA";
    //let googleSheetID = '1SdTtRIyXZkH50iC4JA9ODVozh7F6ZWS6g1jUT7ToqCo';

    let urlSettings =
      "https://spreadsheets.google.com/feeds/list/" +
      googleSheetID +
      "/5/public/values?alt=json";
    let urlPlaces =
      "https://spreadsheets.google.com/feeds/list/" +
      googleSheetID +
      "/1/public/values?alt=json";
    let urlPlaceCats =
      "https://spreadsheets.google.com/feeds/list/" +
      googleSheetID +
      "/4/public/values?alt=json";
    /*
    $.getJSON(urlSettings, function(data) {
		  self.settings = data;
    });
    */
    fetch(urlSettings).then(response => {
      return response
        .json()
        .then(json => {
          this.settings = json.feed.entry[0];
          console.log(this.settings);
        })
        .then(() => {});
    });

    fetch(urlPlaces).then(response => {
      return response
        .json()
        .then(json => {
          this.places = json.feed.entry;
        })
        .then(() => {
          console.log(this.places);
        });
    });

    fetch(urlPlaceCats).then(response => {
      return response
        .json()
        .then(json => {
          this.placeCats = json.feed.entry;
        })
        .then(() => {
          console.log(this.placeCats);
        });
    });
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 0.9];
    },

    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },

    tabCats: function() {
      let that = this;
      return this.placeCats.filter(function(cat) {
        return (
          cat.gsx$id["$t"] !== "1" &&
          cat.gsx$id["$t"] !== "2" &&
          cat.gsx$id["$t"] !== "18"
        );
        //console.log(place)
      });
    },

    category: function() {
      let that = this;
      return this.places.filter(function(place) {
        return place.gsx$category["$t"] === that.choosenCategory;
        //console.log(place)
      });
    },

    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "success", icon: "share" };
        case "two":
          return { color: "red", icon: "edit" };
        case "three":
          return { color: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  mounted() {
    /*const mapComponent = this.$refs.map;
    this.map = mapComponent;
    console.log(this.map);*/

    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject; // work as expected
    });

    //this.geoLocation();
  }
};
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

html,
body,
#app {
  height: 100%;
  margin: 0;
}

/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>

