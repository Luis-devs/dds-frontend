<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">

        <v-app-bar flat color="rgba(156, 216, 175, 256)" >
          

          <v-toolbar-title class=" text-h6 white--text pl-0">
            CREAR CENTRO
          </v-toolbar-title>

          <v-spacer></v-spacer>

          
        </v-app-bar>


        <v-card-text class="carta">

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="7">

                  <v-row>
                    <v-col cols="6">
                      <v-text-field label="Codigo del centro" prepend-icon="mdi-key"
                        v-model="paquete.codigo"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nombre" prepend-icon="mdi-key" v-model="paquete.nombre"></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                       <v-col
                        cols="6">
                        <v-select
                             :items="departamentos"
                             item-text="departamento"
                             item-value="departamento"
                             label="Selecciones departamento"
                             v-model="departamento"
                              prepend-icon="map"
                       ></v-select>
                       </v-col>
                       <v-col
                        cols="6">
                        <v-select
                          :items="ciuda"
                          label="Selecciones una ciudad"
                          v-model="paquete.municipio"
                         color = "black"
                         item-color= "black"
                         prepend-icon="map"
                         ></v-select>
                       </v-col>
                    </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                             :items="regionales"
                             item-text="nombre"
                             item-value="_id"
                             label="Selecciones regional"
                              prepend-icon="map"
                              v-model="paquete.regional"
                       ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="5">
                  <img width="100%" height="100%"
                    src="https://www.sena.edu.co/es-co/sena/PublishingImages/regionales.jpg">

                </v-col>
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
    <pre>
      
           {{ $data }}
      
          

        </pre>
    <!-- <pre>
               {{ $data }}
            </pre> -->
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
     
      departamento:null,
      paquete: {
        codigo: null,
        nombre: null,
        regional: null,
        municipio: null
        
      },
      regionales: null,
      departamentos: colombia,
    }
  },

  methods: {
    async guardar() {
      await axios.post('http://10.187.145.190:3000/centro/crear', this.paquete)
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
    },
  },
  async mounted() {
    const response = await axios.get("http://10.187.145.190:3000/regional");
    this.regionales = response.data;
  },

  computed: {

    ciuda() {
      var ciudades = null
      for (var pos in this.departamentos) {
        if (this.departamentos[pos].departamento == this.departamento) {
          ciudades = this.departamentos[pos].ciudades;
        }
      }
      return ciudades
    }

  },


}
</script>
  
<style>



</style>