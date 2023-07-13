<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">
        <v-app-bar flat color="rgb(52,188,52)">
          <v-toolbar-title class="text-h6 white--text pl-0">
            CREAR CENTRO
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text class="carta">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Codigo del centro"
                    prepend-icon="mdi-key"
                    v-model="paquete.codigo"
                    :rules="camposRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Nombre"
                    prepend-icon="mdi-key"
                    v-model="paquete.nombre"
                    :rules="camposRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="departamentos"
                    item-text="departamento"
                    item-value="departamento"
                    label="Seleccione departamento"
                    v-model="paquete.departamento"
                    :rules="camposRules"
                    prepend-icon="map"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="ciuda"
                    label="Seleccione una ciudad"
                    v-model="paquete.municipio"
                    :rules="camposRules"
                    color="black"
                    item-color="black"
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
                    label="Seleccione regional"
                    prepend-icon="map"
                    v-model="paquete.regional"
                    :rules="camposRules"
                  ></v-select>
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
      
          

        </pre
    >
    <!-- <pre>
               {{ $data }}
            </pre> -->
  </v-container>
</template>

<script>
import axios from "axios";
const colombia = require("../json/ciudades");
export default {
  props: {
    datos: Object,
    mostrar: Boolean,
  },
  data() {
    return {
      paquete: {
        codigo: null,
        nombre: null,
        regional: null,
        departamento: null,
        municipio: null,
      },
      regionales: null,
      departamentos: colombia,
      camposRules: [(v) => !!v || "Campo es requerido"],
    };
  },

  methods: {
    async guardar() {
      let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
      await axios
        .post(`${url}/centro/crear`, this.paquete)
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
    const api = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
    const response = await axios.get(`${api}/regional/`);
    this.regionales = response.data;
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
};
</script>

<style></style>
