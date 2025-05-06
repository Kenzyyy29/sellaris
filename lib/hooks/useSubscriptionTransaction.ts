import {useState, useEffect} from "react";
import {
 collection,
 doc,
 getDocs,
 updateDoc,
 query,
 where,
 getFirestore,
} from "firebase/firestore";
import {app} from "@/lib/firebase/init";

const firestore = getFirestore(app);

export interface SubscriptionTransaction {
 id?: string;
 userId: string;
 packageId: string;
 packageName: string;
 amount: number;
 status: "pending" | "completed" | "failed";
 paymentMethod: string;
 paymentProof?: string;
 createdAt?: Date;
 completedAt?: Date;
 userEmail?: string;
 userName?: string;
}

export const useSubscriptionTransactions = () => {
 const [transactions, setTransactions] = useState<SubscriptionTransaction[]>(
  []
 );
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const collectionName = "subscription_transactions";

 const fetchTransactions = async (
  status?: "pending" | "completed" | "failed"
 ) => {
  try {
   setLoading(true);
   let q = query(collection(firestore, collectionName));

   if (status) {
    q = query(q, where("status", "==", status));
   }

   const querySnapshot = await getDocs(q);
   const transactionsData: SubscriptionTransaction[] = [];

   querySnapshot.forEach((doc) => {
    const data = doc.data();
    transactionsData.push({
     id: doc.id,
     userId: data.userId,
     packageId: data.packageId,
     packageName: data.packageName,
     amount: data.amount,
     status: data.status,
     paymentMethod: data.paymentMethod,
     paymentProof: data.paymentProof,
     userEmail: data.userEmail,
     userName: data.userName,
     createdAt: data.createdAt?.toDate(),
     completedAt: data.completedAt?.toDate(),
    });
   });

   setTransactions(transactionsData);
   setError(null);
  } catch (err) {
   console.error("Error fetching transactions:", err);
   setError("Failed to fetch transactions");
  } finally {
   setLoading(false);
  }
 };

 const confirmTransaction = async (id: string) => {
  try {
   setLoading(true);
   await updateDoc(doc(firestore, collectionName, id), {
    status: "completed",
    completedAt: new Date(),
   });
   await fetchTransactions();
   return {success: true};
  } catch (err) {
   console.error("Error confirming transaction:", err);
   return {success: false, error: "Failed to confirm transaction"};
  } finally {
   setLoading(false);
  }
 };

 const rejectTransaction = async (id: string) => {
  try {
   setLoading(true);
   await updateDoc(doc(firestore, collectionName, id), {
    status: "failed",
    completedAt: new Date(),
   });
   await fetchTransactions();
   return {success: true};
  } catch (err) {
   console.error("Error rejecting transaction:", err);
   return {success: false, error: "Failed to reject transaction"};
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchTransactions();
 }, []);

 return {
  transactions,
  loading,
  error,
  confirmTransaction,
  rejectTransaction,
  fetchTransactions,
 };
};
