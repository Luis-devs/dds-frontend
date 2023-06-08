<template>
    <v-container>
      <v-row justify="space-around">
        <v-card width="600">
  
          <v-app-bar flat color="rgba(156, 216, 175, 256)" >
            
  
            <v-toolbar-title class=" text-h6 white--text pl-0">
              CREAR INSTRUCTOR
            </v-toolbar-title>
  
            <v-spacer></v-spacer>
  
            
          </v-app-bar>
  
  
          <v-card-text class="carta">
  
            <v-form
            ref="form">
              <v-container>
                <v-row>
                  <v-col cols="8">
  
                    <v-row>
                      <v-col cols="8">
                        <v-text-field type="number" label="Documento identificación" prepend-icon="mdi-key"
                          v-model="paquete.documento"
                          :rules="camposRules"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                   </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Nombre" prepend-icon="mdi-key"
                    v-model="paquete.nombre"
                    :rules="camposRules"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Apellido" prepend-icon="mdi-key"
                    v-model="paquete.apellido"
                    :rules="camposRules"></v-text-field>
                </v-col>

                 
                </v-row>
                
                  <v-row>

                    <v-col cols="6">
                      <v-text-field label="Correo" prepend-icon="mdi-key"
                      v-model="paquete.correo"
                      :rules="camposRules"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field type="number" label="Celular" prepend-icon="mdi-key"
                        v-model="paquete.celular"
                       :rules="camposRules"></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
    <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    color="green"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

     <v-card-title>DATOS DEL CONTRATO</v-card-title>

    <v-divider></v-divider>
       <v-card-text>
        <v-text-field  label="No. del contrato" prepend-icon="mdi-key"
        v-model="paquete.contrato.numero"
       :rules="camposRules"></v-text-field>
       <v-menu
        ref="fechainicio"
        v-model="fini"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="paquete.contrato.fechaInicio"
            label="Fecha de Inicio"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="paquete.contrato.fechaInicio"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
         
          <v-btn
            text
            color="primary"
            @click="fini=false"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
      ref="menu2"
      v-model="ffin"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="paquete.contrato.fechaTerminacion"
          label="Fecha de Finalización"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="paquete.contrato.fechaTerminacion"
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        
        <v-btn
          text
          color="primary"
          @click="ffin=false"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>

    <v-select
        :items="tipovinculacion"
        item-text="nombre"
        item-value="nombre"
        label="Seleccione tipo de vinculación"
        v-model="paquete.contrato.tipoVinculacion"
        prepend-icon="map"
    ></v-select>
       </v-card-text>
   
  </v-card>
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
      <mensaje
      :mensaje="mensaje"
      :color="color"
      :show="show">

      </mensaje>
      <pre>
        {{ $data }}
      </pre>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
 import mensaje from '../../components/MensajesView.vue'
  export default {
    props: {
      datos: Object,
      mostrar: Boolean,
    },
    components:{
      mensaje
    },
    
    data() {
      return {
        fini : false,
        ffin : false,
        tipovinculacion : [],
        paquete: {
          documento: null,
          nombre: null,
          apellido : null,
          correo: null,
          celular: null,
          contrato : {
              numero : null,
              fechaInicio : null,
              fechaTerminacion : null,
              tipoVinculacion : null
          }
          
        },
        mensaje : '',
        color : '',
        show : false,
        niveles : ['Tecnico', 'Tecnologo', 'Operario','Auxiliar','Especializacion'],
        camposRules: [
          v => !!v || 'Campo es requerido'
        ]
      }
    },
  
    methods: {
      async guardar() {
        if (this.$refs.form.validate())
        {
            await axios.post('http://159.223.110.82:3000/programas/crear',this.paquete)
         .then(function (response) {
           console.log(response);
       })
      .catch(function (error) {
        this.mensaje = `Se ha producido un error : ${error}`
            this.color = 'red'
            this.show = true
         })
     .finally(function () {
            this.mensaje = 'Programa Guardado con exito'
            this.color = '#aaddff'
            this.show = true
      });
           
         }
      }
      },

    async mounted() {
      let url=`${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
      const tipos = await axios.get(`${url}/tipo-de-vinculacion`);
      console.log(tipos.data)
      this.tipovinculacion = tipos.data;
    },

  }
  
    

  
  
  
  </script>
    
  