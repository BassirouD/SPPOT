import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart } from 'angular-highcharts';

import { ManageService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-classement-temps',
  templateUrl: './classement-temps.page.html',
  styleUrls: ['./classement-temps.page.scss'],
})

export class ClassementTempsPage implements OnInit {

    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    mode:any=0;
  //Highcharts1= Highcharts;
  mode1:any="AC";
  periode:any=localStorage.getItem('periode');
  annee:any=localStorage.getItem('annee');
  data:any;
  modecal:any='';
  famille:any='Assurances/Courtiers';
  color:any;
  //Highcharts= Highcharts;
  dataCat:any=[];
  chartData:any=[];
  duree(){
    this.mode=1;
  }

  effacer(){
      this.dataCat = [];
      this.chartData = [];
  }

  delai(){
    this.mode=0;
  }

  delaiTime(){
    this.modecal='delai'
    this.loadMeanTime(this.modecal);
  }

  dureeTime(){
    this.modecal='duree'
    this.loadMeanTime(this.modecal);
  }

  constructor(public modal:ModalController,
    private manage:ManageService,private route:Router) { }

    checkfamille(event){
      let famille=event.target.value;
      this.mode1=famille;
      this.loadMeanTime(this.modecal);
    }

  loadMeanTime(modecalcul){
      this.effacer();
    this.modecal=modecalcul;
    if(this.modecal==='delai'){
        this.color='#6495ED'
      }else{
        this.color='#FFA500'
      }
    this.manage.tempsmoyentraitementbycodeAndMode(this.annee,this.periode,this.modecal,this.mode1)
    .subscribe(resp=>{
       this.data=resp;
       console.log(this.data);
       //bouclage
       for(var i=0;i<this.data.length;i++){
         this.dataCat.push(this.data[i].nomPole);
         this.chartData.push(this.data[i].tempsMoyenTraitement);
       }
   // this.drawing(this.annee,this.periode,this.modecal,this.mode1);
        this.chartOptions= new Chart({
            chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        colors:[
            this.color,
        ],
        xAxis: {
            categories: this.dataCat
        },
        yAxis: {
            title: {
            text: 'Temps (en heures)'
        }
        },
        credits:{
            enabled:false
        },
        series:[{
            name: this.modecal,
            type:undefined,
            data: this.chartData
        }]

        });


    },err=>{
      console.log(err);
    })
  }
  chartOptions:any;

  drawing(annee,periode,modecal,famille){
    if(modecal==='delai'){
        this.color='#6495ED'
      }else{
        this.color='#FFA500'
      }
    this.manage.tempsMoyenmoins24(this.annee,this.periode,this.modecal,this.famille)
    .subscribe(resp=>{
       this.data=resp;
       console.log(this.data);
       //bouclage
       for(var i=0;i<this.data.length;i++){
         if(this.data[i].nomPole==='COTECNA'){
           this.data[i].nomPole='DPI'
         }
         this.dataCat.push(this.data[i].nomPole);
         this.chartData.push(this.data[i].tempsMoyenTraitement/3600);
       }

       this.chartOptions= new Chart({
        chart: {
         type: 'spline'
       },
       title: {
         text: 'LIMITE DES PÔLES TRAITANT -24h'
       },
      colors:[
         this.color,
     ],
       xAxis: {
         categories: this.dataCat
       },
       yAxis: {
         title: {
           text: 'Temps (en heures)'
       }
       },
       credits:{
         enabled:false
       },
       series:[{
        name: this.modecal,
        type:undefined,
         data: this.chartData
       }]

     });

    },err=>{
      console.log(err);
    })
  }


    ngOnInit() {
        this.loadMeanTime('delai');
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
        let modecalcul = this.modecal;
        if(this.modecal==='delai'){
            this.color='#6495ED'
        }else{
            this.color='#FFA500'
        }
        this.manage.tempsmoyentraitementbycodeAndMode(this.annee,this.periode,this.modecal,this.mode1)
            .subscribe(resp=>{
                this.data=resp;
                console.log(this.data);
                //bouclage
                for(var i=0;i<this.data.length;i++){
                    this.dataCat.push(this.data[i].nomPole);
                    this.chartData.push(this.data[i].tempsMoyenTraitement);
                }
                // this.drawing(this.annee,this.periode,this.modecal,this.mode1);
                this.chartOptions= new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: ''
                    },
                    colors:[
                        this.color,
                    ],
                    xAxis: {
                        categories: this.dataCat
                    },
                    yAxis: {
                        title: {
                            text: 'Temps (en heures)'
                        }
                    },
                    credits:{
                        enabled:false
                    },
                    series:[{
                        name: this.modecal,
                        type:undefined,
                        data: this.chartData
                    }]

                });


            },err=>{
                console.log(err);
            })
    }
}
