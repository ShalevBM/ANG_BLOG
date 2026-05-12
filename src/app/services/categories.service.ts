import { Injectable } from '@angular/core'; // מייבא את Injectable כדי שאנגולר יזהה את המחלקה כשירות
import { AngularFirestore } from '@angular/fire/compat/firestore'; // מייבא את AngularFirestore כדי לעבוד מול Firestore
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs'; // מייבא את map כדי לעבד את הנתונים שחוזרים מ Firestore

@Injectable({
  // מתחיל הגדרה של שירות באנגולר
  providedIn: 'root', // הופך את השירות לזמין בכל האפליקציה
}) // סוגר את Injectable
export class CategoriesService {
  // מגדיר שירות בשם CategoriesService

  constructor(private afs: AngularFirestore ,private toastr:ToastrService) {} // מזריק את Firestore לתוך המשתנה afs

  saveData(data: any) {
    // פעולה שמקבלת מידע ושומרת אותו ב Firestore
    return this.afs // מחזיר את הפעולה כדי שאפשר יהיה להמתין לה מבחוץ
      .collection('categories') // בוחר את האוסף categories מתוך Firestore
      .add(data) // מוסיף מסמך חדש לאוסף
      .then((docRef) => {
        // פעולה שרצה אם השמירה הצליחה
        console.log(docRef);
        this.toastr.success('Category saved successfully!'); 
      }) // סוגר את then
      .catch((err) => {
        // פעולה שרצה אם הייתה שגיאה
        console.log(err); // מדפיס לקונסול את השגיאה
      }); // סוגר את catch ואת שרשרת הפעולות
  } // סוגר את הפעולה saveData

  loadData(): Observable<Object> {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        }),
      );
  }

  updateData(id: string, EditData: any){
    this.afs.doc(`categories/${id}`).update(EditData).then(docRef =>{
      this.toastr.success('Data Update Successfully ..!')
    });

  }
  deleteData(id: string) {
    // פעולה שמוחקת קטגוריה לפי id
    return this.afs // מחזיר את פעולת המחיקה
      .collection('categories') // בוחר את האוסף categories
      .doc(id) // בוחר את המסמך לפי id
      .delete(); // מוחק את המסמך
  } // סוגר את הפעולה deleteData

  getData() {
    // פעולה שמחזירה את הנתונים הגולמיים מ Firestore
    return this.afs // מחזיר את הגישה ל Firestore
      .collection('categories') // בוחר את האוסף categories
      .snapshotChanges(); // מחזיר שינויים בזמן אמת מהאוסף
  } // סוגר את הפעולה getData
} // סוגר את המחלקה