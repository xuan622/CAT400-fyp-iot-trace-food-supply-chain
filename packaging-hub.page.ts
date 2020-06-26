import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReadServiceService } from './../read-service.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-packaging-hub',
  templateUrl: './packaging-hub.page.html',
  styleUrls: ['./packaging-hub.page.scss'],
})
export class PackagingHubPage implements OnInit {

    @ViewChild('barCanvas', { static: true }) barCanvas: ElementRef;
    @ViewChild('barCanvas2', { static: true }) barCanvas2: ElementRef;

    condition: any;
    temperature: string;
    humidity: string;
    location: string;
    scannedData: {};
    datetime: string;
    domElement: any;
    parcelData: any;
    humiditySensor: any;
    temperatureSensor: any;
    barChart: Chart;
    lineChart: Chart;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    warningTemp = [];
    warningHumidity = [];
    warningTempTime = [];
    warningHumidityTime = [];
    warningTempShow: any;

    constructor(private readService: ReadServiceService, private qrScanner: QRScanner, private firestore: AngularFirestore, private router: Router) { }

    ngOnInit() {
        var humidity = [];
        var datetime = [];
        var temperature = [];
        this.minTemperature = 23;
        this.maxTemperature = 26;
        this.minHumidity = 50;
        this.maxHumidity = 60;

        this.readService.read_Condition().subscribe(data => {
            this.condition = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    Temperature: e.payload.doc.data()['temp'],
                    Humidity: e.payload.doc.data()['humidity'],
                    Location: e.payload.doc.data()['location'],
                    DateTime: e.payload.doc.data()['datetime'],
                    TemperatureSensorStatus: e.payload.doc.data()['temperatureSensorStatus'],
                    HumiditySensorStatus: e.payload.doc.data()['humiditySensorStatus']
                };
            });

            for (let i of this.condition) {
                humidity.push(i.Humidity);
                datetime.push(i.DateTime);
                temperature.push(i.Temperature);
                this.humiditySensor = i.HumiditySensorStatus;
                this.temperatureSensor = i.TemperatureSensorStatus;               
            }

            this.barChart = new Chart(this.barCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Humidity (%)',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: humidity,
                        spanGaps: false
                    }]
                }
            });

            this.lineChart = new Chart(this.barCanvas2.nativeElement, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperature (Celsius)',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: temperature,
                        spanGaps: false
                    }]
                }
            });
        });
    }
}
