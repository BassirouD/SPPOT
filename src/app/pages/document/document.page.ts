import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ManageService} from 'src/app/services/manager.service';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-document',
    templateUrl: './document.page.html',
    styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

    nom: any;
    prenom: any;
    email: any;
    telepohne: any;
    user: any;
    login = localStorage.getItem('login')

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    famille: string = "";
    data: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    periode = parseInt(localStorage.getItem('periode'));
    moisnom = this.mois[this.periode - 1];
    annee = parseInt(localStorage.getItem('annee'));
    data1: any = [];
    segmentModel = "all";
    dossiers: any;
    moda: any = false;
    loadParam = {coef: 0};
    coef: any = 14000;
    data2: any;
    data3: any;
    loadData = {annee1: this.annee, annee2: ''};
    loadData1 = {periode1: this.periode}
    nbAnn: any;
    nbTr: any;
    nbRej: any;
    nben: any;
    nbmod: any;
    periode1: any;

    constructor(private manage: ManageService,
                public modal: ModalController, private route: Router,
                public loadingController: LoadingController, private authS: AuthService,
                private toastController: ToastController, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.manage.listeDossiersByYearMonth(this.annee, this.periode)
            .subscribe(resp => {
                this.data3 = resp;
                this.nbAnn = this.data3[0].nbreannules;
                this.nbRej = this.data3[0].nbrerejetes;
                this.nbmod = this.data3[0].nbremodifies;
                this.nbTr = this.data3[0].nbretraites;
                this.nben = this.data3[0].nbreencours;
                //console.log('data 3'+ JSON.stringify(this.data3[0].nbreannules))
            });
        this.heckUser();
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    parametrer() {
        this.manage.listeDossiesTwoYears(this.loadData.annee1, this.loadData.annee2)
            .subscribe(resp => {
                this.data2 = resp;
                console.log(this.data2)
            }, err => {
                console.log(err);
            })
    }

    segmentChanged(event) {
        console.log(this.segmentModel);

        console.log(event);
    }

    listeDossiersByMonthYear() {
        this.manage.listeDossiersByYearMonth(this.annee, this.periode)
            .subscribe(resp => {
                this.data3 = resp;
                this.nbAnn = this.data3[0].nbreannules;
                this.nbRej = this.data3[0].nbrerejetes;
                this.nbmod = this.data3[0].nbremodifies;
                this.nbTr = this.data3[0].nbretraites;
                this.nben = this.data3[0].nbreencours;
                //console.log('data 3'+ JSON.stringify(this.data3[0].nbreannules))
            })
    }

    parametrer1() {
        this.manage.listeDossiersByYearMonth(this.annee, this.loadData1.periode1)
            .subscribe(resp => {
                this.data3 = resp;
                this.nbAnn = this.data3[0].nbreannules;
                this.nbRej = this.data3[0].nbrerejetes;
                this.nbmod = this.data3[0].nbremodifies;
                this.nbTr = this.data3[0].nbretraites;
                this.nben = this.data3[0].nbreencours;
                //console.log('data 3'+ JSON.stringify(this.data3[0].nbreannules))
            })
    }

    checkfamille(event) {
        this.periode1 = event.target.value;
        this.manage.listeDossiersByYearMonth(this.annee, this.periode1)
            .subscribe(resp => {
                this.data3 = resp;
                this.nbAnn = this.data3[0].nbreannules;
                this.nbRej = this.data3[0].nbrerejetes;
                this.nbmod = this.data3[0].nbremodifies;
                this.nbTr = this.data3[0].nbretraites;
                this.nben = this.data3[0].nbreencours;
                //console.log('data 3'+ JSON.stringify(this.data3[0].nbreannules))
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

    heckUser() {
        this.authS.getUser(this.login)
            .subscribe(data => {
                this.user = data;
                console.log(this.user);
                this.nom = this.user.nom
                this.prenom = this.user.prenom
                this.email = this.user.email;
                this.telepohne = this.user.telephone;
            })
    }

}
