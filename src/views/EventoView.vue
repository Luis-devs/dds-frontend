<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="100%">
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
                <v-col cols="4">
                  <spam>Mes: <spam>{{fechactual.mesNum}}</spam> {{fechactual.mes}}</spam>
                </v-col>
                <v-col cols="4">
                  <spam>Año: <spam>{{fechactual.year}}</spam></spam>
                </v-col>

                <v-col cols="4">
                  <span
                    >Instructor: <input type="text" readonly class="instructor"
                  /></span>
                </v-col>

              </v-row>
              
              <v-row align="end">
                <v-col cols="2">
                  <v-row no-gutters align="center"
                    >
                    <v-select class="pt-0 mt-0"
                    label="Ficha"
                    :items="fichas"
                    item-text="codigo"
                    item-value="_id"
                    @change="cargadatos()"
                    v-model="paquete.ficha"
                    :rules="camposRules"
                    >
                    
                    </v-select
                  ></v-row>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                  class="ml-2"
                  v-model="paquete.programa"
                  label="Programa"
                  readonly
                ></v-text-field>

                 </v-col>
                 <v-col cols="2">
                  <v-text-field
                  class="ml-2"
                  v-model="paquete.nivel"
                  label="Nivel"
                  readonly
                ></v-text-field>

                 </v-col>
                 <v-col cols="2">
                  <v-text-field
                  class="ml-2"
                  v-model="paquete.municipio"
                  label="Municipio"
                  readonly
                ></v-text-field>

                 </v-col>

                 <v-col cols="2">
                  <v-select
                    :items="ambientes"
                    item-text="codigo"
                    item-value="_id"
                    label="Ambiente"
                    v-model="paquete.ambiente"
                    append-icon="book"
                    :rules="camposRules"
                  >
                  <template v-slot:item="{ item }">
                    {{ item.bloque.nomenclatura }}-{{ item.codigo }}
                  </template>

                  <template slot="selection" slot-scope="data">
                    {{ data.item.bloque.nomenclatura }} - {{ data.item.codigo }}
                  </template>
                </v-select>
                </v-col>
                <v-col cols="2">
                  <v-select 
                  v-model="paquete.dia"
                  item-text="dia" 
                  item-value="ndia" 
                  :items="diasemana"
                  @change="horario()"
                  label="Día">
                  </v-select>
                </v-col>
                <v-col cols="1">
                  <v-text-field
                  class="ml-2"
                  v-model="paquete.horario"
                  label="Horario"
                  readonly
                ></v-text-field>

                 </v-col>

                <v-col cols="5">
                  <semanas
                  :dia="paquete.dia"
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
      api : `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
      centros: null, //Aquí se cargan todos los centros que están en la bd
      fechactual : null,
      instructor : null,
      fichas: [],
      ambientes : [],
      dia : null,
      paquete: {
        ficha: null,
        programa : null,
        nivel : null,
        municipio : null,
        ambiente : null,
        dia : null,
        horario : null
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
    horario(){
      const res = this.fichas.filter(e => e._id === this.paquete.ficha)
      const j =  res[0].jornadas[this.paquete.dia -1];
     this.paquete.horario = `${j.horaInicio} - ${j.horaFin}`
    },
    cargadatos(){
     const res = this.fichas.filter(e => e._id === this.paquete.ficha)
     console.log(res)
     this.paquete.programa = res[0].programa.nombre
     this.paquete.nivel =res[0].programa.nivel
     this.paquete.municipio = res[0].sede.municipio
    },
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
    let instructor = '64ba0c41420bca285a6e261a'
       
    
    const fecha = await axios.get(`${this.api}/date/`);
    this.fechactual = fecha.data;
    const inst = await axios.get(`${this.api}/instructor/${instructor}`);
    this.instructor = inst.data
    const ambientesResponse = await axios.get(`${this.api}/ambiente/sede/${this.instructor.sede}`);
    this.ambientes = ambientesResponse.data;


    for (let data of inst.data.programas)
     {
      const fichas  = await axios.get(`${this.api}/ficha/programas/${data}`);
      console.log(fichas)
      for (let x of fichas.data)
       {
          this.fichas.push(x)
       }
     } 
     
 
   
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
