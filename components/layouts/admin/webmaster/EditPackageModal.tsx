import {FC, useState, useEffect} from "react";
import {SubscriptionPackage} from "@/lib/hooks/useSubscriptionPackage";

interface EditPackageModalProps {
 isOpen: boolean;
 onClose: () => void;
 packageData: SubscriptionPackage | null;
 onSave: (packageData: SubscriptionPackage) => Promise<{success: boolean; error?: string}>;
 isProcessing: boolean;
}

const EditPackageModal: FC<EditPackageModalProps> = ({
 isOpen,
 onClose,
 packageData,
 onSave,
 isProcessing,
}) => {
 const [formData, setFormData] = useState<
  Omit<SubscriptionPackage, "id" | "createdAt" | "updatedAt">
 >({
  name: "",
  description: "",
  price: 0,
  duration: 1,
  durationType: "monthly",
  isRecommended: false,
  features: [],
  isActive: true,
 });
 const [featureInput, setFeatureInput] = useState("");
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  if (packageData) {
   setFormData({
    name: packageData.name,
    description: packageData.description,
    price: packageData.price,
    duration: packageData.duration,
    durationType: packageData.durationType || "monthly",
    isRecommended: packageData.isRecommended || false,
    features: packageData.features || [],
    isActive: packageData.isActive,
   });
  } else {
   setFormData({
    name: "",
    description: "",
    price: 0,
    duration: 1,
    durationType: "monthly",
    isRecommended: false,
    features: [],
    isActive: true,
   });
  }
  setFeatureInput("");
  setError(null);
 }, [packageData]);

 const handleInputChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value, type} = e.target;

  if (type === "checkbox") {
   const checked = (e.target as HTMLInputElement).checked;
   setFormData((prev) => ({...prev, [name]: checked}));
  } else {
   setFormData((prev) => ({
    ...prev,
    [name]:
     name === "price" || name === "duration" ? parseFloat(value) || 0 : value,
   }));
  }
 };

 const handleAddFeature = () => {
  if (featureInput.trim()) {
   setFormData((prev) => ({
    ...prev,
    features: [...prev.features, featureInput.trim()],
   }));
   setFeatureInput("");
  }
 };

 const handleRemoveFeature = (index: number) => {
  setFormData((prev) => ({
   ...prev,
   features: prev.features.filter((_, i) => i !== index),
  }));
 };

 const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
   style: "currency",
   currency: "IDR",
   minimumFractionDigits: 0,
  }).format(value);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!formData.name.trim()) {
   setError("Nama paket wajib diisi");
   return;
  }

  if (formData.price <= 0) {
   setError("Harga harus lebih dari 0");
   return;
  }

  if (formData.duration <= 0) {
   setError("Durasi harus lebih dari 0");
   return;
  }

  const packageToSave = packageData?.id
   ? {...formData, id: packageData.id}
   : formData;

  const result = await onSave(packageToSave);

  if (result.success) {
   onClose();
  } else if (result.error) {
   setError(result.error);
  }
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
    <h3 className="text-lg font-bold mb-4">
     {packageData ? "Edit Paket Langganan" : "Tambah Paket Langganan Baru"}
    </h3>
    {error && (
     <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
    )}
    <form onSubmit={handleSubmit}>
     <div className="mb-4">
      <label className="block text-gray-700 mb-2">Nama Paket*</label>
      <input
       type="text"
       name="name"
       value={formData.name}
       onChange={handleInputChange}
       className="w-full px-3 py-2 border rounded"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700 mb-2">Deskripsi</label>
      <textarea
       name="description"
       value={formData.description}
       onChange={handleInputChange}
       className="w-full px-3 py-2 border rounded"
       rows={3}
      />
     </div>

     <div className="mb-4">
      <label className="block text-gray-700 mb-2">Harga (IDR)*</label>
      <div className="relative">
       <span className="absolute left-3 top-2">Rp</span>
       <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full pl-10 px-3 py-2 border rounded"
        min="1"
        required
       />
      </div>
      <div className="text-sm text-gray-500 mt-1">
       Harga ditampilkan: {formatCurrency(formData.price)}
      </div>
     </div>

     <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
       <label className="block text-gray-700 mb-2">Durasi*</label>
       <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded"
        min="1"
        required
       />
      </div>
      <div>
       <label className="block text-gray-700 mb-2">Jenis Durasi*</label>
       <select
        name="durationType"
        value={formData.durationType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded">
        <option value="monthly">Bulanan</option>
        <option value="yearly">Tahunan</option>
       </select>
      </div>
     </div>

     <div className="mb-4">
      <label className="block text-gray-700 mb-2">Fitur</label>
      <div className="flex mb-2">
       <input
        type="text"
        value={featureInput}
        onChange={(e) => setFeatureInput(e.target.value)}
        className="flex-grow px-3 py-2 border rounded-l"
        placeholder="Tambah fitur"
        onKeyDown={(e) =>
         e.key === "Enter" && (e.preventDefault(), handleAddFeature())
        }
       />
       <button
        type="button"
        onClick={handleAddFeature}
        className="px-3 py-2 bg-blue-500 text-white rounded-r">
        Tambah
       </button>
      </div>
      <ul className="space-y-1">
       {formData.features.map((feature, index) => (
        <li
         key={index}
         className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
         <span>{feature}</span>
         <button
          type="button"
          onClick={() => handleRemoveFeature(index)}
          className="text-red-500 hover:text-red-700">
          ×
         </button>
        </li>
       ))}
      </ul>
     </div>

     <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="flex items-center">
       <input
        type="checkbox"
        name="isActive"
        id="isActive"
        checked={formData.isActive}
        onChange={handleInputChange}
        className="mr-2"
       />
       <label htmlFor="isActive">Aktif</label>
      </div>
      <div className="flex items-center">
       <input
        type="checkbox"
        name="isRecommended"
        id="isRecommended"
        checked={formData.isRecommended}
        onChange={handleInputChange}
        className="mr-2"
       />
       <label htmlFor="isRecommended">Direkomendasikan</label>
      </div>
     </div>

     <div className="flex justify-end gap-3">
      <button
       type="button"
       onClick={onClose}
       disabled={isProcessing}
       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
       Batal
      </button>
      <button
       type="submit"
       disabled={isProcessing}
       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
       {isProcessing ? "Menyimpan..." : "Simpan"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default EditPackageModal;
