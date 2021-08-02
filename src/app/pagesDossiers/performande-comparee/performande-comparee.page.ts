import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart } from 'angular-highcharts';
import { ManageService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-performande-comparee',
  templateUrl: './performande-comparee.page.html',
  styleUrls: ['./performande-comparee.page.scss'],
})
export class PerformandeCompareePage implements OnInit {

    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    loadData={choice:"",choice1:""}
    visible:any=false;
    famillepole1:any;
    famillepole2:any;

    periode=parseInt (localStorage.getItem('periode'));
    annee=localStorage.getItem('annee');
    data:any;
    datamois:any=[];
    chartData:any=[];
    chartData1:any=[];
    mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    moisder:any=[];
    dataa:any;
    mode:any;
    valeur:any;

    peperoni:boolean=false;
    chartOptions:any;


    getValue(event){
        console.log(event.target.value);
        var code=event.target.value;
        if(code==='BQ'){
          this.famillepole1="BANQUES"
        }
        if(code==='PP'){
          this.famillepole1="POLES PUBLICS"
        }
        if(code==='AC'){
          this.famillepole1="ASSURANCES/COURTIERS"
        }

        if(code==='CO,OB'){
          this.famillepole1="DPI"
        }


      }

      getValue1(event){
        console.log(event.target.value);
        var code=event.target.value;
        if(code==='BQ'){
          this.famillepole2="BANQUES"
        }
        if(code==='PP'){
          this.famillepole2="POLES PUBLICS"
        }
        if(code==='AC'){
          this.famillepole2="ASSURANCES/COURTIERS"
        }

        if(code==='CO,OB'){
          this.famillepole2="DPI"
        }
        console.log(this.famillepole2);
      }

    constructor(private manage:ManageService,
        private route:Router,public modal:ModalController) { }

    ngOnInit() {
    }

    conversion(nombre){
        var heure = Math.floor(nombre /3600);
        var seconRest = nombre % 3600;
        var minute = Math.floor(seconRest / 60);
        var secondefinal = Math.floor(seconRest / 60);
        if(heure<10){
          return '0'+heure+': '+minute+': '+secondefinal;
        }
        else{
          return heure+': '+minute+': '+secondefinal;
        }
      }


      parametrerDelai(){
          this.effacer();
        if(this.data !=null){
            this.data=[];
          }
          this.mode='delai'
          this.visible=true;
          this.peperoni=true;

          console.log(this.loadData.choice+' '+this.loadData.choice1)
         //on vérifie
         if(this.loadData.choice==='BQ'){
          this.famillepole1="BANQUES"
        }
        if(this.loadData.choice==='PP'){
          this.famillepole1="POLES PUBLICS"
        }
        if(this.loadData.choice==='AC'){
          this.famillepole1="ASSURANCES/COURTIERS"
        }

        if(this.loadData.choice==='CO,OB'){
          this.famillepole1="DPI"
        }

           this.manage.performancecompareepole(this.annee,this.periode,this.mode,this.loadData.choice,this.loadData.choice1)
            .subscribe(resp=>{
              this.data=resp;
              console.log(this.data);
              for(var i=0;i<this.data.length;i++){
                if(this.data[i].nomFamillePole===this.famillepole1){
                   this.chartData1.push((this.data[i].tempsMoyenTraitement/3600)/24)
                }
                if(this.data[i].nomFamillePole===this.famillepole2){
                  this.chartData.push((this.data[i].tempsMoyenTraitement/3600)/24)
               }
              }
              for(var i=0;i<this.periode;i++){
                this.moisder.push(this.mois[i]);
              }

              console.log("fjjfjf"+this.chartData)
              this.chartOptions=new Chart ({
                chart: {
                 type: 'spline'
               },
               title: {
                 text: 'EVOLUTION COMPAREE EN DELAI'
               },
              colors:[
                 '#6495ED',
                 '#FFA500'
             ],
               xAxis: {
                 categories: this.moisder
               },
               yAxis: {
                 title: {
                   text: 'Temps (en jours)'
               }
               },
               series:[{
                name: this.loadData.choice,
                type:undefined,
                 data: this.chartData1
               },
               {
                name: this.loadData.choice1,
                type:undefined,
                 data: this.chartData
               },]

             });

            })

    }

    effacer(){
        this.chartData1=[];
        this.chartData=[];
    }

