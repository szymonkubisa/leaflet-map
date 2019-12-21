<template>
  <v-window
    v-model="window"
    class="elevation-1"
    :vertical="vertical"
    :show-arrows="showArrows"
    style="height: 100%;"
    :touchless="windowTouchless"
  >
    <v-window-item :style="'height: ' + (windowInnerHeight - 58) + 'px;'">
      <!-- carousel content -->

      <v-card id="lateral">
        <v-toolbar light tabs flat color="white">
          <img
            class="logo"
            v-if="windowInnerWidth >= 768"
            src="https://ziemiasadecka.appen.pl/img/logo_sadeckie.png"
          />
          <v-spacer></v-spacer>
          <toolbar v-if="windowInnerWidth >= 768" :active="this.$router.currentRoute.name"></toolbar>
          <v-toolbar-title
            class="justify-center"
            v-if="windowInnerWidth < 768"
            @click="pointsOnRouteUpdate()"
          >Szlaki</v-toolbar-title>
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
                v-for="(cat, index) in routeCats"
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

      <l-map
        :zoom="zoom"
        :zoomSnap="zoomSnap"
        :center="center"
        ref="map"
        :options="{zoomSnap: 0.5, zoomControl: false, attributionControl: true, zoomOffset: -1, detectRetina: true}"
      >
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
          :detectRetina="true"
          :options="{dragging: false, zoomOffset: -1, tileSize: 512}"
        ></l-tile-layer>
        <!--flyTo(place.gsx$lat['$t'], place.gsx$lon['$t'])-->
        <l-feature-group ref="group">
          <l-marker
            v-for="(place, index) in pointsOnRoute"
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
        v-if="windowInnerWidth < 768"
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

      <div class="hooper-wrapper">
        <hooper
          ref="carousel"
          :progress="false"
          :itemsToShow="itemsToShow()"
          :vertical="false"
          :trimWhitespace="true"
          :centerMode="true"
          :pagination="true"
          :shortDrag="false"
          :draggable="false"
          :wheelControl="false"
          :transition="300"
          @slide="updateCarousel"
        >
          <slide v-for="(route, index) in routesInCat" :key="index">
            <div
              class="hooper-slide-inner"
              :style="{ backgroundImage: 'url(https://ziemiasadecka.appen.pl/photo/' + route.gsx$img['$t'] +  '.jpg)' }"
            >
              <div class="gradient">
                <h5>{{ route.gsx$name['$t'] }}</h5>
                <p>{{ route.gsx$popuptext['$t'] }}</p>
              </div>
            </div>
          </slide>
        </hooper>
      </div>

      <menu-modal :menu="isMenuOpen"></menu-modal>
    </v-window-item>
    <v-window-item class="place" style="height: calc(100% - 58px);">
      <v-app-bar light tabs flat color="white" fixed>
        <span class="back-button link" @click="backFromDescription">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </span>
      </v-app-bar>

      <v-row align="center" justify="center" class="main">
        <v-col md="5">
          <h6 class="category">{{ placeCatName }}</h6>
          <h1 class>{{ placeName }}</h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
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
      <v-row align="center" justify="center">
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
import { Hooper, Slide } from "hooper";

//import Vue2LeafletLocatecontrol from '../components/Vue2LeafletLocatecontrol'

