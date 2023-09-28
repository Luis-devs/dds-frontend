<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">
        <v-app-bar flat color="rgb(52,188,52)">
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

          <v-toolbar-title class="text-h6 white--text pl-0">
            CREAR REGIONAL
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
                  <v-text-field
                    label="Codigo de la regional"
                    prepend-icon="mdi-key"
                    v-model="paquete.codigo"
                    :rules="camposRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Nombre de la regional"
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
                    prepend-icon="map"
                    v-model="paquete.departamento"
                    :rules="camposRules"
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
    <v-row justify="space-around">
      <v-card width="800" class="mt-12">
        <v-data-table
          :items="listItems"
          :headers="cabeceraTabla"
          class="elevation-1 mx-12 my-6"
        ></v-data-table>
        <button
          type="button"
          class="btn btn-outline-info"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="editPeople(index)"
        >
          <i class="bi bi-pencil-square"></i> Editar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="deletePeople(index)"
        >
          <i class="bi bi-trash"></i> Eliminar
        </button>
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
        departamento: null,
        municipio: null,
        },
      cabeceraTabla: [
        { text: "Codigo", value: "codigo" },
        { text: "Nombre", value: "nombre" },
        { text: "Municipio", value: "municipio" },
        { text: "Departamento", value: "departamento" },
        { text: "Acciones", value: "editar" },
      ],
      // items de la tabla
      listItems: [],
      departamentos: colombia,
      camposRules: [(v) => !!v || "Campo es requerido"],
    };
  },

  methods: {
    async guardar() {
      let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
      await axios
        .post(`${url}/regional/crear`, this.paquete)
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
    // obtenemos las jornadas
    const api = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
    const response = await axios.get(`${api}/regional/`);
    this.listItems = response.data;
  },
};
</script>

<style>
.fondo {
  background: linear-gradient(
    90deg,
    rgba(74, 138, 22, 0.7820378151260504) 0%,
    rgba(9, 121, 114, 1) 35%,
    rgba(168, 120, 6, 1) 58%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
