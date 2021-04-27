import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, MenuController, NavController, PopoverController } from '@ionic/angular';
import { PopUpPage } from '../pop-up/pop-up.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginForm', null) loginForm: NgForm;
  isLoggedIn = null;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private menuCtrl: MenuController
  ) { 
    this.menuCtrl.enable(false, 'm1');
  }

  ngOnInit() {
  }

  async onSubmit(ev: Event) {
    var body = {
      phone: this.loginForm.value.phone
    };

    console.log(body);
    this.presentPopover(ev);
  }
  
  async presentPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({component: PopUpPage, event: ev, componentProps:{key1: this.loginForm.value.phone}});
    await popover.present();
    
    const { data } = await popover.onDidDismiss();
    this.isLoggedIn = data;
    console.log(this.isLoggedIn);

    if (this.isLoggedIn.isLoggedIn == true) {
      const loading = await this.loadingCtrl.create({
        duration: 3000
      });
      loading.present();

      window.localStorage.setItem('phone', this.loginForm.value.phone);
      window.localStorage.setItem('isLoggedIn', this.isLoggedIn.isLoggedIn);
      this.navCtrl.navigateRoot('/welcome');

      loading.dismiss();
    }
  }
}
