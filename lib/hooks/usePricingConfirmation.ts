import {useState, useEffect} from "react";
import {
 doc,
 getDoc,
 collection,
 getDocs,
 getFirestore,
} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {SubscriptionPackage} from "./useSubscriptionPackage";
import {PaymentMethod} from "./usePaymentMethod";

const firestore = getFirestore(app);

export const usePricingConfirmation = (packageId: string) => {
 const [selectedPackage, setSelectedPackage] =
  useState<SubscriptionPackage | null>(null);
 const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchData = async () => {
  try {
   setLoading(true);
   setError(null);

   // Fetch package
   if (packageId) {
    const packageDoc = await getDoc(
     doc(firestore, "subscription_packages", packageId)
    );
    if (packageDoc.exists()) {
     const packageData = packageDoc.data();
     setSelectedPackage({
      id: packageDoc.id,
      ...packageData,
      createdAt: packageData.createdAt?.toDate(),
      updatedAt: packageData.updatedAt?.toDate(),
     } as SubscriptionPackage);
    } else {
     setError("Package not found");
    }
   }

   // Fetch payment methods
   const paymentMethodsSnapshot = await getDocs(
    collection(firestore, "payment_methods")
   );
   const methods: PaymentMethod[] = [];
   paymentMethodsSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.isActive) {
     methods.push({
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
     } as PaymentMethod);
    }
   });
   setPaymentMethods(methods);
  } catch (err) {
   console.error("Error fetching confirmation data:", err);
   setError("Failed to load confirmation data");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchData();
 }, [packageId]);

 return {
  selectedPackage,
  paymentMethods,
  loading,
  error,
  refresh: fetchData,
 };
};
