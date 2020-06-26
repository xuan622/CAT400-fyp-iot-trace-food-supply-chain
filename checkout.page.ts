import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ReadServiceService } from './../read-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

    scannedData: {};
    domElement: any;
    parcelData: any;
    user: any;
    email: any;
    uid: any;
    condition3: any;
    condition4: any;

    constructor(private qrScanner: QRScanner, private firestore: AngularFirestore, private router: Router, private readService: ReadServiceService) { }

    ngOnInit() {

        this.user = firebase.auth().currentUser;

        if (this.user != null) {
            this.email = this.user.email;
            this.uid = this.user.uid;
        }

        this.domElement = window.document.querySelector('ion-app') as HTMLElement;
        this.prepare();
    }

    ionViewWillLeave() {
        this.hideCamera();
    }

    prepare() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                console.log(status.authorized);
                this.showCamera();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
    showCamera() {
        this.qrScanner.show();
        this.domElement.classList.add('has-camera');

        const scanSub = this.qrScanner.scan()
            .subscribe((text: string) => {
                this.onScan(text);
            });
    }

    hideCamera() {
        this.qrScanner.hide();
        this.domElement.classList.remove('has-camera');
    }

    onScan(text: string) {
        console.log('Scanned:', text);
        alert('Scanned:' + text);
        this.scannedData = text;
        console.log(this.scannedData);
        this.checkOut();
        this.redirectToPackagingHub();
    }

    redirectToPackagingHub() {
        this.router.navigate(['/packaging-hub']);
    }

    checkOut() {

        var found = false;
        var foundOut = false;
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var currentDay = new Date().getDate();
        var currentHour = new Date().getHours();
        var currentMinute = new Date().getMinutes();
        var currentSecond = new Date().getSeconds();
        var location = "Packaging Hub";
        var productName;
        var productType;
        var company;
        var manufactureLocation;
        var manufactureCountry;

        const subscription = this.readService.read_Condition3().subscribe(data => {
            this.condition3 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    productName: e.payload.doc.data()['productName'],
                    productType: e.payload.doc.data()['productType'],
                    company: e.payload.doc.data()['company'],
                    manufactureLocation: e.payload.doc.data()['manufactureLocation'],
                    manufactureCompany: e.payload.doc.data()['manufactureCompany'],
                };
            });

            for (let i of this.condition3) {
                if (this.scannedData == i.code) {
                    found = true;
                    productName = i.productName;
                    productType = i.productType;
                    company = i.company;
                    manufactureLocation = i.manufactureLocation;
                    manufactureCountry = i.manufactureCountry;
                    break;
                }
                else {
                    found = false;
                }
            };

            if (found == true) {
                const subscription2 = this.readService.read_Condition4().subscribe(data => {
                    this.condition4 = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            code: e.payload.doc.data()['code']
                        };
                    });

                    for (let j of this.condition4) {
                        if (this.scannedData == j.code) {
                            foundOut = true;
                            break;
                        }
                        else {
                            foundOut = false;
                        }
                    };

                    if (foundOut == false) {
                        this.firestore.collection('parcelOutDoc').add({
                            code: this.scannedData,
                            location: location,
                            dateTime: new Date().toString(),
                            checkoutByEmail: this.email,
                            checkoutByUid: this.uid,
                            currentYear: currentYear,
                            currentMonth: currentMonth,
                            currentDay: currentDay,
                            currentHour: currentHour,
                            currentMinute: currentMinute,
                            currentSecond: currentSecond
                        });

                        alert('Product Name:' + productName + '\nProduct Type:' + productType + '\nManufacture Company:' + company + '\nDispatched Location:' + location);

                        subscription2.unsubscribe();
                        subscription.unsubscribe();
                    }
                    else {
                        alert("The product had been registered");
                        subscription2.unsubscribe();
                        subscription.unsubscribe();
                    }
                });
            }
            else {
                alert("The product has not been registered yet. Please REGISTER Product first before DISPATCH out.");
                subscription.unsubscribe();
            }
        });
    }

}
