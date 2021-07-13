import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ManageService } from 'src/app/services/manager.service';
import * as Highcharts from 'highcharts';
import { Options} from "highcharts";
import { Chart } from 'angular-highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-etat-global-dossier',
  templateUrl: './etat-global-dossier.page.html',
  styleUrls: ['./etat-global-dossier.page.scss'],
})
export class EtatGlobalDossierPage implements OnInit {
 famille:string="";
 data:any;
 //mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
 periode = parseInt(localStorage.getItem('periode'));

 annee = parseInt(localStorage.getItem('annee'));
 periodemois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
  mois = this.periodemois[this.periode-1];
  moisnom= this.periodemois[this.periode-1];
  dataCat:any=[];
  chartData:any=[];
  chartData1:any=[];
  chartOptions:any;

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor(private manage:ManageService,
        public modal:ModalController,private route:Router,
        public loadingController:LoadingController,
         private toastController: ToastController,private alertCtrl: AlertController) { }

    ngOnInit() {
        this.loadDataDossierByCode('AC');
    }


    checkfamille(event){
      let code=event.target.value;
      console.log(code);
      this.loadDataDossierByCode(code);
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
          header: 'Info',
          message: mgs,
          buttons: ['OK']
        });

        await alert.present();

      }

      async presentToast(msg) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 2000
        });
        toast.present();
      }

      effacer(){
        this.chartData1 = [];
      }

    async loadDataDossierByCode(code:any){
        this.effacer();
        const loading = await this.loadingController.create({
          message:"Veuillez patienter !!!",
          duration:3000
        });
        await loading.present()
        this.famille = code;
        this.manage.dossierparetatparpolebycode(this.annee,this.periode,code)
        .subscribe(resp=>{
          this.data=resp;
          if(this.data.length !=0){
            loading.dismiss();

            //graphique
            for(var i=0;i<this.data.length;i++){
                //this.dataCat.push(this.data[i].nomPole);
                //this.chartData.push(this.data[i].nombreDossiersTraites);
                this.chartData1.push({
                  'name':(this.data[i].nomPole==='COTECNA')?'DPI':this.data[i].nomPole,
                  'y':this.data[i].nombreDossiersTraites,
                  sliced:true
              })
              }


              this.chartOptions=  new Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height:'470px',
                    type: 'pie'
                },
                title: {
                    text: 'Répartition du nombre dossier traité'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y} dossiers</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: ''
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                          enabled: true,
                          format: '<b>{point.name}</b>: {point.y} dossiers traités'
                      },
                        showInLegend: false
                    }
                },
                series: [{
                    name: 'Nombre dossier traité',
                    type:undefined,
                    colorByPoint: true,
                    data: this.chartData1
                }]
              });

          }else{
            this.presentAlert("Pas de données pour ce mois !!");
          }
          console.log(this.data);
        },err=>{
          console.log(err);
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

    getGraph(){
        this.effacer();
        let code = this.famille;
        this.manage.dossierparetatparpolebycode(this.annee,this.periode,code)
            .subscribe(resp=>{
                this.data=resp;
                if(this.data.length !=0){
                    for(var i=0;i<this.data.length;i++){
                        //this.dataCat.push(this.data[i].nomPole);
                        //this.chartData.push(this.data[i].nombreDossiersTraites);
                        this.chartData1.push({
                            'name':(this.data[i].nomPole==='COTECNA')?'DPI':this.data[i].nomPole,
                            'y':this.data[i].nombreDossiersTraites,
                            sliced:true
                        })
                    }


                    this.chartOptions=  new Chart({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            height:'470px',
                            type: 'pie'
                        },
                        title: {
                            text: 'Répartition du nombre dossier traité'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y} dossiers</b>'
                        },
                        accessibility: {
                            point: {
                                valueSuffix: ''
                            }
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.y} dossiers traités'
                                },
                                showInLegend: false
                            }
                        },
                        series: [{
                            name: 'Nombre dossier traité',
                            type:undefined,
                            colorByPoint: true,
                            data: this.chartData1
                        }]
                    });

                }else{
                    this.presentAlert("Pas de données pour ce mois !!");
                }
                console.log(this.data);
            },err=>{
                console.log(err);
            })
    }
}
