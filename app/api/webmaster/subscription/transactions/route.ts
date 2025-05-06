import {NextResponse} from "next/server";
import {getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {
 doc,
 updateDoc,
 getDoc,
 deleteDoc,
 collection,
 getDocs,
} from "firebase/firestore";

const firestore = getFirestore(app);

export async function GET() {
 try {
  const querySnapshot = await getDocs(
   collection(firestore, "subscription_transactions")
  );
  const transactions = querySnapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt?.toDate(),
   completedAt: doc.data().completedAt?.toDate(),
  }));

  return NextResponse.json({success: true, data: transactions});
 } catch (error) {
  console.error("Error fetching transactions:", error);
  return NextResponse.json(
   {success: false, message: "Failed to fetch transactions"},
   {status: 500}
  );
 }
}

export async function PUT(request: Request) {
 try {
  const {id, action} = await request.json();

  if (!id || !action) {
   return NextResponse.json(
    {success: false, message: "Missing required fields"},
    {status: 400}
   );
  }

  const transactionRef = doc(firestore, "subscription_transactions", id);
  const transactionSnap = await getDoc(transactionRef);

  if (!transactionSnap.exists()) {
   return NextResponse.json(
    {success: false, message: "Transaction not found"},
    {status: 404}
   );
  }

  if (action === "confirm") {
   await updateDoc(transactionRef, {
    status: "completed",
    completedAt: new Date(),
   });
  } else if (action === "reject") {
   await updateDoc(transactionRef, {
    status: "failed",
    completedAt: new Date(),
   });
  } else {
   return NextResponse.json(
    {success: false, message: "Invalid action"},
    {status: 400}
   );
  }

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error updating transaction:", error);
  return NextResponse.json(
   {success: false, message: "Failed to update transaction"},
   {status: 500}
  );
 }
}

export async function DELETE(request: Request) {
 try {
  const {id} = await request.json();

  if (!id) {
   return NextResponse.json(
    {success: false, message: "Transaction ID is required"},
    {status: 400}
   );
  }

  await deleteDoc(doc(firestore, "subscription_transactions", id));

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error deleting transaction:", error);
  return NextResponse.json(
   {success: false, message: "Failed to delete transaction"},
   {status: 500}
  );
 }
}