export default {
  components: {
    LMap,
    LTileLayer,
    LFeatureGroup,
    LMarker,
    LIcon,
    MenuModal,
    Hooper,
    Slide,
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

      routeCats: [],
      routes: [],
      routesInCatArr: [],

      placeCats: [],
      choosenCategory: "1",

      choosenRoute: 1,

      pointsOnRoute: [],

      bottomNav: "recent",
      zoom: 10,
      zoomSnap: 0.5,
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

      featureLayerGPX: [],
      gpx: "https://ziemiasadecka/gpx/2.gpx",

      fab: false,
      hidden: false,
      tabs: null,
      color: "",

      //carousel
      hooperCurrentSlide: 0,
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

    itemsToShow() {
      if (this.windowInnerWidth > 1600) return 4;
      if (this.windowInnerWidth > 1200) return 3;
      if (this.windowInnerWidth > 1000) return 2.5;
      if (this.windowInnerWidth > 800) return 2;
      if (this.windowInnerWidth >= 768) return 1.5;
      if (this.windowInnerWidth < 768) return 1.1;
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
      this.window = 1;
      this.windowTouchless = false;
      window.scrollTo({ top: 1 });
    },

    backFromDescription() {
      this.window = 0;
      this.windowTouchless = true;
      window.scrollTo({ top: 1 });
    },

    fitBounds() {
      //let featureGroup = this.$refs["group"];
      //this.map.fitBounds(featureGroup.getBounds());
      console.log(this.$refs);
    },

    changeCat(cat) {
      this.hooperCurrentSlide = 0;
      this.$refs.carousel.slideTo(this.hooperCurrentSlide);
      console.log("co to : ", cat);

      let catInt = Number(cat);
      //catInt -= 2;
      console.log(catInt);
      let catString = catInt.toString();
      this.choosenCategory = catString;
      console.log(catString);

      this.fitBounds();

      this.hooperCurrentSlide = 0;
      let index = 0;
      this.addGPX(index);
      this.pointsOnRouteUpdate();
    },

    catsSliderColor() {
      let cat = Number(this.choosenCategory) - 1;
      if (cat === 4) return "natura";
      if (cat === 2) return "natura";
      if (cat === 3) return "konie";
      if (cat === 1) return "kultura";

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

    onLocationFound(position) {
      console.log(position);

      L.marker([position.coords.latitude, position.coords.longitude])
        .addTo(this.map)
        .bindPopup("You are within meters from this point")
        .openPopup();
      this.flyTo(position.coords.latitude, position.coords.longitude);
      this.locationLat = position.coords.latitude;
      this.locationLon = position.coords.longitude;

      L.circle(e.latlng, radius).addTo(map);
    },

    onLocationError(e) {
      alert(e.message);
    },

    addGPX(index) {
      let that = this;

      /*
    if(typeof this.routes[this.choosenRoute] === undefined) {

      let pointsFromRoute = this.routes[this.choosenRoute].gsx$places['$t'];
      let arrayOfPointsFromRoute = pointsFromRoute.split(',');
      console.log(arrayOfPointsFromRoute);
      console.log(this.choosenRoute);
      } else {
        console.log('czegoś tu nie ma');
      }*/

      this.featureLayerGPX.length !== 0 && this.featureLayerGPX.clearLayers();

      this.choosenRoute = this.routesInCat[index].gsx$id["$t"];

      // Dodawanie granicy
      let routeStyle = L.geoJson(null, {
        // http://leafletjs.com/reference.html#geojson-style
        style: function(feature) {
          return {
            color: that.routesInCat[index].gsx$color["$t"],
            weight: that.routesInCat[index].gsx$weight["$t"],
            dashArray: "" + that.routesInCat[index].gsx$dash["$t"] + "",
            opacity: Number(that.routesInCat[index].gsx$opacity["$t"])
          };
        }
      });

      this.featureLayerGPX = new L.FeatureGroup();
      this.map.addLayer(this.featureLayerGPX);

      var polygonLayer = omnivore
        .gpx("/gpx/" + this.choosenRoute + ".gpx", null, routeStyle)
        .on("ready", function() {
          that.map.fitBounds(that.featureLayerGPX.getBounds().pad(1));
        });
      this.featureLayerGPX.addLayer(polygonLayer);
    },

    deleteGPX() {
      this.featureLayerGPX.clearLayers();
    },

    updateCarousel(payload) {
      this.hooperCurrentSlide = payload.currentSlide;

      this.pointsOnRouteUpdate();

      let index = payload.currentSlide;
      console.log("updateCarousel, index: ", index);
      console.log(this.routesInCat);

      let that = this;
      if (this.routesInCat.length !== 0) {
        console.log("za kolejnym razem");
        console.log("from if: ", index);
        this.addGPX(index);
      } else {
        console.log("za pierwszym razem");
        setTimeout(function() {
          that.addGPX(0);
          that.pointsOnRouteUpdate();
        }, 1000);
      }
    },

    pointsOnRouteUpdate() {
      this.pointsOnRoute = [];

      let that = this;

      console.log("to są szlaki w kategorii: ", this.routesInCat);

      if (typeof this.routesInCat[this.hooperCurrentSlide] !== "undefined") {
        let pointsFromRoute = this.routesInCat[this.hooperCurrentSlide]
          .gsx$places["$t"];
        var arrayOfPointsFromRoute = pointsFromRoute.split(",");
        console.log("rozdzielona tablica: ", arrayOfPointsFromRoute);

        //return arrayOfPointsFromRoute.forEach(function(point) {

        this.places.filter(function(place) {
          arrayOfPointsFromRoute.filter(function(point) {
            if (place.gsx$id["$t"] === point) {
              console.log("success", place.gsx$name["$t"]);
              that.pointsOnRoute.push(place);
            }
          });

          //console.log(place)
        });
      }
    }
  },
  created() {
    // Pobieranie ustawien

    console.log("created");

    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    /*
    new L.GPX(this.gpx, {async: true}).on('loaded', function(e) {
        console.log("hello GPX")
    this.map.fitBounds(e.target.getBounds());
    }).addTo(this.map);
    */
    let googleSheetID = "1lQXmRmMmf4Rn7WOgyte2ja5q7HTT6Ya99JMnucv7grA";
    //let googleSheetID = '1SdTtRIyXZkH50iC4JA9ODVozh7F6ZWS6g1jUT7ToqCo';
    // nowy sącz 1lQXmRmMmf4Rn7WOgyte2ja5q7HTT6Ya99JMnucv7grA
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
    let urlRouteCats =
      "https://spreadsheets.google.com/feeds/list/" +
      googleSheetID +
      "/3/public/values?alt=json";
    let urlRoutes =
      "https://spreadsheets.google.com/feeds/list/" +
      googleSheetID +
      "/2/public/values?alt=json";
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

    fetch(urlRoutes).then(response => {
      return response
        .json()
        .then(json => {
          this.routes = json.feed.entry;
        })
        .then(() => {
          console.log(this.routes);
        });
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

    fetch(urlRouteCats).then(response => {
      return response
        .json()
        .then(json => {
          this.routeCats = json.feed.entry;
        })
        .then(() => {
          console.log(this.routeCats);
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

    routesInCat: function() {
      let that = this;
      return this.routes.filter(function(route) {
        return route.gsx$category["$t"] === that.choosenCategory;
        //console.log(place)
      });
    },

    category: function() {
      let that = this;
      return this.places.filter(function(place) {
        if (place.gsx$category["$t"] === that.choosenCategory) {
          return place;
        }
        //console.log(place)
      });
    },

    pointsOnRouteComputed: function() {
      //return this.routes[this.choosenRoute].gsx$places['$t'];
      let that = this;

      console.log("to są szlaki w kategorii: ", this.routesInCat);

      if (typeof this.routesInCat[this.hooperCurrentSlide] !== "undefined") {
        let pointsFromRoute = this.routesInCat[this.hooperCurrentSlide]
          .gsx$places["$t"];
        var arrayOfPointsFromRoute = pointsFromRoute.split(",");
        console.log("rozdzielona tablica: ", arrayOfPointsFromRoute);

        //return arrayOfPointsFromRoute.forEach(function(point) {

        /*
            this.places.filter(function(place) {
            arrayOfPointsFromRoute.filter(function(point) {
              if(place.gsx$id['$t'] === point) {
                console.log('success', place.gsx$name['$t']);
                that.pointsOnRouteComputed.push(place);
              };
            });
              
              //console.log(place)
            });
            */

        /*
           return this.places.filter(function(place) {
            arrayOfPointsFromRoute.filter(function(point) {
              if(place.gsx$id['$t'] === point) {
                console.log('success', place.gsx$name['$t']);
                return place;
              };
            });
              

            });*/
      }

      /*
          for(let p of arrayOfPointsFromRoute){
             this.places.filter(function(place) {
                //console.log(arrayOfPointsFromRoute);
          
            console.log(p);

            return place.gsx$id['$t'] === p;
            });
          }
          */

      //console.log(place)

      /*let points = this.routes[1].gsx$places['$t'];
      let arrayOfPoints = points.split(',');     
      let that = this;
      return this.places.filter(function(place) {
         for(point of arrayOfPoints)
          return place.gsx$id['$t'] === point;
          //console.log(place)
      });*/
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
    console.info("App this router:", this.$router);
    console.info("App currentRoute:", this.$router.currentRoute);
    console.log("mounted");

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

