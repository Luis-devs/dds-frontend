<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">
        <v-app-bar flat color="rgb(52,188,52)">
          <v-toolbar-title class="text-h6 white--text pl-0">
            CREAR BLOQUE
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text class="carta">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Nombre"
                    prepend-icon="mdi-key"
                    v-model="paquete.nombre"
                    :rules="camposRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Nomenclatura"
                    prepend-icon="mdi-key"
                    v-model="paquete.nomenclatura"
                    :rules="camposRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                  :items="sedes"
                  label="Selecciones una sede"
                  item-text="nombre"
                  item-value="_id"
                  v-model="paquete.sede"
                  :rules="camposRules"
                  color="black"
                  item-color="black"
                  prepend-icon="map"
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    datos: Object,
    mostrar: Boolean,
  },
  data() {
    return {
      sedes : null,
      paquete: {
        nombre: null,
        nomenclatura: null,
        sede : null
      },
      camposRules: [(v) => !!v || "Campo es requerido"],
    };
  },

  methods: {
    async guardar() {
      let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
      await axios
        .post(`${url}/bloque/crear`, this.paquete)
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
    const response = await axios.get(`${api}/sedes/`);
    this.sedes = response.data
  },

  // computed: {
  //   ambient() {
  //     var tipoAmb = null;
  //     for (let pos in this.typeAmbiente) {
  //       if (this.typeAmbiente[pos] == this.paquete.tipo) {
  //         tipoAmb = this.typeAmbiente[pos].tipoAmb;
  //       }
  //     }
  //     return tipoAmb;
  //   },
  // },
};
</script>

<style></style>
