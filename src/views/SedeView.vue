<template>
    <v-container>
        <v-row justify="space-around">
          <v-card width="600">
            
              <v-app-bar
                flat
                color="rgba(0, 0, 0, 0)"
                class="fondo"
              >
                <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
    
                <v-toolbar-title class=" text-h6 white--text pl-0">
                  CREAR SEDE
                </v-toolbar-title>
    
                <v-spacer></v-spacer>
    
                <v-btn
                  color="white"
                  icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-app-bar>
    
               
            <v-card-text>
             
                <v-form>
                    <v-container>
                    <v-row>
                    <v-col
                     cols="7">
                  
                      <v-row>
                        <v-col
                          cols="6"
                        >
                          <v-text-field
                            label="Codigo de la sede"
                            prepend-icon="mdi-key"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            label="Nombre de la sede"
                            prepend-icon="mdi-key"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      </v-col>
                      <v-col
                      cols="5">
                        <img width="100%" height="100%" src="https://www.sena.edu.co/es-co/Noticias/NoticiasImg/BP-sede_Gomez_Plata_19082021.jpeg">
                        
                      </v-col>
                    </v-row>
                    </v-container>
                </v-form>
    
              
            </v-card-text>
            <v-card-actions>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
              >
                Crear
              </v-btn>
              </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
</template>
<style>
 .fondo{
    background: linear-gradient(90deg, rgba(138,74,22,0.7820378151260504) 15%, rgba(6,92,23,1) 49%, rgba(226,175,56,1) 82%);
 }

</style>