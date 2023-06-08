<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">

        <v-app-bar flat color="rgba(0, 0, 0, 0)" class="fondo">
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

          <v-toolbar-title class=" text-h6 white--text pl-0">
            CREAR SEDE
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn color="white" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-text>

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="7">

                  <v-row>
                    <v-col cols="6">
                      <v-text-field label="Nombre de la sede" v-model="paquete.nombre"> </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-select label="Centro" prepend-icon="map" :items="centros" item-text="nombre" v-model="paquete.centro"
                        item-value="_id"></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="5">
                  <img width="100%" height="100%"
                    src="https://www.sena.edu.co/es-co/Noticias/NoticiasImg/BP-sede_Gomez_Plata_19082021.jpeg">

                </v-col>
                <v-text-field label="Lugar de funcionamiento" v-model="paquete.lugar_funcionamiento">


                </v-text-field>
                <v-row>
                  <v-col cols="6">
                    <v-select :items="departamentos" item-text="departamento" item-value="departamento"
                      label="Selecciones departamento" prepend-icon="map" v-model="paquete.departamento"></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select :items="ciuda" label="Selecciones una ciudad" v-model="paquete.municipio" color="black"
                      item-color="black" prepend-icon="map"></v-select>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ma-2" outlined color="indigo" @click="guardar()">
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
const colombia = require("../json/ciudades")
export default {
  props: {
    datos: Object,
    mostrar: Boolean,
  },
  data() {
    return {
      centros: null,//Aquí se cargan todos los centros que están en la bd
      paquete: {
        nombre: null,
        centro: null,
        lugar_funcionamiento: null,
        departamento: null,
        municipio: null
      },
      departamentos: colombia,
    }
  },

  methods: {
    async guardar() {
      await axios.post('http://10.187.145.190:3000/sedes/crear', this.paquete)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  },

  computed: {

    ciuda() {
      var ciudades = null
      for (var pos in this.departamentos) {
        if (this.departamentos[pos].departamento == this.paquete.departamento) {
          ciudades = this.departamentos[pos].ciudades;
        }
      }
      return ciudades
    }

  },
async mounted(){
  const response= await axios.get('http://10.187.145.190:3000/centro/');

  this.centros=response.data;
       
}
}
</script>
<style>
.fondo {
  background: linear-gradient(90deg, rgba(138, 74, 22, 0.7820378151260504) 15%, rgba(6, 92, 23, 1) 49%, rgba(226, 175, 56, 1) 82%);
}
</style>