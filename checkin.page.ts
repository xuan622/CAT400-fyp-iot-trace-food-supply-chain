import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ReadServiceService } from './../read-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { locale } from 'moment';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {

    scannedData: string;
    domElement: any;
    parcelData: any;
    user: any;
    email: any;
    uid: any;
    condition3: any;

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
        alert('Sucessful Scanned:'+ text);
        this.scannedData = text;
        console.log(this.scannedData);
        this.checkIn();
        this.redirectToPackagingHub();
    }

    redirectToPackagingHub() {
        this.router.navigate(['/packaging-hub']);
    }

    checkIn() {
        var productName;
        var productType;
        var company;
        var manufactureLocation;
        var manufactureCountry;
        var location = "Package Hub";
        var dateTime = new Date().toString();
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var currentDay = new Date().getDate();
        var currentHour = new Date().getHours();
        var currentMinute = new Date().getMinutes();
        var currentSecond = new Date().getSeconds();
        var found = false;

        if (this.scannedData.includes("FB")) {
            productName = "ABC Instant Noodle";
            productType = "Dry Food";
            company = "ABC Food Industrial Company";
            manufactureLocation = "Selangor";
            manufactureCountry = "Malaysia";

        }

        const subscription = this.readService.read_Condition3().subscribe(data => {
            this.condition3 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code']
                };
            });

            for (let i of this.condition3) {
                if (this.scannedData == i.code) {
                    found = true;
                    break;
                }
                else {
                    found = false;
                }
            };

            if (found == false) {

                this.firestore.collection('parcelDoc').add({
                    code: this.scannedData,
                    location: location,
                    dateTime: dateTime,
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
                subscription.unsubscribe();
            }
            else {
                alert("This product has been registered");
                subscription.unsubscribe();
            }
        });
    }

}
