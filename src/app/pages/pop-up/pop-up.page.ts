import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.page.html',
  styleUrls: ['./pop-up.page.scss'],
})
export class PopUpPage implements OnInit {

  @ViewChild('passwordForm', null) passwordForm: NgForm;
  phone: any;
  
  constructor(
    private popoverCtrl: PopoverController,
    public navParam: NavParams
  ) { 
    console.log(navParam.data);
    this.phone = this.navParam.get('key1');
  }

  ngOnInit() {
  }

  async onSubmit() {
    var body = {
      password: this.passwordForm.value.password
    };
    console.log(body);
    this.ClosePopover();
  }

  ClosePopover()
   {
      this.popoverCtrl.dismiss({
        'isLoggedIn': true
      });
   }

}
