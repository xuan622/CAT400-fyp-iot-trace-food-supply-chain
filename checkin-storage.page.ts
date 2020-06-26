import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ReadServiceService } from './../read-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-checkin-storage',
  templateUrl: './checkin-storage.page.html',
  styleUrls: ['./checkin-storage.page.scss'],
})
export class CheckinStoragePage implements OnInit {

    scannedData: string;
    domElement: any;
    parcelData: any;
    user: any;
    email: any;
    uid: any;
    condition4: any;
    condition5: any;

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
        alert('Sucessful Scanned:' + text);
        this.scannedData = text;
        console.log(this.scannedData);
        this.checkIn();
        this.redirectToStorageHub();
    }

    redirectToStorageHub() {
        this.router.navigate(['/storage-hub']);
    }

    checkIn() {
        var productName;
        var productType;
        var company;
        var manufactureLocation;
        var manufactureCountry;
        var location = "Storage Hub";
        var dateTime = new Date().toString();
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var currentDay = new Date().getDate();
        var currentHour = new Date().getHours();
        var currentMinute = new Date().getMinutes();
        var currentSecond = new Date().getSeconds();
        var foundOutPackage = false;
        var foundInStorage = false;

        if (this.scannedData.includes("FB")) {
            productName = "ABC Instant Noodle";
            productType = "Dry Food";
            company = "ABC Food Industrial Company";
            manufactureLocation = "Selangor";
            manufactureCountry = "Malaysia";

        }

        const subscription = this.readService.read_Condition4().subscribe(data => {
            this.condition4 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code']
                };
            });

            for (let i of this.condition4) {
                if (this.scannedData == i.code) {
                    foundOutPackage = true;
                    break;
                }
                else {
                    foundOutPackage = false;
                }
            };

            if (foundOutPackage == true) {
                const subscription2 = this.readService.read_Condition5().subscribe(data => {
                    this.condition5 = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            code: e.payload.doc.data()['code']
                        };
                    });

                    for (let j of this.condition5) {
                        if (this.scannedData == j.code) {
                            foundInStorage = true;
                            break;
                        }
                        else {
                            foundInStorage = false;
                        }
                    };

                    if (foundInStorage == false) {
                        this.firestore.collection('parcelStorageDoc').add({
                            code: this.scannedData,
                            location: location,
                            dateTime: new Date().toString(),
                            checkinByEmail: this.email,
                            checkinByUid: this.uid,
                            productName: productName,
                            productType: productType,
                            company: company,
                            manufactureLocation: manufactureLocation,
                            manufactureCountry: manufactureCountry,
                            currentYear: currentYear,
                            currentMonth: currentMonth,
                            currentDay: currentDay,
                            currentHour: currentHour,
                            currentMinute: currentMinute,
                            currentSecond: currentSecond
                        });

                        alert('Product Name:' + productName + '\nProduct Type:' + productType + '\nManufacture Company:' + company + '\nRegistered Location:' + location + '\nRegistered Time:' + dateTime);
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
                alert("The product does not have record in previous stage. Please REGISTER the product at previous stage before DISPATCH out.");
                subscription.unsubscribe();
            }
        });
    }

}
