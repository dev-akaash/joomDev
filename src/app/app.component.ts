import { Component } from '@angular/core';
import { Platform, MenuController, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: any = null;

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) {
    this.isLoggedIn = window.localStorage.getItem('isLoggedIn');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.isLoggedIn === null || this.isLoggedIn === false) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/welcome');
      }
    });
  }

  onMenuClose() {
    this.menuCtrl.close('m1');
  }

  onLogout() {
    window.localStorage.clear();
    this.presentAlert('Alert', 'You\'ve been logged out');
    this.navCtrl.navigateRoot('/login');
  }

    /*Alert Service*/
    async presentAlert(fetchedHDR: String, fetchedMSG: String) {
      const alert = await this.alertCtrl.create({
        header: `${fetchedHDR}`,
        message: `${fetchedMSG}`,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              return;
            }
          }
        ]
      });
      alert.present();
    }
}
