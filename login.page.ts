import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/providers/alert-controller';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

export class User {
    email: string;
    password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

    public user: User = new User();

    constructor(public navCtrl: NavController, public router: Router, public fAuth: AngularFireAuth) {
    }

    async login() {
        try {
            var r = await this.fAuth.auth.signInWithEmailAndPassword(
                this.user.email,
                this.user.password
            );
            if (r) {
                this.router.navigate(['/home']);
            }

        } catch (err) {
            console.error(err);
            alert("Invalid EMAIL or PASSWORD");
        }
    }

    retailer() {
        this.router.navigate(['/client']);
    }

}
