import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManageService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-tendance-moyenne',
    templateUrl: './tendance-moyenne.page.html',
    styleUrls: ['./tendance-moyenne.page.scss'],
})
export class TendanceMoyennePage implements OnInit {

    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    mode: any = "";
    data: any;
    mode1: any = ""
    annee: any = localStorage.getItem('annee');
    periode: any = localStorage.getItem('periode');
    chartData: any = [];
    chartData1: any = [];
    chartOptions: any;

    constructor(private manage: ManageService, private modal: ModalController, private route: Router) {
    }

    ngOnInit() {
        //this.plotpiechart(0);
        this.loadTmtfamille("delai");
        // console.log(this.conversion(34362));
    }

    plotpiechart(mode) {
        this.mode = mode;
        //var chart = Highcharts.chart("highcharts", this.chartOptions1);
    }

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
    }


    loadTmtfamille(mode) {
        this.effacer();
        this.mode1 = mode;
        this.manage.tendanceMoyennebymode(this.annee, this.periode, this.mode1)
            .subscribe(resp => {
                this.data = resp;
                // console.log(this.data);
                for (var i = 0; i < this.data.length; i++) {
                    this.chartData.push(this.data[i].nomFamillePole)
                    this.chartData1.push(this.data[i].tempsMoyenTraitement)
                }
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Graph sur le nombre de dossiers traités par pôle'
                    },
                    colors: [
                        '#6495ED',
                    ],
                    xAxis: {
                        categories: this.chartData
                    },
                    yAxis: {
                        title: {
                            text: 'Temps moyen Traitement'
                        }
                    },
                    series: [{
                        name: 'suivi évolutif',
                        type: undefined,
                        data: this.chartData1
                    }]

                });

            }, err => {
                console.log(err);
            })
    }

    generer() {
        this.mode = 1
        this.plotpiechart(this.mode);
        // condition à établir
        // console.log(this.chartData);
        // console.log('calling chart')
    }

    gotoParam() {
        localStorage.removeItem('periode');
        localStorage.removeItem('annee');
        this.route.navigate(['parametrage']);
    }

    gotoMenu() {
        this.route.navigate(['tabs/tab1'])
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

    openGraph() {
        this.effacer();
        let mode = this.mode1;
        this.manage.tendanceMoyennebymode(this.annee, this.periode, this.mode1)
            .subscribe(resp => {
                this.data = resp;
                // console.log(this.data);
                for (var i = 0; i < this.data.length; i++) {
                    this.chartData.push(this.data[i].nomFamillePole)
                    this.chartData1.push(this.data[i].tempsMoyenTraitement)
                }
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Graph sur le nombre de dossiers traités par pôle'
                    },
                    colors: [
                        '#6495ED',
                    ],
                    xAxis: {
                        categories: this.chartData
                    },
                    yAxis: {
                        title: {
                            text: 'Temps moyen Traitement'
                        }
                    },
                    series: [{
                        name: 'suivi évolutif',
                        type: undefined,
                        data: this.chartData1
                    }]
                });
            }, err => {
                console.log(err);
            })
    }
}
