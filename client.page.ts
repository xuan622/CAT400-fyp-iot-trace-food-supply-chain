import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReadServiceService } from './../read-service.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

    scannedData: {};
    domElement: any;
    parcelData: any;
    barChart=[];
    lineChart=[];
    lineChart2 = [];
    lineChart3 = [];
    lineChart4 = [];
    condition: any;
    condition2: any;
    condition3: any;
    condition4: any;
    condition5: any;
    condition6: any;
    condition7: any;
    condition8: any;
    condition9: any;
    condition10: any;
    checkinemail: any;
    checkindateTime: any;
    checkinuid: any;
    checkoutemail: any;
    checkoutdateTime: any;
    checkoutuid: any;
    checkinStorageEmail: any;
    checkinStorageDateTime: any;
    checkinStorageUid: any;
    checkoutStorageEmail: any;
    checkoutStorageDateTime: any;
    checkoutStorageUid: any;
    foundCondition: any;
    foundOut: any;


    constructor(private qrScanner: QRScanner, private firestore: AngularFirestore, private router: Router, private readService: ReadServiceService) { }

    ngOnInit() {

        
        this.domElement = window.document.querySelector('ion-app') as HTMLElement;
        this.prepare();

        this.readService.read_Condition7().subscribe(data => {
            this.condition7 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    dateTime: e.payload.doc.data()['dateTime'],
                    location: e.payload.doc.data()['location'],
                    checkinByEmail: e.payload.doc.data()['checkinByEmail'],
                    checkinByUid: e.payload.doc.data()['checkinByUid'],
                    productName: e.payload.doc.data()['productName'],
                    productType: e.payload.doc.data()['productType'],
                    company: e.payload.doc.data()['company'],
                    manufactureLocation: e.payload.doc.data()['manufactureLocation'],
                    manufactureCountry: e.payload.doc.data()['manufactureCountry']
                }
            });
        });

        this.readService.read_Condition8().subscribe(data => {
            this.condition8 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    dateTime: e.payload.doc.data()['dateTime'],
                    location: e.payload.doc.data()['location'],
                    checkoutByEmail: e.payload.doc.data()['checkoutByEmail'],
                    checkoutByUid: e.payload.doc.data()['checkoutByUid']
                }
            });
        });

        this.readService.read_Condition9().subscribe(data => {
            this.condition9 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    dateTime: e.payload.doc.data()['dateTime'],
                    location: e.payload.doc.data()['location'],
                    checkinByEmail: e.payload.doc.data()['checkinByEmail'],
                    checkinByUid: e.payload.doc.data()['checkinByUid'],
                }
            });
        });

        this.readService.read_Condition10().subscribe(data => {
            this.condition10 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code'],
                    dateTime: e.payload.doc.data()['dateTime'],
                    location: e.payload.doc.data()['location'],
                    checkoutByEmail: e.payload.doc.data()['checkoutByEmail'],
                    checkoutByUid: e.payload.doc.data()['checkoutByUid']
                }
            });
        });
        
    }

    createChart() {
        var humidity = [];
        var humidity2 = []
        var datetime = [];
        var temperature = [];
        var temperature2 = [];
        var light = [];
        var email = [];
        var checkInYear;
        var checkInMonth;
        var checkInDay;
        var checkInHour;
        var checkInMinute;
        var checkInSecond;
        var checkOutYear;
        var checkOutMonth;
        var checkOutDay;
        var checkOutHour;
        var checkOutMinute;
        var checkOutSecond;
        var checkInStorageYear;
        var checkInStorageMonth;
        var checkInStorageDay;
        var checkInStorageHour;
        var checkInStorageMinute;
        var checkInStorageSecond;
        var checkOutStorageYear;
        var checkOutStorageMonth;
        var checkOutStorageDay;
        var checkOutStorageHour;
        var checkOutStorageMinute;
        var checkOutStorageSecond;

        const subscription = this.readService.read_Condition().subscribe(data => {
            this.condition = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    temperature: e.payload.doc.data()['temp'],
                    humidity: e.payload.doc.data()['humidity'],
                    location: e.payload.doc.data()['location'],
                    dateTime: e.payload.doc.data()['datetime'],
                    packageYear: e.payload.doc.data()['currentYear'],
                    packageMonth: e.payload.doc.data()['currentMonth'],
                    packageDay: e.payload.doc.data()['currentDay'],
                    packageHour: e.payload.doc.data()['currentHour'],
                    packageMinute: e.payload.doc.data()['currentMinute'],
                    packageSecond: e.payload.doc.data()['currentSecond']
                }
            });

            const subscription2 = this.readService.read_Condition3().subscribe(data => {
                this.condition3 = data.map(e => {
                    return {
                        id: e.payload.doc.id,
                        code: e.payload.doc.data()['code'],
                        dateTime: e.payload.doc.data()['dateTime'],
                        location: e.payload.doc.data()['location'],
                        checkinByEmail: e.payload.doc.data()['checkinByEmail'],
                        checkinByUid: e.payload.doc.data()['checkinByUid'],
                        productName: e.payload.doc.data()['productName'],
                        productType: e.payload.doc.data()['productType'],
                        company: e.payload.doc.data()['company'],
                        manufactureLocation: e.payload.doc.data()['manufactureLocation'],
                        manufactureCountry: e.payload.doc.data()['manufactureCountry'],
                        checkinYear: e.payload.doc.data()['currentYear'],
                        checkinMonth: e.payload.doc.data()['currentMonth'],
                        checkinDay: e.payload.doc.data()['currentDay'],
                        checkinHour: e.payload.doc.data()['currentHour'],
                        checkinMinute: e.payload.doc.data()['currentMinute'],
                        checkinSecond: e.payload.doc.data()['currentSecond']
                    }
                });

                const subscription3 = this.readService.read_Condition4().subscribe(data => {
                    this.condition4 = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            code: e.payload.doc.data()['code'],
                            dateTime: e.payload.doc.data()['dateTime'],
                            location: e.payload.doc.data()['location'],
                            checkoutByEmail: e.payload.doc.data()['checkoutByEmail'],
                            checkoutByUid: e.payload.doc.data()['checkoutByUid'],
                            checkoutYear: e.payload.doc.data()['currentYear'],
                            checkoutMonth: e.payload.doc.data()['currentMonth'],
                            checkoutDay: e.payload.doc.data()['currentDay'],
                            checkoutHour: e.payload.doc.data()['currentHour'],
                            checkoutMinute: e.payload.doc.data()['currentMinute'],
                            checkoutSecond: e.payload.doc.data()['currentSecond']
                        }
                    });

                    for (let i of this.condition3) {
                        if (this.scannedData == i.code) {
                            checkInYear = i.checkinYear;
                            checkInMonth = i.checkinMonth;
                            checkInDay = i.checkinDay;
                            checkInHour = i.checkinHour;
                            checkInMinute = i.checkinMinute;
                            checkInSecond = i.checkinSecond;
                            this.checkinemail = i.email;
                            this.checkinuid = i.uid;
                            this.checkindateTime = i.dateTime;
                        }
                    };

                    for (let j of this.condition4) {
                        if (this.scannedData == j.code) {
                            checkOutYear = j.checkoutYear;
                            checkOutMonth = j.checkoutMonth;
                            checkOutDay = j.checkoutDay;
                            checkOutHour = j.checkoutHour;
                            checkOutMinute = j.checkoutMinute;
                            checkOutSecond = j.checkoutSecond;
                            this.checkoutemail = j.email;
                            this.checkoutuid = j.uid;
                            this.checkoutdateTime = j.dateTime;
                        }
                    };

                    for (let k of this.condition) {
                        if (k.packageYear > checkInYear && k.packageYear < checkOutYear) {
                            humidity.push(k.humidity);
                            temperature.push(k.temperature);
                        }
                        else if (k.packageYear == checkInYear && k.packageYear == checkOutYear) {
                            if (k.packageMonth > checkInMonth && k.packageMonth < checkOutMonth) {
                                humidity.push(k.humidity);
                                temperature.push(k.temperature);
                            }
                            else if (k.packageMonth == checkInMonth && k.packageMonth == checkOutMonth) {
                                if (k.packageDay > checkInDay && k.packageDay < checkOutDay) {
                                    humidity.push(k.humidity);
                                    temperature.push(k.temperature);
                                }
                                else if (k.packageDay == checkInDay && k.packageDay == checkOutDay) {
                                    if (k.packageHour > checkInHour && k.packageHour < checkOutHour) {
                                        humidity.push(k.humidity);
                                        temperature.push(k.temperature);
                                    }
                                    else if (k.packageHour == checkInHour && k.packageHour == checkOutHour) {
                                        if (k.packageMinute > checkInMinute && k.packageMinute < checkOutMinute) {
                                            humidity.push(k.humidity);
                                            temperature.push(k.temperature);
                                        }
                                        else if (k.packageMinute == checkInMinute && k.packageMinute == checkOutMinute) {
                                            if (k.packageSecond >= checkInSecond && k.packageSecond <= checkOutSecond) {
                                                humidity.push(k.humidity);
                                                temperature.push(k.temperature);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };

                    this.barChart = new Chart('barCanvas', {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: 'Humidity',
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

                    this.lineChart = new Chart('barCanvas2', {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: 'Temperature',
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

                    subscription3.unsubscribe();
                    subscription2.unsubscribe();
                    subscription.unsubscribe();
                }); 

            });
        });

        const subscription4 = this.readService.read_Condition2().subscribe(data => {
            this.condition2 = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    temperature: e.payload.doc.data()['temp'],
                    humidity: e.payload.doc.data()['humidity'],
                    location: e.payload.doc.data()['location'],
                    dateTime: e.payload.doc.data()['datetime'],
                    light: e.payload.doc.data()['lightCondition'],
                    storageYear: e.payload.doc.data()['currentYear'],
                    storageMonth: e.payload.doc.data()['currentMonth'],
                    storageDay: e.payload.doc.data()['currentDay'],
                    storageHour: e.payload.doc.data()['currentHour'],
                    storageMinute: e.payload.doc.data()['currentMinute'],
                    storageSecond: e.payload.doc.data()['currentSecond']
                }
            });

            const subscription5 = this.readService.read_Condition5().subscribe(data => {
                this.condition5 = data.map(e => {
                    return {
                        id: e.payload.doc.id,
                        code: e.payload.doc.data()['code'],
                        dateTime: e.payload.doc.data()['dateTime'],
                        location: e.payload.doc.data()['location'],
                        checkinByEmail: e.payload.doc.data()['checkinByEmail'],
                        checkinByUid: e.payload.doc.data()['checkinByUid'],
                        productName: e.payload.doc.data()['productName'],
                        productType: e.payload.doc.data()['productType'],
                        company: e.payload.doc.data()['company'],
                        manufactureLocation: e.payload.doc.data()['manufactureLocation'],
                        manufactureCountry: e.payload.doc.data()['manufactureCountry'],
                        checkinYear: e.payload.doc.data()['currentYear'],
                        checkinMonth: e.payload.doc.data()['currentMonth'],
                        checkinDay: e.payload.doc.data()['currentDay'],
                        checkinHour: e.payload.doc.data()['currentHour'],
                        checkinMinute: e.payload.doc.data()['currentMinute'],
                        checkinSecond: e.payload.doc.data()['currentSecond']
                    }
                });

                const subscription6 = this.readService.read_Condition6().subscribe(data => {
                    this.condition6 = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            code: e.payload.doc.data()['code'],
                            dateTime: e.payload.doc.data()['dateTime'],
                            location: e.payload.doc.data()['location'],
                            checkoutByEmail: e.payload.doc.data()['checkoutByEmail'],
                            checkoutByUid: e.payload.doc.data()['checkoutByUid'],
                            checkoutYear: e.payload.doc.data()['currentYear'],
                            checkoutMonth: e.payload.doc.data()['currentMonth'],
                            checkoutDay: e.payload.doc.data()['currentDay'],
                            checkoutHour: e.payload.doc.data()['currentHour'],
                            checkoutMinute: e.payload.doc.data()['currentMinute'],
                            checkoutSecond: e.payload.doc.data()['currentSecond']
                        }
                    });

                    for (let i of this.condition5) {
                        if (this.scannedData == i.code) {
                            checkInStorageYear = i.checkinYear;
                            checkInStorageMonth = i.checkinMonth;
                            checkInStorageDay = i.checkinDay;
                            checkInStorageHour = i.checkinHour;
                            checkInStorageMinute = i.checkinMinute;
                            checkInStorageSecond = i.checkinSecond;
                            this.checkinStorageEmail = i.email;
                            this.checkinStorageUid = i.uid;
                            this.checkinStorageDateTime = i.dateTime;
                        }
                    };

                    for (let j of this.condition6) {
                        if (this.scannedData == j.code) {
                            checkOutStorageYear = j.checkoutYear;
                            checkOutStorageMonth = j.checkoutMonth;
                            checkOutStorageDay = j.checkoutDay;
                            checkOutStorageHour = j.checkoutHour;
                            checkOutStorageMinute = j.checkoutMinute;
                            checkOutStorageSecond = j.checkoutSecond;
                            this.checkoutStorageEmail = j.email;
                            this.checkoutStorageUid = j.uid;
                            this.checkoutStorageDateTime = j.dateTime;
                        }
                    };

                    for (let k of this.condition2) {
                        if (k.storageYear > checkInStorageYear && k.storageYear < checkOutStorageYear) {
                            humidity2.push(k.humidity);
                            temperature2.push(k.temperature);
                            light.push(k.light);
                        }
                        else if (k.storageYear == checkInStorageYear && k.storageYear == checkOutStorageYear) {
                            if (k.storageMonth > checkInStorageMonth && k.storageMonth < checkOutStorageMonth) {
                                humidity2.push(k.humidity);
                                temperature2.push(k.temperature);
                                light.push(k.light);
                            }
                            else if (k.storageMonth == checkInStorageMonth && k.storageMonth == checkOutStorageMonth) {
                                if (k.storageDay > checkInStorageDay && k.storageDay < checkOutStorageDay) {
                                    humidity2.push(k.humidity);
                                    temperature2.push(k.temperature);
                                    light.push(k.light);
                                }
                                else if (k.storageDay == checkInStorageDay && k.storageDay == checkOutStorageDay) {
                                    if (k.storageHour > checkInStorageHour && k.storageHour < checkOutStorageHour) {
                                        humidity2.push(k.humidity);
                                        temperature2.push(k.temperature);
                                        light.push(k.light);
                                    }
                                    else if (k.storageHour == checkInStorageHour && k.storageHour == checkOutStorageHour) {
                                        if (k.storageMinute > checkInStorageMinute && k.storageMinute < checkOutStorageMinute) {
                                            humidity2.push(k.humidity);
                                            temperature2.push(k.temperature);
                                            light.push(k.light);
                                        }
                                        else if (k.storageMinute == checkInStorageMinute && k.storageMinute == checkOutStorageMinute) {
                                            if (k.storageSecond >= checkInStorageSecond && k.storageSecond <= checkOutStorageSecond) {
                                                humidity2.push(k.humidity);
                                                temperature2.push(k.temperature);
                                                light.push(k.light);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };

                    this.lineChart2 = new Chart('barCanvas3', {
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
                                data: humidity2,
                                spanGaps: false
                            }]
                        }
                    });

                    this.lineChart3 = new Chart('barCanvas4', {
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

                    this.lineChart4 = new Chart('barCanvas5', {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: 'Light Intensity',
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

                    subscription6.unsubscribe();
                    subscription5.unsubscribe();
                    subscription4.unsubscribe();
                });

            });
        });
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
                scanSub.unsubscribe();
                this.onScan(text);
            });
    }

    hideCamera() {
        this.qrScanner.hide();
        this.domElement.classList.remove('has-camera');
    }

    onScan(text: string) {
        this.hideCamera();
        console.log('Scanned:', text);
        alert('Scanned:' + text);
        this.scannedData = text;
        console.log(this.scannedData);
        const subscription1 = this.readService.read_Condition6().subscribe(data => {
            this.foundCondition = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    code: e.payload.doc.data()['code']
                }
            });

            for (let a of this.foundCondition) {
                if (this.scannedData == a.code) {
                    this.foundOut = true;
                    break;
                }
                else {
                    this.foundOut = false;
                }
            };

            if (this.foundOut == true) {
                this.createChart();
                subscription1.unsubscribe();
            }
            else {
                alert("The product has not gone through the previous stage or the product does not exist");
                subscription1.unsubscribe();
            }
        });       
    }

    redirectToHomePage() {
        this.router.navigate(['/home']);
    }

}
