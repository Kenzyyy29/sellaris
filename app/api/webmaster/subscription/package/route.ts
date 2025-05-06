import {NextResponse} from "next/server";
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
const collectionName = "subscription_packages";

export interface SubscriptionPackage {
 id?: string;
 name: string;
 description: string;
 price: number;
 duration: number;
 features: string[];
 isActive: boolean;
 createdAt?: Date;
 updatedAt?: Date;
}

export async function GET() {
 try {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const packages: SubscriptionPackage[] = [];

  querySnapshot.forEach((doc) => {
   const data = doc.data();
   packages.push({
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    duration: data.duration,
    features: data.features || [],
    isActive: data.isActive,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
   });
  });

  return NextResponse.json({success: true, data: packages});
 } catch (error) {
  console.error("Error fetching packages:", error);
  return NextResponse.json(
   {success: false, error: "Failed to fetch packages"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 try {
  const packageData: Omit<SubscriptionPackage, "id"> = await request.json();

  const newPackage = {
   ...packageData,
   isActive: true,
   createdAt: new Date(),
   updatedAt: new Date(),
  };

  const docRef = await addDoc(
   collection(firestore, collectionName),
   newPackage
  );

  return NextResponse.json({
   success: true,
   data: {id: docRef.id, ...newPackage},
  });
 } catch (error) {
  console.error("Error adding package:", error);
  return NextResponse.json(
   {success: false, error: "Failed to add package"},
   {status: 500}
  );
 }
}

export async function PUT(request: Request) {
 try {
  const {id, ...updateData} = await request.json();

  await updateDoc(doc(firestore, collectionName, id), {
   ...updateData,
   updatedAt: new Date(),
  });

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error updating package:", error);
  return NextResponse.json(
   {success: false, error: "Failed to update package"},
   {status: 500}
  );
 }
}

export async function DELETE(request: Request) {
 try {
  const {id} = await request.json();

  await deleteDoc(doc(firestore, collectionName, id));

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error deleting package:", error);
  return NextResponse.json(
   {success: false, error: "Failed to delete package"},
   {status: 500}
  );
 }
}
