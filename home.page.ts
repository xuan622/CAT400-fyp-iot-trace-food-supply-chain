import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ReadServiceService } from './../read-service.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('barCanvas', { static: true }) barCanvas: ElementRef;
    @ViewChild('barCanvas2', { static: true }) barCanvas2: ElementRef;

    columns: any;
    condition: any;
    condition2: any;
    temperature: string;
    humidity: string;
    location: string;
    scannedData: {};
    datetime: string;
    domElement: any;
    parcelData: any;
    barChart: Chart;
    lineChart: Chart;
    data1: any;
    data2: any;


    constructor(private readService: ReadServiceService, private qrScanner: QRScanner, private firestore: AngularFirestore, private router: Router) {}

    ngOnInit() {}

    redirectToPackagingHub() {
        this.router.navigate(['/packaging-hub']);
    }

    redirectToStorageHub() {
        this.router.navigate(['/storage-hub']);
    }

    redirectToCheckInPage() {
        this.router.navigate(['/login']);
    }
}
