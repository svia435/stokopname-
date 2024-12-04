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
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRlnLBhUHGOF7Lfg9iy_SbfK6coM_7f1U",
  authDomain: "insan-cemerlang-6640c.firebaseapp.com",
  projectId: "insan-cemerlang-6640c",
  storageBucket: "insan-cemerlang-6640c.appspot.com",
  messagingSenderId: "917464283158",
  appId: "1:917464283158:web:3a6179cd71818d68f6dd37"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// fungsi untuk mengambil data dari database dan menampilkan 
export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "stokopname");
  const kueri = query(refDokumen, orderBy("barangreturn"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      sisa: dok.data().sisa,
      barangreturn: dok.data().barangreturn,
      pendapatan: dok.data().pendapatan,
    });
  });



  return hasil;
}
//######################################

//fungsi untuk menambahkan data pembeli
export async function tambahPembeli(sisa, barangreturn, pendapatan) {
  try {
    const dokRef = await addDoc(collection(db, 'stokopname'), {
      sisa: sisa,
      barangreturn: barangreturn,
      pendapatan: pendapatan
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}


export async function hapus(docId) {
  await deleteDoc(doc(db, "stokopname", docId));
}

//######################################
export async function ubahPembeli(sisa, barangreturn, pendapatan) {
  await updateDoc(doc(db, "stokopname", docId), {
    sisa: sisa,
    barangreturn: barangreturn,
    pendapatan: pendapatan
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "stokopname", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

