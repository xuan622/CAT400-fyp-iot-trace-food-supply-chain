# CAT400 NS192012 IoT-based Traceability of Food Supply Chain
It is a final year project with the title IoT-based Traceability of Food Supply Chain
## Description
This project includes three modules which are Sensor module, Mobile Application module and database module. 
Sensor module is used to collect the sensor data and upload it to database.
Mobile application module is used to present the sensor data in a visual format and allow user to register and dispatch the food product by using the QR-scanner function.
Database module is used to store the sensor data and the food product information.
## Getting Started
### Prerequisites
These frameworks and tools need to be installed before deploy to the devices
#### Raspberry Pi
- Python
- Adafruit Library
- Google Firebase
First install Python on Raspberry Pi
```
sudo apt install python3-pip
```
Get Adafruit Library
```
git clone https://github.com/adafruit/Adafruit_Python_DHT.git && cd Adafruit_Python_DHT
```
Install Google Firebase
```
sudo pip3 install python-firebase
```
#### Mobile Application
- Ionic
- Chart.js
- QR-scanner plugin
- Google Firestore library
Install Ionic
```
npm install -g @ionic/cli
```
Install Ionic QR Scanner plugin
```
ionic cordova plugin add cordova-plugin-qrscanner
npm install @ionic-native/qrscanner
```
Install Chart.js plugin
```
npm install chart.js --save
```
Install Google Firestore
```
npm install angularfire2 firebase --save
```
## Testing
### Sensors
The sensor module can be tested by running the python script in Raspberry Pi.
1. Open Terminal in Raspberry Pi
2. Change directory to the sensor python script
3. Run the python script on the terminal
Example:
```
python3 humidity.py
```
### Mobile Application
The mobile application can be tested only if it had been built and deployed to a virtual platform or mobile device
## Deployment
### Mobile Application
In this manual, the application will be built and deployed on a mobile device
1. Open command prompt on local machine and change directory to the project file
2. Run Ionic command line to build and run the application
```
ionic cordova run android -1
```
## Mobile Application GUIDELINES for different types of users
The mobile application is designed for the hub operators and retailers or consumer of this project so there will be some guidelines for using this application
#### Food Packaging Stage/Storage Stage Operators
1. Enter credential keys to sign in to the system
2. Choose the working place (Packaging Hub / Storage Hub)
3. To register item, Press the Register Item button
4. Scan the QR code of the Food Product
5. To dispatch item, Press the Dispatch Item button
6. Scan the QR code of the Food Product
7. Item **CANNOT** be **DISPATCHED** if it is not **REGISTER** when arrived on the facility
#### Retailer / Customer
1. Press the Retailer/Customer button without credential keys needed
2. Scan QR code of Food Product
3. Food product information will be displayed if the product has gone through all the food supply chain's stages in correct sequence
4. Alert message will be displayed if the product does not go through all stages in correct sequence
## Author
- Khor Ee Xuan
