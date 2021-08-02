import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManageService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-tendance-evolution',
    templateUrl: './tendance-evolution.page.html',
    styleUrls: ['./tendance-evolution.page.scss'],
})
export class TendanceEvolutionPage implements OnInit {

    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    famille: string = "";
    data: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    periode = parseInt(localStorage.getItem('periode'));
    moisnom = this.mois[this.periode - 1];
    annee = parseInt(localStorage.getItem('annee'));
    nbAnn: any;
    nbTr: any;
    nbRej: any;
    nben: any;
    nbmod: any;
    chartOptions: any;

    constructor(private manage: ManageService,
                public modal: ModalController, private route: Router,
                public loadingController: LoadingController,
                private toastController: ToastController, private alertCtrl: AlertController) {
    }

    ngOnInit(): void {
        console.log(this.annee);
        this.loadDataDossierByCode('AC');
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

    checkfamille(event) {
        this.famille = event.target.value
        this.loadDataDossierByCode(this.famille);
    }

    async loadDataDossierByCode(code: any) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.famille = code;
        this.manage.listetypedossierbycode(this.annee, this.periode, code)
            .subscribe(resp => {
                this.data = resp;
                this.nbAnn = this.data[0].nbreannules;
                this.nbRej = this.data[0].nbrerejetes;
                this.nbmod = this.data[0].nbremodifies;
                this.nbTr = this.data[0].nbretraites;
                this.nben = this.data[0].nbreencours;
                console.log(this.data)
                if (this.data.length != 0) {
                    loading.dismiss();

                    //chart

                    this.chartOptions = new Chart({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            height: '470px',
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
                            name: 'Répartition',
                            type: undefined,
                            //colorByPoint: true,
                            data: [{
                                name: 'Dossiers annulés',
                                color: '#FFA500',
                                y: this.data[0].nbreannules,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Dossiers modifiés',
                                color: '#6495ED',
                                y: this.data[0].nbremodifies
                            }, {
                                name: 'Dossiers encours',
                                color: '#C8964C',
                                y: this.data[0].nbreencours
                            }, {
                                name: 'Dossiers traités',
                                color: '#c38c9f',
                                y: this.data[0].nbretraites
                            }, {
                                name: 'Dossiers rejetés',
                                color: '#FF5733',
                                y: this.data[0].nbrerejetes
                            }]
                        }]
                    });


                } else {
                    this.presentAlert("Pas de données pour ce mois !!");
                }
                console.log(this.data);
            }, err => {
                console.log(err);
            })
    }

    catSlideOpts = {
        slidesPerView: 2.2,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        freeMode: true,
        loop: false,
        centeredSlides: false,
    };

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

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

}
