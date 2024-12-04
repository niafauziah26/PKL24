import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD_N_5Tjv9zh_eJyfTXxUOICM2XX86--IM",
  authDomain: "datasiswa-aebb3.firebaseapp.com",
  projectId: "datasiswa-aebb3",
  storageBucket: "datasiswa-aebb3.appspot.com",
  messagingSenderId: "1049128187878",
  appId: "1:1049128187878:web:e1879710f4b5252a68c827",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarCustomer() {
  const refDokumen = collection(db, "customer");
  const kuery = query(refDokumen, orderBy("nama"));
  const cuplikanKuery = await getDocs(kuery);
  
  let hasil = [];
  cuplikanKuery.forEach((dok) => {
    hasil.push({ 
      id: dok.id,
      nama: dok.data().nama,
      kg: dok.data().kg, 
      note: dok.data().note, 
      harga: dok.data().harga,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahCustomer(nama, kg, note, harga) {
  try {
    const dokref = await addDoc(collection(db, 'customer'), {
      nama: nama,
      kg: kg,
      note: note, 
      harga: harga  
    });
    console.log('Berhasil menambah customer' + dokref.id);
  } catch (e) { 
    console.log('Gagal menambah customer ' + e);
  }
}