    parametrerDuree(){
        this.effacer();
        if(this.data !=null){
            this.data=[];
          }
          this.mode='duree'
          this.visible=true;
          this.peperoni=true;

          console.log(this.loadData.choice+' '+this.loadData.choice1)
         //on vérifie
         if(this.loadData.choice==='BQ'){
          this.famillepole1="BANQUES"
        }
        if(this.loadData.choice==='PP'){
          this.famillepole1="POLES PUBLICS"
        }
        if(this.loadData.choice==='AC'){
          this.famillepole1="ASSURANCES/COURTIERS"
        }

        if(this.loadData.choice==='CO,OB'){
          this.famillepole1="DPI"
        }

           this.manage.performancecompareepole(this.annee,this.periode,this.mode,this.loadData.choice,this.loadData.choice1)
            .subscribe(resp=>{
              this.data=resp;
              console.log(this.data);
              for(var i=0;i<this.data.length;i++){
                if(this.data[i].nomFamillePole===this.famillepole1){
                   this.chartData1.push((this.data[i].tempsMoyenTraitement/3600)/24)

                }
                if(this.data[i].nomFamillePole===this.famillepole2){
                  this.chartData.push((this.data[i].tempsMoyenTraitement/3600)/24)
               }
              }
              for(var i=0;i<this.periode;i++){
                this.moisder.push(this.mois[i]);
              }

              console.log("fjjfjf"+this.chartData)
              this.chartOptions=new Chart ({
                chart: {
                 type: 'spline'
               },
               title: {
                 text: 'EVOLUTION COMPAREE EN DELAI'
               },
              colors:[
                 '#6495ED',
                 '#FFA500'
             ],
               xAxis: {
                 categories: this.moisder
               },
               yAxis: {
                 title: {
                   text: 'Temps (en jours)'
               }
               },
               series:[{
                name: this.loadData.choice,
                type:undefined,
                 data: this.chartData1
               },
               {
                name: this.loadData.choice1,
                type:undefined,
                 data: this.chartData
               },]

             });

            })
    }



    parametrer(){
        //boucler
        this.effacer();
        if(this.data !=null){
          this.data=[];
        }
        this.mode='delai'
        this.visible=true;
        this.peperoni=true;

        console.log(this.loadData.choice+' '+this.loadData.choice1)
       //on vérifie
       if(this.loadData.choice==='BQ'){
        this.famillepole1="BANQUES"
      }
      if(this.loadData.choice==='PP'){
        this.famillepole1="POLES PUBLICS"
      }
      if(this.loadData.choice==='AC'){
        this.famillepole1="ASSURANCES/COURTIERS"
      }

      if(this.loadData.choice==='CO,OB'){
        this.famillepole1="DPI"
      }

         this.manage.performancecompareepole(this.annee,this.periode,this.mode,this.loadData.choice,this.loadData.choice1)
          .subscribe(resp=>{
            this.data=resp;
            console.log(this.data);
            for(var i=0;i<this.data.length;i++){
              if(this.data[i].nomFamillePole===this.famillepole1){
                 this.chartData1.push((this.data[i].tempsMoyenTraitement/3600)/24)

              }
              if(this.data[i].nomFamillePole===this.famillepole2){
                this.chartData.push((this.data[i].tempsMoyenTraitement/3600)/24)
             }
            }
            for(var i=0;i<this.periode;i++){
              this.moisder.push(this.mois[i]);
            }

            console.log("fjjfjf"+this.chartData)
            this.chartOptions=new Chart ({
              chart: {
               type: 'spline'
             },
             title: {
               text: 'EVOLUTION COMPAREE EN DELAI'
             },
            colors:[
               '#6495ED',
               '#FFA500'
           ],
             xAxis: {
               categories: this.moisder
             },
             yAxis: {
               title: {
                 text: 'Temps (en jours)'
             }
             },
             series:[{
              name: this.loadData.choice,
              type:undefined,
               data: this.chartData1
             },
             {
              name: this.loadData.choice1,
              type:undefined,
               data: this.chartData
             },]

           });

          })
        }

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string{
        return this.selecteTextId == textId? "highlight-color" : "";
    }

    openGraph(){
        this.effacer();
        this.manage.performancecompareepole(this.annee,this.periode,this.mode,this.loadData.choice,this.loadData.choice1)
            .subscribe(resp=>{
                this.data=resp;
                console.log(this.data);
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].nomFamillePole===this.famillepole1){
                        this.chartData1.push((this.data[i].tempsMoyenTraitement/3600)/24)

                    }
                    if(this.data[i].nomFamillePole===this.famillepole2){
                        this.chartData.push((this.data[i].tempsMoyenTraitement/3600)/24)
                    }
                }
                for(var i=0;i<this.periode;i++){
                    this.moisder.push(this.mois[i]);
                }

                console.log("fjjfjf"+this.chartData)
                this.chartOptions=new Chart ({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'EVOLUTION COMPAREE EN DELAI'
                    },
                    colors:[
                        '#6495ED',
                        '#FFA500'
                    ],
                    xAxis: {
                        categories: this.moisder
                    },
                    yAxis: {
                        title: {
                            text: 'Temps (en jours)'
                        }
                    },
                    series:[{
                        name: this.loadData.choice,
                        type:undefined,
                        data: this.chartData1
                    },
                        {
                            name: this.loadData.choice1,
                            type:undefined,
                            data: this.chartData
                        },]

                });

            })
    }
}
