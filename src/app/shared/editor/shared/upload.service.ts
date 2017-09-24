import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { storage } from 'firebase';

@Injectable()
export class UploadService {
  private basePath = '/uploads';
  storageRef: storage.Reference;

  constructor(private firebaseApp: FirebaseApp) {
    this.storageRef = firebaseApp.storage().ref();
  }

  pushUpload(upload: Upload) {
    const uploadTask = this.storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        const snap = snapshot as storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        console.log('Successfully Uploaded!');
        // this.saveFileData(upload)
        return undefined;
      }
    );
  }
}
