<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="800">
        <v-app-bar flat color="rgba(156, 216, 175, 256)">
          <v-toolbar-title class="text-h6 white--text pl-0">
            CREAR FICHA
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text class="carta">
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-row>
                    <v-row class="mb-4">
                      <v-col cols="6">
                        <v-text-field
                          label="Código"
                          append-icon="mdi-key"
                          v-model="paquete.codigo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-row>

                  <v-row cols="12" class="mx-2">
                    <v-text-field
                      class="mr-2"
                      v-model="paquete.startDate"
                      type="date"
                      label="Fecha de inicio"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="paquete.endDate"
                      type="date"
                      label="Fecha de fin"
                      outlined
                    ></v-text-field>
                  </v-row>

                  <v-row cols="12">
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Selecciones Ambiente"
                        v-model="paquete.departamento"
                        append-icon="school"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Seleccione Programa"
                        v-model="paquete.departamento"
                        append-icon="book"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Seleccione Intructor"
                        v-model="paquete.departamento"
                        append-icon="mdi-account"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row cols="12">
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Seleccione Día"
                        v-model="paquete.departamento"
                        append-icon="mdi-calendar"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Seleccione Jornada"
                        v-model="paquete.departamento"
                        append-icon="mdi-calendar"
                      ></v-select>
                    </v-col>
                  </v-row>
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
        <v-data-table
          :items="tablaDatos"
          :headers="tablaHeaders"
          class="elevation-1"
        ></v-data-table>
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
      paquete: {
        nombre: null,
        nomenclatura: null,
        startDate: null,
        endDate: null,
      },
    };
  },

  methods: {
    async guardar() {
      await axios
        .post("http://10.187.145.190:3000/centro/crear", this.paquete)
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
      var tipoAmb = null;
      for (let pos in this.typeAmbiente) {
        if (this.typeAmbiente[pos] == this.paquete.tipo) {
          tipoAmb = this.typeAmbiente[pos].tipoAmb;
        }
      }
      return tipoAmb;
    },
  },
};
</script>

<style></style>
