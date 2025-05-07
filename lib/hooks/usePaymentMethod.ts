import {useState, useEffect} from "react";
import {
 collection,
 doc,
 getDocs,
 addDoc,
 updateDoc,
 deleteDoc,
 getFirestore,
} from "firebase/firestore";
import {app} from "@/lib/firebase/init";

const firestore = getFirestore(app);

export interface PaymentMethod {
 id: string;
 name: string;
 description: string;
 type: "bank" | "e-wallet" | "qris" | "other";
 accountName: string;
 accountNumber: string;
 logoUrl: string;
 isActive: boolean;
 fee: number;
 feeType: "fixed" | "percentage";
 instructions?: string;
 createdAt?: Date;
 updatedAt?: Date;
}

export const usePaymentMethods = () => {
 const [methods, setMethods] = useState<PaymentMethod[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const collectionName = "payment_methods";

 const fetchMethods = async () => {
  try {
   setLoading(true);
   const querySnapshot = await getDocs(collection(firestore, collectionName));
   const methodsData: PaymentMethod[] = [];

   querySnapshot.forEach((doc) => {
    const data = doc.data();
    methodsData.push({
     id: doc.id,
     name: data.name,
     description: data.description,
     type: data.type,
     accountName: data.accountName,
     accountNumber: data.accountNumber,
     logoUrl: data.logoUrl,
     isActive: data.isActive,
     fee: data.fee || 0,
     feeType: data.feeType || "fixed",
     instructions: data.instructions,
     createdAt: data.createdAt?.toDate(),
     updatedAt: data.updatedAt?.toDate(),
    });
   });

   setMethods(methodsData);
   setError(null);
  } catch (err) {
   console.error("Error fetching payment methods:", err);
   setError("Gagal memuat metode pembayaran");
  } finally {
   setLoading(false);
  }
 };

 const addMethod = async (methodData: Omit<PaymentMethod, "id">) => {
  try {
   setLoading(true);
   const newMethod = {
    ...methodData,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
   };

   await addDoc(collection(firestore, collectionName), newMethod);
   await fetchMethods();
   return {success: true};
  } catch (err) {
   console.error("Error adding payment method:", err);
   return {success: false, error: "Gagal menambahkan metode pembayaran"};
  } finally {
   setLoading(false);
  }
 };

 const updateMethod = async (
  id: string,
  methodData: Partial<PaymentMethod>
 ) => {
  try {
   setLoading(true);
   await updateDoc(doc(firestore, collectionName, id), {
    ...methodData,
    updatedAt: new Date(),
   });
   await fetchMethods();
   return {success: true};
  } catch (err) {
   console.error("Error updating payment method:", err);
   return {success: false, error: "Gagal memperbarui metode pembayaran"};
  } finally {
   setLoading(false);
  }
 };

 const toggleMethodStatus = async (id: string, isActive: boolean) => {
  return updateMethod(id, {isActive});
 };

 const deleteMethod = async (id: string) => {
  try {
   setLoading(true);
   await deleteDoc(doc(firestore, collectionName, id));
   await fetchMethods();
   return {success: true};
  } catch (err) {
   console.error("Error deleting payment method:", err);
   return {success: false, error: "Gagal menghapus metode pembayaran"};
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchMethods();
 }, []);

 return {
  methods,
  loading,
  error,
  addMethod,
  updateMethod,
  toggleMethodStatus,
  deleteMethod,
  refresh: fetchMethods,
 };
};
