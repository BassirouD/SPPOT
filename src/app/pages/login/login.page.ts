import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loadData = {login: '', password: ''}

    constructor(public loadingController: LoadingController,
                public router: Router,
                private toastController: ToastController, public auths: AuthService,
                private alertCtrl: AlertController, public nav: NavController) {
    }

    ngOnInit() {
    }

    async login() {
        const loading = await this.loadingController.create({
            message: "Please wait !!!",
            duration: 3000
        });
        await loading.present()
        //console.log(this.loadData);
        const credential = this.auths.login(this.loadData);
        if (credential) {
            loading.dismiss();
            // this.presentAlert("Connexion réussie !!");
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['home']);
        } else {
            loading.dismiss();
            this.presentToast('enable to loggin');
        }
    }

    async login1() {
        const loading = await this.loadingController.create({
            message: "Please wait !!!",
            duration: 3000
        });
        await loading.present()
        this.auths.login1(this.loadData)
            .subscribe(data => {
                //console.log(data);
                loading.dismiss();
                if (data != null) {
                    // this.presentAlert("Connexion réussie !!");
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('login', data.login)
                    localStorage.setItem('id', data.id)
                    if (data.defaultpwd === "1") {
                        this.router.navigate(['change-password']);
                    } else {
                        this.router.navigate(['tabs/home']);
                    }
                } else {
                    this.presentToast("Authentification incorrecte !!")
                }

            }, err => {
                console.log(err);
            })
    }

    gotoSign() {
        this.router.navigate(['signup']);
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
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

}
