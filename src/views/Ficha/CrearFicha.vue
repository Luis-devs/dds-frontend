<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="800">
        <v-app-bar flat color="rgb(52,188,52)">
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
                    <v-col cols="6">
                      <v-text-field
                        label="Código"
                        append-icon="mdi-key"
                        v-model="paquete.codigo"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row cols="12" class="mx-2">
                    <v-text-field
                      class="mr-2"
                      v-model="paquete.startDate"
                      type="date"
                      label="Fecha de inicio"
                      @input="validarFecha"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      class="ml-2"
                      v-model="paquete.endDate"
                      type="date"
                      label="Fecha de fin"
                      outlined
                      @input="validarFecha"
                    ></v-text-field>
                  </v-row>

                  <v-row cols="12">
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Selecciones Ambiente"
                        v-model="paquete.ambiente"
                        append-icon="school"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="departamentos"
                        item-text="departamento"
                        item-value="departamento"
                        label="Seleccione Programa"
                        v-model="paquete.programa"
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
                        v-model="paquete.instructor"
                        append-icon="mdi-account"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row cols="12">
                    <v-col cols="6">
                      <v-select
                        :items="diasSemana"
                        item-text="diasSemana"
                        item-value="diasSemana"
                        label="Seleccione Día"
                        v-model="paquete.dia"
                        append-icon="mdi-calendar"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="jornada"
                        item-text="jornadas"
                        item-value="jornadas"
                        label="Seleccione Jornada"
                        v-model="paquete.jornada"
                        append-icon="mdi-calendar"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-12">
          <v-btn class="ma-2" color="secondary" @click="agregarLista">
            Agregar
          </v-btn>
          <v-btn class="ma-2" color="rgb(52,188,52)" @click="guardar()">
            Crear
          </v-btn>
        </v-card-actions>
        <v-data-table
          :items="listItems"
          :headers="tablaHeaders"
          class="elevation-1 mx-12 my-6"
        ></v-data-table>

        <table class="table table-white mx-12 my-6">
          <thead>
            <tr>
              <th v-for="title in titles" :key="title">
                {{ title }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in listItems" :key="item.dia">
              <td>{{ item.dia }}</td>

              <td>{{ item.jornada }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-row>

    <!-- Modal de advertencias y errores -->
    <!-- <v-btn @click="mostrarModal">Mostrar Modal</v-btn> -->
    <v-dialog v-model="mostrar" max-width="500px" class="">
      <v-card>
        <v-card-title>
          <span class="headline text-lg-h4">{{ modalTitle }}</span>
        </v-card-title>
        <v-card-text class="text-lg-h6"> {{ modalText }} </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="cerrarModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <pre>
          {{ $data }}
        </pre
    >
  </v-container>
</template>

<script>
import axios from "axios";
import dia from "../../json/dia";
import jornadas from "../../json/jornada";

export default {
  props: {
    datos: Object,
    // mostrar: Boolean,
  },
  data() {
    return {
      paquete: {
        codigo: null,
        startDate: null,
        endDate: null,
        ambiente: null,
        programa: null,
        instructor: null,
        dia: null,
        jornada: null,
      },
      // titulos de la primera tabla
      tablaHeaders: [
        { text: "Día", value: "dia" },
        { text: "Jornada", value: "jornada" },
      ],
      // titulos de la segunda tabla
      titles: ["Día", "Jornada"],
      // items de la tabla
      listItems: [],
      diasSemana: null,
      jornada: null,
      mostrar: false,
      modalTitle: "",
      modalText: "",
    };
  },

  methods: {
    async guardar() {
      await axios
        // TODO: Agregar el endpoint
        .post("http://159.223.110.82:3000/", this.paquete)
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

    agregarLista() {
      if (this.paquete.dia == null || this.paquete.jornada == null) {
        this.mostrarModal("Error", "Debe seleccionar un día y una jornada");
        return;
      }

      this.listItems.push({
        dia: this.paquete.dia,
        jornada: this.paquete.jornada,
      });

      this.paquete.dia = null;
      this.paquete.jornada = null;
    },

    validarFecha() {
      const fechaInicio = this.paquete.startDate.split("-");
      const fechaFin = this.paquete.endDate.split("-");

      const fechaInicioObj = new Date(
        fechaInicio[0],
        fechaInicio[1] - 1,
        fechaInicio[2]
      );
      const fechaFinObj = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);

      // Verifica si las fechas son válidas
      if (
        isNaN(fechaInicioObj.getTime()) ||
        isNaN(fechaFinObj.getTime()) ||
        fechaInicioObj > fechaFinObj
      ) {
        this.paquete.startDate = null;
        this.paquete.endDate = null;
        this.mostrarModal(
          "Error",
          "La fecha de inicio debe ser menor a la fecha de fin"
        );
        return false; // Las fechas no son válidas
      }

      return true; // Las fechas son válidas
    },

    mostrarModal(title, message) {
      this.modalTitle = title;
      this.modalText = message;
      this.mostrar = true;
    },
    cerrarModal() {
      this.mostrar = false;
    },
  },

  created() {
    this.diasSemana = dia;
    this.jornada = jornadas;
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
