import {NextResponse} from "next/server";
import {getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";

const firestore = getFirestore(app);
const collectionName = "payment_methods";

export async function GET() {
 try {
  const {collection, getDocs} = await import("firebase/firestore");
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const methods: any[] = [];

  querySnapshot.forEach((doc) => {
   const data = doc.data();
   methods.push({
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate()?.toISOString(),
    updatedAt: data.updatedAt?.toDate()?.toISOString(),
   });
  });

  return NextResponse.json({success: true, data: methods});
 } catch (error) {
  console.error("Error fetching payment methods:", error);
  return NextResponse.json(
   {success: false, error: "Failed to fetch payment methods"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 try {
  const {addDoc, collection} = await import("firebase/firestore");
  const body = await request.json();

  const newMethod = {
   ...body,
   isActive: true,
   createdAt: new Date(),
   updatedAt: new Date(),
  };

  const docRef = await addDoc(collection(firestore, collectionName), newMethod);

  return NextResponse.json({
   success: true,
   id: docRef.id,
  });
 } catch (error) {
  console.error("Error adding payment method:", error);
  return NextResponse.json(
   {success: false, error: "Failed to add payment method"},
   {status: 500}
  );
 }
}

export async function PUT(request: Request) {
 try {
  const {doc, updateDoc} = await import("firebase/firestore");
  const body = await request.json();
  const {id, ...data} = body;

  await updateDoc(doc(firestore, collectionName, id), {
   ...data,
   updatedAt: new Date(),
  });

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error updating payment method:", error);
  return NextResponse.json(
   {success: false, error: "Failed to update payment method"},
   {status: 500}
  );
 }
}

export async function DELETE(request: Request) {
 try {
  const {doc, deleteDoc} = await import("firebase/firestore");
  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
   return NextResponse.json(
    {success: false, error: "ID is required"},
    {status: 400}
   );
  }

  await deleteDoc(doc(firestore, collectionName, id));

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error deleting payment method:", error);
  return NextResponse.json(
   {success: false, error: "Failed to delete payment method"},
   {status: 500}
  );
 }
}
