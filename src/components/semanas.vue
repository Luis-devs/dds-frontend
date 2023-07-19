<template>
    <div>
        <v-select
        :items="diastrabajados"
        label="Dia Inicial"
      ></v-select>
      <v-select
        :items="diastrabajados"
        label="Dia Final"
      ></v-select>
        
    </div>
</template>
<script>
 const fc = require('festivos-colombia');
export default {
   props:['dia','mes','year'],
   data() {
     return {
        dias : [],
        festivos : [],
        festivosmes : [],
        diastrabajados : [], 
    }
  },
  mounted() {
    this.mfestivos()
   
   
   },
  methods: {
     mfestivos(){
        this.festivos = []
        let holidays = fc.getHolidaysByYear(this.year);
        for (let fecha of holidays)
        {
         let data = fecha.date
         let arr = data.split('/');
         let fech = {
             dia : parseInt(arr[0]),
             mes : parseInt(arr[1])
         }
         this.festivos.push(fech)
        
       }
      },
    
      diasmes(){
        this.dias = []
        const diasmes = this.$moment(`${this.year}-${this.mes}`).daysInMonth()
        for(let dias = 1; dias <= diasmes; dias ++)
        {
            const fecha = this.$moment(`${this.year}-${this.mes}-${dias}`)
            if (fecha.day() === parseInt(this.dia)){
                this.dias.push(dias)
            }
        }
        
      },

      filtrar(){
        for (let obj of this.festivos)
         {
            console.log(obj.mes)
            if (obj.mes == this.mes)
              this.festivosmes.push(obj.dia)
          }
          this.diastrabajados = this.dias.filter(num => !this.festivosmes.includes(num));
         }

  },
  watch: {
    dia(){
        this.diasmes()
        this.filtrar()
       }
  },

}
</script>