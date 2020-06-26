import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ReadServiceService } from './../read-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-checkout-storage',
  templateUrl: './checkout-storage.page.html',
  styleUrls: ['./checkout-storage.page.scss'],
})
export class CheckoutStoragePage implements OnInit {

    scannedData: string;
    domElement: any;
    parcelData: any;
    user: any;
    email: any;
    uid: any;
    condition5: any;
    condition6: any;

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
        this.redirectToStorageHub();
    }

    redirectToStorageHub() {
        this.router.navigate(['/storage-hub']);
    }

    checkOut() {

        var foundInStorage = false;
        var foundOutStorage = false;
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var currentDay = new Date().getDate();
        var currentHour = new Date().getHours();
        var currentMinute = new Date().getMinutes();
        var currentSecond = new Date().getSeconds();
        var location = "Storage Hub";
        var productName;
        var productType;
        var company;
        var manufactureLocation;
        var manufactureCountry;

        const subscription = this.readService.read_Condition5().subscribe(data => {
            this.condition5 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    productName: e.payload.doc.data()['productName'],
                    productType: e.payload.doc.data()['productType'],
                    company: e.payload.doc.data()['company'],
                    manufactureLocation: e.payload.doc.data()['manufactureLocation'],
                    manufactureCompany: e.payload.doc.data()['manufactureCompany']
                }
            });

            for (let i of this.condition5) {
                if (this.scannedData == i.code) {
                    foundInStorage = true;
                    productName = i.productName;
                    productType = i.productType;
                    company = i.company;
                    manufactureLocation = i.manufactureLocation;
                    manufactureCountry = i.manufactureCountry;
                    break;
                }
                else {
                    foundInStorage = false;
                }
            };

            if (foundInStorage == true) {
                const subscription2 = this.readService.read_Condition6().subscribe(data => {
                    this.condition6 = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            code: e.payload.doc.data()['code']
                        };
                    });

                    for (let j of this.condition6) {
                        if (this.scannedData == j.code) {
                            foundOutStorage = true;
                            break;
                        }
                        else {
                            foundOutStorage = false;
                        }
                    };

                    if (foundOutStorage == false) {
                        this.firestore.collection('parcelOutStorageDoc').add({
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
