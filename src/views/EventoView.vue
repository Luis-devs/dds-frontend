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
                    v-model="paquete.ficha.ficha"
                    :rules="camposRules"
                    >
                    
                    </v-select
                  ></v-row>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                  class="ml-2"
                  v-model="paquete.programa.nombre"
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
                    v-model="paquete.ambiente.id"
                    append-icon="book"
                    :rules="camposRules"
                  >
                  <template v-slot:item="{ item }">
                    {{ item.bloque.nomenclatura }}-{{ item.codigo }}
                  </template>

                   <template slot="selection" slot-scope="data">
                    {{data.item.bloque.nomenclatura}} - {{data.item.codigo}}
                  </template>
                
                </v-select>
                </v-col>
                <v-col cols="2">
                  <v-select 
                  v-model="paquete.dia"
                  item-text="dia" 
                  item-value="dia" 
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

                <v-col cols="3">
                  <semanas
                  :dia="diase"
                  :mes="fechactual.mesNum"
                  :year="fechactual.year"
                  @dias="diast"
                  ></semanas>
                </v-col>

                <v-col cols="3">
                  <v-select 
                  v-model="paquete.competencia.competencia"
                  item-text="nombre" 
                  item-value="nombre" 
                  :items="competencias"
                  @change="cargaresultados()"
                  label="Competencias">
                  <template v-slot:item="slotProps">
                    {{slotProps.item.nombre}}
                  </template>
                  </v-select>
                </v-col>
                <v-col cols="3">
                  <v-select 
                  v-model="paquete.resultado.resultado"
                  item-text="descripcion" 
                  item-value="descripcion" 
                  :items="resultados"
                  @change="actualizaorden()"
                  label="Resultado aprendizaje">
                  <template v-slot:item="slotProps">
                    {{slotProps.item.descripcion}}
                  </template>
                  </v-select>
                </v-col>
                  <v-col cols="1">
                    <v-text-field
                     v-model="paquete.horas"
                    label="Horas"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
             
            </v-container>
            <v-btn class="ma-2" outlined color="indigo" @click="guardar()">
              Crear Evento
            </v-btn>
          </v-form>
        </v-card-text>
        </v-card>
    </v-row>
   

    <v-row class="mt-5" justify="space-around">
      
        <v-app-bar flat color="rgb(52,188,52)">
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

          <v-toolbar-title class="text-h6 white--text pl-0">
            Eventos Registrados
          </v-toolbar-title>

        
         </v-app-bar>
        
      </v-row>

      <v-row class="mb-5 mt-5" v-for="data in evento.eventos" :key="data.ficha" >
        <v-card width="100%">
         <v-card-text>
          <v-form>
            <v-container>
            
              <v-row>
                <v-col cols="2">
                  <v-text-field
                  :value="data.ficha.codigo"
                  label="Ficha"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                  :value="data.programa.nombre"
                  label="Programa"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                  :value="data.nivel"
                  label="Nivel"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                  :value="data.municipio"
                  label="Municipio"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                  :value="data.ambiente.ambiente"
                  label="Ambiente"
                  readonly
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1">
                  <v-text-field
                  :value="data.dia"
                  label="Dia"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                  :value="data.horario"
                  label="Horario"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                  :value="data.diastrabajados"
                  label="Laborados"
                  readonly
                ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-textarea
                  :value="paquete.competencia.competencia"
                background-color="amber lighten-4"
                label="Competencia"
              ></v-textarea>

                </v-col>
                <v-col cols="3">
                  <v-textarea
                  :value="paquete.resultado.resultado"
                background-color="amber lighten-4"
                color="orange orange-darken-4"
                label="Resultado Aprendizaje"
              ></v-textarea>

                </v-col>
                
              </v-row>
            
            </v-container>
          </v-form>
         </v-card-text>     
        </v-card>
       </v-row>   

       <v-row>
        <v-col>
          <v-btn block v-if="evento.eventos.length > 0" class="ma-2" outlined color="indigo" @click="enviareventos()">
            GUARDAR EVENTOS
          </v-btn>
        </v-col>
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

      evento : {
        mes : null,
        year : null,
        instructor : null,
        eventos : []
      },

      paquete: {
        ficha: {
           ficha : null,
           codigo : null,
        }, 
        programa : {
           nombre : null,
           id : null
        },
        nivel : null,
        municipio : null,
        ambiente : {
            id : null,
            ambiente : null,
        },
        dia : null,
        horario : null,
          
        horas : null,
      //  diainicial : null,
      //  diafinal : null,
     //   diacompleto : null,
        diastrabajados : null,
        competencia : {
          competencia : null,
          codigo : null,
        },
        resultado : {
           resultado : null,
           orden : null,
        } 
      },
      centros: null, //Aquí se cargan todos los centros que están en la bd

      fechactual : null,
      instructor : null,
      fichas: [],
      ambientes : [],
      competencias : [],
      resultados : [],
      dia : null,
      paqdiasmes : null,
      diase : null,
      diasemana : [
        {
         dia : "Lunes",
         ndia : 1
        },
        {
         dia : "Martes",
         ndia : 2
        },
        {
         dia : "Miercoles",
         ndia : 3
        },
        {
         dia : "Jueves",
         ndia : 4
        },
        {
         dia : "Viernes",
         ndia : 5
       },
       {
         dia : "Sabado",
         ndia : 6
      },

    ],
      departamentos: colombia,
      camposRules: [(v) => !!v || "Campo es requerido"],
    };
  },

  methods: {
   async enviareventos()
    {
      await axios
        .post(`${this.api}/evento/crear`, this.evento)
        .then(function (response) {
          console.log(response);
          })
        .catch(function (error) {
          console.log(error);
         });

      
    },
    actualizaorden()
    {
      let r = this.resultados.filter(e => e.descripcion == this.paquete.resultado.resultado)
      this.paquete.resultado.orden = r[0].orden
    },
    cargaresultados()
    {
      let r = this.competencias.filter(e => e.nombre == this.paquete.competencia.competencia)
      this.paquete.competencia.codigo = r[0].codigo
      this.resultados = r[0].resultados
    
    },
    diast(dias){
      this.paqdiasmes = dias
     // this.paquete.diainicial = this.paqdiasmes.diaIni
    //  this.paquete.diafinal = this.paqdiasmes.diaFin
      this.paquete.diastrabajados = this.paqdiasmes.diastrabajados
    //  this.paquete.diacompleto = `${this.paqdiasmes.diaIni}-${this.paqdiasmes.diaFin}` 
     // let posini = this.paqdiasmes.diastrabajados.indexOf(this.paqdiasmes.diaIni)
     // let posfin = this.paqdiasmes.diastrabajados.indexOf(this.paqdiasmes.diaFin)
     // this.paquete.horas = ((posfin - posini) + 1) * 8
     this.paquete.horas = this.paquete.diastrabajados.length * 8
    },
    horario(){
      const res = this.fichas.filter(e => e._id === this.paquete.ficha.ficha)
      const j =  res[0].jornadas.filter(e => e.dia == this.paquete.dia);
          //const j =  res[0].jornadas[this.paquete.dia -1];
         
     this.paquete.horario = `${j[0].horaInicio}-${j[0].horaFin}`
     let r = this.diasemana.filter(e => e.dia == this.paquete.dia)
     this.diase = r[0].ndia
    },
    async cargadatos(){
     const res = this.fichas.filter(e => e._id === this.paquete.ficha.ficha)
     this.paquete.ficha.codigo = res[0].codigo
     this.paquete.programa.nombre = res[0].programa.nombre
     this.paquete.programa.id = res[0].programa._id
     this.paquete.nivel =res[0].programa.nivel
     this.paquete.municipio = res[0].sede.municipio
     this.paquete.ambiente.id = res[0].ambiente._id

     let amb = this.ambientes.filter(e => e._id == this.paquete.ambiente.id)
       this.paquete.ambiente.ambiente = amb[0].bloque.nomenclatura + '-' + amb[0].codigo

    const competencias = await axios.get(`${this.api}/competencia/programa/${res[0].programa._id}`);
     console.log(competencias.data)
    this.competencias = competencias.data[0].competencias
   
    },
    async guardar() {
      const p = JSON.parse(JSON.stringify(this.paquete))
      if (this.evento.eventos.length == 0)
       this.evento.eventos.push(p)
      else
       {
        let r = this.evento.eventos.filter(e => (e.dia == p.dia)
         && (e.ambiente.ambiente == p.ambiente.ambiente) 
         && (e.horario == p.horario)
         && ((p.diainicial >= e.diainicial) && (p.diainicial <= e.diafinal) )
         )
        if (r.length > 0)
         alert('igual')
       
       else
        this.evento.eventos.push(p)
       }
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
    this.evento.mes = this.fechactual.mesNum
    this.evento.year = this.fechactual.year
    this.evento.instructor = instructor

    const inst = await axios.get(`${this.api}/instructor/${instructor}`);
    this.instructor = inst.data
    const ambientesResponse = await axios.get(`${this.api}/ambiente/sede/${this.instructor.sede}`);
    this.ambientes = ambientesResponse.data;
    console.log(this.ambientes)

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
