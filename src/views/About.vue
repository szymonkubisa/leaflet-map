<template>
  <div class="about">

        
        <v-app-bar
          light
          tabs
          flat
          color="white"
          fixed
        >
        <img class="logo" v-if="windowInnerWidth >= 768"
          src="https://ziemiasadecka.appen.pl/img/logo_sadeckie.png"
        />
          <v-spacer></v-spacer>
          <toolbar v-if="windowInnerWidth >= 768" :active="this.$router.currentRoute.name" ></toolbar>
          <v-toolbar-title class="justify-center" v-if="windowInnerWidth < 768" >Wstęp</v-toolbar-title>
          <v-spacer></v-spacer>
        
          <!--<v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>-->
          <div class="menu-button">
            <v-btn icon @click="isMenuOpen = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>

        </v-app-bar>
      


          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">

											  <h1 class=" mt-4 mb-3">SĄDECKIE ZAPRASZA</h1>

												<p>Sądecczyzna od lat znana jest turystom. Każdego roku zimą i latem przyciąga gości przyjeżdżających tu na wypoczynek w jednym z hoteli, pensjonatów, kwater lub sanatoriów. Każde z tych miejsc oferuje wiele możliwości aktywnego spędzania czasu, relaksu i oddechu od codziennego zgiełku. Warto dokładnie poznać ten region.</p>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE0.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>  
            </v-col>
          </v-row>                                                  
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">                                               
												<h2>DZIEDZICTWO PRZYRODNICZE</h2>
												<p>Ziemia sądecka to kraina niewysokich gór poprzecinanych wstęgami dolin Dunajca, Popradu i Kamienicy. Niemal w całości objęta jest różnorodnymi formami ochrony przyrody. Do wsłuchania się w oddech natury zachęca kilkanaście tutejszych rezerwatów przyrody. Bukowe i świerkowe lasy poszerzają głębię oddechu i zapraszają na grzybobranie. Obecne tu rzadkie gatunki roślin i zwierząt przypominają niegdysiejsze bogactwo polskich puszcz. Jezioro Rożnowskie kusi wędkarzy i miłośników ptaków, których zachwyca obserwacja rezerwatu lęgowego na Wyspie Grodzisko. Rzeczna dolina Dunajca to również kraina sadów i fasoli Jaś, z której miejscowi potrafią wyczarować najwspanialsze potrawy.</p>
            </v-col>
          </v-row>					
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">

                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE1.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>  
            </v-col>
          </v-row>   
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">
										    <h2>DZIEDZICTWO KULTURY</h2>
											  <p>Sądecczyzna przez wieki stanowiła południową bramę do Małopolski i Polski. Do dziś można podziwiać pozostałości dawnych twierdz granicznych, wspaniałe dwory i klasztory z niezwykłym wystrojem wnętrz. Tu wychowywali się przyszli królowie, wzrastali niezłomni duchem rycerze, a legendarni woje budowali swe siedziby, a Zawisza Czarny ze swojego zamku w Rożnowie na nabożeństwo zajeżdżał do niemal tysiącletniego kościoła w Tropiu.</p>
            </v-col>
          </v-row>											  
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE2.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>  
            </v-col>
          </v-row>               
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">
												<h2>MAŁOPOLSKI SZLAK ARCHITEKTURY DREWNIANEJ</h2>
											  <p>Nigdzie poza Karpatami nie ma tylu wspaniałych drewnianych cerkiewek, świadczących o niezwykłych losach tych ziem. Idąc ich szlakiem przemierzamy Sądecczyznę. Koniecznie przy tym trzeba zajrzeć do najstarszej drewnianej cerki karpackiej w położonym między Krynicą a Muszyną Powroźniku. Od kilku lat ma ona swe poczesne miejsce na liście światowego dziedzictwa UNESCO, ciesząc swym pięknem turystów z całego świata. Jej drewniane cerkiewne siostry są rozsiane po całej ziemi sądeckiej. Każda kusi niepowtarzalnym urokiem, budzi zachwyt wędrowca i przypomina dawne czasy.</p>
            </v-col>
          </v-row>												
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE3.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img> 
            </v-col>
          </v-row>                        
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">												
									      <h2>NA RYBY</h2>
												<p>Wędkarze kochają Dunajec z jego górskimi przełomami i nieprzewidywalnością. Urządzone na tej rzece łowisko jest jednym z najatrakcyjniejszych w polskich Karpatach. Tu warto wybrać się na pstrąga, lipienia czy głowacicę. Amatorzy spokojniejszych wód wybierają Jezioro Rożnowskie, jeden z najstarszych sztucznych zbiorników wodnych w Polsce. Tu króluje sandacz, trafiają się metrowe szczupaki, bolenie, sumy, dorodne węgorze, karpie i liny. Wśród wędkarzy szczególne emocje wzbudza zimowe łowienie pod lodem.</p>
	            </v-col>
          </v-row>											
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE4.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>    
            </v-col>
          </v-row>  
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">
												<h2>MIEJSCA WIDOKOWE</h2>
												<p>Doskonałymi widokami od lat kuszą górskie szlaki, na których z polan rozciągają się wspaniałe panoramy Beskidu Sądeckiego, Niskiego Wyspowego i Gorców, za którymi rozciąga się majestat Tatr. Bardziej leniwi mogą na miejsca widokowe podjechać samochodem, pociągiem lub wagonikami kolejki gondolowej. Jeśli dopisze szczęście, da się nawet obserwować majaczące na wschodzie zarysy bieszczadzkich połonin. Niezwykłe sądeckie widoki to jednak nie tylko góry. Przełom Popradu w Rytrze wprost zapiera dech w piersiach, zaskakuje dzikość tej rzeki w okolicach Muszyny, a droga z Grybowa do Krynicy z całą stanowczością ukazuje, że jazda w samochodem w górach może być sporym przeżyciem. Oglądanie panoram ułatwiają wieże widokowe. Niezwykły ślimak w Woli Kroguleckiej zachwyca również konstrukcją, a spacer w koronach drzew w krynickich Słotwinach pozostaje długo w pamięci.</p>
            </v-col>
          </v-row>

          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">                                      											
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE5.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>  
            </v-col>
          </v-row>                            
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">                        
												<h2>WĘDRÓWKI PIESZE</h2>
												<p>Sądeckie góry są otwarte na piechurów. Dobrze oznakowane szlaki prowadzą przez ciekawe przyrodniczo miejsca, pozwalają podziwiać widoki i odpoczywać w górskich schroniskach. Najbardziej uczęszczany jest Czerwony Szlak Karpacki wiodący głównym grzbietem pasm Radziejowej i Jaworzyny Krynickiej. Jego liczne odnogi umożliwiają zejście do leżących niżej miejscowości i ciekawych miejsc. Powstała w ten sposób gęsta sieć pozwalana wielodniowe wędrówki przez Beskid Sądecki.</p>
            </v-col>
          </v-row>

          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE6.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>    
            </v-col>
          </v-row>    
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">												
                        
                        
                        <h2>WĘDRÓWKI ROWEROWE</h2>
												<p>Ziemia sądecka jest specjalnym miejscem dla rowerzystów. Można tu próbować swych sił w wędrówce górskiej, dolinami rzek, a nawet smakować wyjazdów zagranicznych. Wytrawni cykliści wyruszają na trasy głównymi pasmami beskidzkimi, a rodziny wolą brzegi Popradu i Dunajca. Szczególna atrakcją jest trasa rowerowa z Piwnicznej do Muszyny, która przez znaczną część wiedzie przez Słowację. Można z niej podziwiać panoramę Pasma Jaworzyny i dolinę jedynej rzeki, która ma swe źródła po południowej stronie Tatr, ale zamiast płynąć do Dunaju skręca na północ w stronę Polski.</p>
            </v-col>
          </v-row>                                                
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE7.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>        
            </v-col>
          </v-row>                                           
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">												
												<h2>NA KOŃ</h2>
												<p>Na wycieczki w siodle zapraszają ośrodki konne rozsiane po całej Sądecczyźnie. Wprawni jeźdźcy wybiorą całodniowe lub wielodniowe rajdy. Początkujący pokłusują na lonży lub pobliskich łąkach. Można też popróbować skoków przez niewielkie przeszkody. Wyjątkową ofertę ma Nowosądecki Ośrodek Jazdy Konnej i Hipoterapii BESKID przy Powiatowym Zakładzie Aktywności Zawodowej w Nawojowej. To jedyna taka placówka w regionie prowadzona przez instytucję publiczną. W dodatku stale rozwijana i wzbogacana, posiadająca m.in. dużą krytą ujeżdżalnię.</p>
            </v-col>
          </v-row>                        

          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">                        
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE8.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>   
            </v-col>                                             
          </v-row>
                                              
          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">                                                
												<h2>ŁODZIE I KAJAKI</h2>
												<p>Jezioro Rożnowskie zaprasza miłośników żeglowania. Spokojny akwen to również doskonałe miejsce dla kajakarzy, rowerów wodnych i uprawiania windsurfingu. Rodziny chętnie korzystają z wycieczek stateczkami spacerowymi. Nieco innych przeżyć dostarcza rzeka Poprad. Jej nurtem można z Piwnicznej do Rytra wybrać się spływem tratwami płaskodennymi, a w okolicach Muszyny oddać szaleństwu raftingu.</p>
            </v-col>
          </v-row>

          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">                     
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE9.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>
            </v-col>
          </v-row>
	          <v-row
            align="center"
            justify="center"
            class="main"
          >
            <v-col md="5">											
												<h2>NA LETNISKU</h2>
												<p>Czyste powietrze, doskonała kuchnia i gościnni gospodarze zapraszają do wiejskich kwater i gospodarstw agroturystycznych. Tu można nie tylko smakować wybornych potraw regionalnych, ale również samemu nauczyć się je przyrządzać, zobaczyć wypiek domowego chleba i posłuchać opowieści od bogatych dziejach Sądecczyzny. Gospodarze chętnie podzielą się wiedzą o bogatych w grzyby miejscach w lesie, zabiorą na przejażdżkę bryczką i pokażą miejsca związane z miejscowymi legendami. </p>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="8" lg="7">                                                
                        <v-img 
                          src="https://ziemiasadecka.appen.pl/photo/ZDJECIE10.jpg"
                          lazy-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F1185018-Diamond-Loading-Indicator-GIF&psig=AOvVaw3HhMZUaY57pM94b_7u1_U1&ust=1572091884458000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiB-Oywt-UCFQAAAAAdAAAAABAI"
                          class="grey lighten-2 my-4"
                        ></v-img>
            </v-col>
          </v-row>


    <menu-modal :menu="isMenuOpen"></menu-modal>


  </div>
</template>

<script>
import vuetify from '../plugins/vuetify';
import Toolbar from '../components/Toolbar'
import MenuModal from '../components/Menu'

export default {
  components: { Toolbar, MenuModal },
  data() {
    return {
      windowInnerWidth: '',
      windowInnerHeight: '',
      isMenuOpen: false
    }
  },

  watch: {
  },

  methods: {

      handleResize() {
      this.windowInnerWidth = window.innerWidth;
      this.windowInnerHeight = window.innerHeight;
    },

  },
  created() {

    window.addEventListener('resize', this.handleResize)
    this.handleResize();

  },

  computed: {

  },  

}
</script>