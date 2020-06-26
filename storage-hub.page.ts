import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReadServiceService } from './../read-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-storage-hub',
  templateUrl: './storage-hub.page.html',
  styleUrls: ['./storage-hub.page.scss'],
})
export class StorageHubPage implements OnInit {

    @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;
    @ViewChild('lineCanvas2', { static: true }) lineCanvas2: ElementRef;
    @ViewChild('lineCanvas3', { static: true }) lineCanvas3: ElementRef;

    condition2: any;
    temperature: string;
    humidity: string;
    location: string;
    scannedData: {};
    datetime: string;
    domElement: any;
    parcelData: any;
    humiditySensor: any;
    temperatureSensor: any;
    lightSensor: any;
    lineChart: Chart;
    lineChart2: Chart;
    lineChart3: Chart;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;

    constructor(private readService: ReadServiceService, private firestore: AngularFirestore, private router: Router) { }

    ngOnInit() {

        var humidity = [];
        var datetime = [];
        var temperature = [];
        var light = [];

        this.minTemperature = 18;
        this.maxTemperature = 24;
        this.minHumidity = 50;
        this.maxHumidity = 55;

        this.readService.read_Condition2().subscribe(data => {
            this.condition2 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    Temperature: e.payload.doc.data()['temp'],
                    Humidity: e.payload.doc.data()['humidity'],
                    Location: e.payload.doc.data()['location'],
                    DateTime: e.payload.doc.data()['datetime'],
                    Light: e.payload.doc.data()['lightCondition'],
                    tempSensorStatus: e.payload.doc.data()['tempSensorStatus'],
                    humidSensorStatus: e.payload.doc.data()['humidSensorStatus'],
                    lightSensorStatus: e.payload.doc.data()['lightSensorStatus']
                };
            });

            for (let i of this.condition2) {
                humidity.push(i.Humidity);
                datetime.push(i.DateTime);
                temperature.push(i.Temperature);
                light.push(i.Light);
                this.humiditySensor = i.humidSensorStatus;
                this.temperatureSensor = i.tempSensorStatus;
                this.lightSensor = i.lightSensorStatus;
            }

            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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

            this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperature (Celcius)',
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

            this.lineChart3 = new Chart(this.lineCanvas3.nativeElement, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Light Intensity (Index)',
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
                        data: light,
                        spanGaps: false
                    }]
                }
            });
        });
  }

}
