"use client"
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

export interface SubscriptionPackage {
 id?: string;
 name: string;
 description: string;
 price: number;
 duration: number; 
 durationType: "monthly" | "yearly";
 isRecommended: boolean;
 features: string[];
 isActive: boolean;
 createdAt?: Date;
 updatedAt?: Date;
}

export const useSubscriptionPackages = () => {
 const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const collectionName = "subscription_packages";

 const fetchPackages = async () => {
  try {
   setLoading(true);
   const querySnapshot = await getDocs(collection(firestore, collectionName));
   const packagesData: SubscriptionPackage[] = [];

   querySnapshot.forEach((doc) => {
    const data = doc.data();
    packagesData.push({
     id: doc.id,
     name: data.name,
     description: data.description,
     price: data.price,
     duration: data.duration,
     durationType: data.durationType || "monthly",
     isRecommended: data.isRecommended,
     features: data.features || [],
     isActive: data.isActive,
     createdAt: data.createdAt?.toDate(),
     updatedAt: data.updatedAt?.toDate(),
    });
   });

   setPackages(packagesData);
   setError(null);
  } catch (err) {
   console.error("Error fetching packages:", err);
   setError("Failed to fetch packages");
  } finally {
   setLoading(false);
  }
 };

 const addPackage = async (packageData: Omit<SubscriptionPackage, "id">) => {
  try {
   setLoading(true);
   const newPackage = {
    ...packageData,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
   };

   await addDoc(collection(firestore, collectionName), newPackage);
   await fetchPackages();
   return {success: true};
  } catch (err) {
   console.error("Error adding package:", err);
   return {success: false, error: "Failed to add package"};
  } finally {
   setLoading(false);
  }
 };

 const updatePackage = async (
  id: string,
  packageData: Partial<SubscriptionPackage>
 ) => {
  try {
   setLoading(true);
   await updateDoc(doc(firestore, collectionName, id), {
    ...packageData,
    updatedAt: new Date(),
   });
   await fetchPackages();
   return {success: true};
  } catch (err) {
   console.error("Error updating package:", err);
   return {success: false, error: "Failed to update package"};
  } finally {
   setLoading(false);
  }
 };

 const deletePackage = async (id: string) => {
  try {
   setLoading(true);
   await deleteDoc(doc(firestore, collectionName, id));
   await fetchPackages();
   return {success: true};
  } catch (err) {
   console.error("Error deleting package:", err);
   return {success: false, error: "Failed to delete package"};
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchPackages();
 }, []);

 return {
  packages,
  loading,
  error,
  addPackage,
  updatePackage,
  deletePackage,
  refresh: fetchPackages,
 };
};
