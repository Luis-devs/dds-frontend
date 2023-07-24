<template>
  <v-navigation-drawer v-model="drawer" app class="fon" width="320px">
    <vuescroll :ops="ops">
      <LogoSVG height="100px" width="100px" />
      <div style="text-align: center">
        <label class="letra" for="">EVENTOS SENA</label>
        
      </div>
      <div class="centrar">
      <v-avatar>
        <img
          src="../../assets/logos/sena.png"
          alt="John"
        >
      </v-avatar>
      </div>
      <v-divider> </v-divider>

      <div class="app-sidebar-content">
        <sidebar-menu showOneChild :menu="menu" />
      </div>
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import vuescroll from "vuescroll";
import LogoSVG from "@/assets/logos/DisenoAnimado.svg";

export default {
  components: {
    SidebarMenu,
    vuescroll,
    LogoSVG,
  },

  props: ["drawer"],
  data: () => ({
    ops: {
      scrollPanel: {
        initialScrollY: false,
        initialScrollX: false,
        scrollingX: false,
        scrollingY: true,
        speed: 300,
        easing: undefined,
        verticalNativeBarPos: "right",
      },
      rail: {
        background: "rgba(0, 0, 0, 0.158)",
        opacity: 1,
        size: "10px",
        specifyBorderRadius: false,
        gutterOfEnds: null,
        gutterOfSide: "2px",
        keepShow: false,
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: "#0378a677",
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: 0,
        size: "9px",
        disable: false,
      },
    },

    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],

    menu: [
      {
        header: true,
        title: "MENU EVENTOS",
        hiddenOnCollapse: false,
      },
      {
        href: "/dashboard/regional",
        title: "Regional",
        icon: "mdi mdi-bank",
      },
      {
        href: "/dashboard/centro",
        title: "Centro",
        icon: "fa fa-chart-area",
      },
      {
        href: "/dashboard/sede",
        title: "Sede",
        icon: "mdi mdi-home-variant",
      },
      {
        title: "Infra-estructura",
        icon: "mdi mdi-home-variant",

        child: [
          {
            title: "Bloque",
            child: [
              {
                href: "/dashboard/bloque",
                title: "Crear",
              },
              {
                href: "/dashboard/listarbloque",
                title: "Listar",
              },
            ],
          },
          {
            href: "/dashboard/tipoAmbiente",
            title: "Tipo Ambiente",
          },
          {
            title: "Ambiente",
            child: [
              {
                href: "/dashboard/ambiente",
                title: "Crear",
              },
              {
                href: "/dashboard/listarambiente",
                title: "Listar",
              },
            ],
          },
        ],
      },
      {
        title: "Programa",
        icon: "mdi mdi-home-variant",

        child: [
          {
            href: "/dashboard/crearprograma",
            title: "Crear",
          },
          {
            href: "/dashboard/listarprograma",
            title: "Listar",
          },

          {
            title: " * Ficha",

            child: [
              {
                href: "/dashboard/crearficha",
                title: "Crear Ficha",
              },
              {
                href: "/dashboard/listarfichas",
                title: "Listar",
              },
            ],
          },
        ],
      },
      {
        title: "Competencia",
        icon: "mdi mdi-home-variant",

        child: [
          {
            href: "/dashboard/crearcompetencia",
            title: "Crear",
          },
          {
            href: "/dashboard/listarcompetencia",
            title: "Listar",
          },
          {
            href: "/dashboard/crearresultadoaprendizaje",
            title: "Resultados de Aprendizaje",
          },
        ],
      },
      {
        title: "Instructor",
        icon: "mdi mdi-home-variant",

        child: [
          {
            href: "/dashboard/crearinstructor",
            title: "Crear",
          },
          {
            href: "/dashboard/listarcompetencia",
            title: "Listar",
          },
          {
            href: "/dashboard/crearresultadoaprendizaje",
            title: "Resultados de Aprendizaje",
          },
        ],
      },
      {
        href: "/dashboard/crearevento",
        title: "Evento",
        icon: "mdi mdi-home-variant",
      },
    ],
  }),
  mounted() {
    this.menu = this.$store.state.userData.menu;
  },
};
</script>
<style scoped>
.fon {
  /* background-image:url("../../assets/images/sidebar/abstract4.jpg");*/
  /* background-image: url("../../assets/imagen5.jpg"); */
  background-image: linear-gradient(to right top,  #a8eb12, #004d7a, #008793, #00bf72,#051937);
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
}
.letra {
  color: #ffffff;
  font-size: 30px;
  font-family: 'Lumanosimo', cursive;
  font-weight: 400;
}

.centrar{
  display: flex;
  justify-content: center;
}
</style>
