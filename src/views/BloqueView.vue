<template>
    <v-container>
      <v-row justify="space-around">
        <v-card width="600">
  
          <v-app-bar flat color="rgba(156, 216, 175, 256)" >
            
  
            <v-toolbar-title class=" text-h6 white--text pl-0">
              CREAR AMBIENTE
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
                        <v-text-field label="Nombre" prepend-icon="mdi-key"
                          v-model="paquete.nombre"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Nomenclatura" prepend-icon="mdi-key"
                        v-model="paquete.nomenclatura"></v-text-field>
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
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      datos: Object,
      mostrar: Boolean,
    },
    data() {
      return {
       
        paquete: {
          nombre: null,
          nomenclatura: null
          
        },
        
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
  
      ambient() {
        var tipoAmb = null
        for (let pos in this.typeAmbiente) {
          if (this.typeAmbiente[pos] == this.paquete.tipo) {
            tipoAmb = this.typeAmbiente[pos].tipoAmb;
          }
        }
        return tipoAmb
      }
  
    },
  
  
  }
  </script>
    
  <style>
  
  
  
  </style>