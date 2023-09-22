<template>
  <v-app-bar app elevate-on-scroll elevation="8" relative flat class="fondo">
      <v-app-bar-nav-icon
      class="btn"
      dark
      @click="procesa()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="letra">GESTION DE EVENTOS </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" style="cursor: point" class="mx-5 mr-10">
          <v-avatar size="40">
            <img src="https://randomuser.me/api/portraits/women/80.jpg" />
          </v-avatar>
        </span>
      </template>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="procesar(i)" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "Perfil", icon: "mdi-clock" },
        { text: "Salir", icon: "mdi-account" },
      ],
    };
  },
  computed: {
    usuario(){
        return this.$store.getters.usuario.name
    }
  },
  methods: {
    procesa() {
      console.log("generado");
      this.$emit("handrawer");
    },
    procesar(pos){
      if (pos == 1)
      {
        this.$store.commit('setusuario', null)
        this.$router.push('/');
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.letra {
  color: #ffffff;
  font-size: 30px;
  font-family: 'Lumanosimo', cursive;
  font-weight: 500;
}

.fondo{
  background-image: url("../../assets/6079758.jpg"); 
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
