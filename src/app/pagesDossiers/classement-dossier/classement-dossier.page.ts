import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManageService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-classement-dossier',
    templateUrl: './classement-dossier.page.html',
    styleUrls: ['./classement-dossier.page.scss'],
})
export class ClassementDossierPage implements OnInit {

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    mode: any = 0;
    data: any;
    mode1: any = "AC";
    periode: any = localStorage.getItem('periode');
    annee: any = localStorage.getItem('annee');
    modecal: any = '';
    famille: any = 'Assurances/Courtiers';
    dataCat: any = [];
    chartData: any = [];
    color: any;
    chartOptions: any;

    constructor(private manage: ManageService,
                private modal: ModalController, private route: Router) {
    }

    ngOnInit() {
        this.loadMeanTime("delai");
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

    changeMode() {
        this.clicked = false;
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

    delai() {
        this.modecal = 'delai'
        this.loadMeanTime(this.modecal);
    }

    duree() {
        this.modecal = 'duree'
        this.loadMeanTime(this.modecal);
    }

    checkfamille(event) {
        this.mode1 = event.target.value
        this.loadMeanTime(this.modecal);

    }

    conversion(nombre) {
        var heure = Math.floor(nombre / 3600);
        var seconRest = nombre % 3600;
        var minute = Math.floor(seconRest / 60);
        var secondefinal = Math.floor(seconRest / 60);
        if (heure < 10) {
            return '0' + heure + ': ' + minute + ': ' + secondefinal;
        } else {
            return heure + ': ' + minute + ': ' + secondefinal;
        }
    }

    effacer() {
        this.dataCat = [];
        this.chartData = [];
    }

    loadMeanTime(modecalcul) {
        this.effacer();
        if (this.modecal === 'delai') {
            this.color = '#6495ED'
        } else {
            this.color = '#FFA500'
        }
        this.modecal = modecalcul;
        this.manage.tempsDossierplusLong(this.annee, this.periode, this.modecal, this.mode1)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].nomPole === 'COTECNA') {
                        this.data[i].nomPole = 'DPI';
                    }
                    this.dataCat.push(this.data[i].nomPole);
                    this.chartData.push((this.data[i].dureeDossierLePlusLong / 3600) / 24);
                }

                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Graph sur les dossiers les plus long'
                    },
                    colors: [
                        this.color,
                    ],
                    xAxis: {
                        categories: this.dataCat
                    },
                    yAxis: {
                        title: {
                            text: 'Nombre de jours'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: this.modecal,
                        type: undefined,
                        data: this.chartData
                    }]

                });

            }, err => {
                console.log(err);
            })
    }

    openGraph() {
        this.effacer();
        let modecalcul = this.modecal;
        this.loadMeanTime(modecalcul);
    }

}
