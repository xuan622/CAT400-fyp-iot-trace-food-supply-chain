import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReadServiceService {

    constructor(private firestore: AngularFirestore) { }

    read_Condition() {
        return this.firestore.collection('warehouseCondition').snapshotChanges();
    }

    read_Condition2() {
        return this.firestore.collection('warehouseCondition2').snapshotChanges();
    }

    read_Condition3() {
        return this.firestore.collection('parcelDoc').snapshotChanges();
    }

    read_Condition4() {
        return this.firestore.collection('parcelOutDoc').snapshotChanges();
    }

    read_Condition5() {
        return this.firestore.collection('parcelStorageDoc').snapshotChanges();
    }

    read_Condition6() {
        return this.firestore.collection('parcelOutStorageDoc').snapshotChanges();
    }

    read_Condition7() {
        return this.firestore.collection('parcelDoc').snapshotChanges();
    }

    read_Condition8() {
        return this.firestore.collection('parcelOutDoc').snapshotChanges();
    }

    read_Condition9() {
        return this.firestore.collection('parcelStorageDoc').snapshotChanges();
    }

    read_Condition10() {
        return this.firestore.collection('parcelOutStorageDoc').snapshotChanges();
    }
}
