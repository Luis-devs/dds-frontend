<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="900">
        <v-app-bar flat color="rgb(52,188,52)">
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

          <v-toolbar-title class="text-h6 white--text pl-0">
            Eventos
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
                <v-col cols="6">
                  <spam>Mes: <spam>{{fechactual.mesNum}}</spam> {{fechactual.mes}}</spam>
                </v-col>
                <v-col cols="6">
                  <spam>Año: <spam>{{fechactual.year}}</spam></spam>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span
                    >Instructor: <input type="text" readonly class="instructor"
                  /></span>
                </v-col>
                <v-col>
                  <v-select label="Seleccione el programa"></v-select>
                </v-col>
              </v-row>
              <v-row align="end">
                <v-col cols="2">
                  <v-row no-gutters align="center"
                    >
                    <v-select class="pt-0 mt-0"
                    label="Ficha"></v-select
                  ></v-row>
                </v-col>
                <v-col cols="2">
                  <v-select 
                  v-model="dia"
                  item-text="dia" 
                  item-value="ndia" 
                  :items="diasemana"
                  label="Día">

                  </v-select>
                </v-col>
                <v-col cols="2">
                  <semanas
                  :dia="dia"
                  :mes="fechactual.mesNum"
                  :year="fechactual.year"
                  ></semanas>
                
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
              </v-row>
              <v-row> </v-row>
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
  </v-container>
</template>
<script>
import axios from "axios";
import semanas from "../components/semanas.vue"
const colombia = require("../json/ciudades");
export default {
  components:{
       semanas
        },

  
  props: {
    datos: Object,
    mostrar: Boolean,
  },
  data() {
    return {
      centros: null, //Aquí se cargan todos los centros que están en la bd
      fechactual : null,
      dia : null,
      paquete: {
        ficha: null,
      },
      diasemana : [
        {
         dia : "lunes",
         ndia : 1
      },
      {
         dia : "martes",
         ndia : 2
      },
      {
         dia : "miercoles",
         ndia : 3
      },
      {
         dia : "jueves",
         ndia : 4
      },
      {
         dia : "viernes",
         ndia : 5
      },
      {
         dia : "sabado",
         ndia : 6
      },

    ],
      departamentos: colombia,
      camposRules: [(v) => !!v || "Campo es requerido"],
    };
  },

  methods: {
    async guardar() {
      await axios
        .post("http://10.187.145.190:3000/sedes/crear", this.paquete)
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

  computed: {
    ciuda() {
      var ciudades = null;
      for (var pos in this.departamentos) {
        if (this.departamentos[pos].departamento == this.paquete.departamento) {
          ciudades = this.departamentos[pos].ciudades;
        }
      }
      return ciudades;
    },
  },
  async mounted() {
    const api = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
    const pro = await axios.get(`${api}/programas/64b301e917de7c28dd09dbbe`);
    console.log(pro.data)
    const fecha = await axios.get(`${api}/date/`);
    this.fechactual = fecha.data;
    console.log(this.fechactual)
 
   
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
.fondo {
  background: linear-gradient(
    90deg,
    rgba(138, 74, 22, 0.7820378151260504) 15%,
    rgba(6, 92, 23, 1) 49%,
    rgba(226, 175, 56, 1) 82%
  );
}

.numero {
  border: 2px solid rgb(136, 136, 136);
  padding: 2px 20px;
}

.instructor {
  border-bottom: 2px solid rgb(136, 136, 136);
}
</style>
