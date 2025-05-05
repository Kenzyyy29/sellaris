// /app/admin/webmaster/clients/page.tsx
"use client";

import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {FaUsers, FaSearch, FaUserSlash, FaFilter, FaCalendarAlt} from "react-icons/fa";
import DeleteClientsModal from "./DeleteClientsModal";
import ClientsFilterModal from "./ClientsFilterModal";

const containerVariants = {
 hidden: {opacity: 0, y: 20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   staggerChildren: 0.1,
   delayChildren: 0.2,
  },
 },
};

const itemVariants = {
 hidden: {opacity: 0, y: -20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   type: "spring",
   stiffness: 100,
   damping: 10,
  },
 },
};

interface User {
 id: string;
 fullname: string;
 email: string;
 phone?: string;
 password?: string;
 role: string;
 verified: boolean;
 otp?: string;
 otpExpiry?: Date;
 createdAt: Date | string;
 updatedAt: Date | string;
}

interface FilterOptions {
 sort: "newest" | "oldest" | "";
 verified: boolean | null;
}

export default function ClientsPage() {
 const [clients, setClients] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedClient, setSelectedClient] = useState<User | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [filters, setFilters] = useState<FilterOptions>({
  sort: "",
  verified: null,
 });

 useEffect(() => {
  const fetchClients = async () => {
   try {
    const response = await fetch("/api/webmaster/clients");
    const data = await response.json();
    if (data.status) {
     setClients(data.data);
    }
   } catch (error) {
    console.error("Failed to fetch clients:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchClients();
 }, []);

 const filterAndSortClients = useMemo(() => {
  return () => {
   let result = [...clients];

   // Apply search filter
   if (searchTerm) {
    result = result.filter(
     (client) =>
      client.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
   }

   // Apply verification filter
   if (filters.verified !== null) {
    result = result.filter((client) => client.verified === filters.verified);
   }

   // Apply sorting
   if (filters.sort === "newest") {
    result.sort((a, b) => {
     const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
     const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
     return dateB - dateA;
    });
   } else if (filters.sort === "oldest") {
    result.sort((a, b) => {
     const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
     const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
     return dateA - dateB;
    });
   }

   return result;
  };
 }, [clients, searchTerm, filters]);

 const displayedClients = filterAndSortClients();

 const handleDeleteClick = (client: User) => {
  setSelectedClient(client);
  setIsModalOpen(true);
 };

 const handleConfirmDelete = async () => {
  if (!selectedClient) return;

  setIsDeleting(true);
  try {
   const response = await fetch("/api/webmaster/clients", {
    method: "DELETE",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({id: selectedClient.id}),
   });

   const result = await response.json();

   if (result.status) {
    setClients(clients.filter((c) => c.id !== selectedClient.id));
   }
  } catch (error) {
   console.error("Delete failed:", error);
  } finally {
   setIsDeleting(false);
   setIsModalOpen(false);
   setSelectedClient(null);
  }
 };

 const applyFilters = (newFilters: FilterOptions) => {
  setFilters(newFilters);
 };

 const resetAllFilters = () => {
  setSearchTerm("");
  setFilters({
   sort: "",
   verified: null,
  });
 };

 return (
  <motion.div
   className="container mx-auto px-4 py-8"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <motion.div
    variants={itemVariants}
    className="mb-8">
    <h1 className="text-3xl font-bold flex items-center">
     <FaUsers className="mr-2" /> Client Management
    </h1>
   </motion.div>

   <motion.div
    variants={itemVariants}
    className=" mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
     <div className="relative flex-grow max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
       <FaSearch className="text-gray-400" />
      </div>
      <input
       type="text"
       placeholder="Search clients by name or email..."
       className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />
     </div>
     <button
      onClick={() => setIsFilterOpen(true)}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
      <FaFilter className="mr-2" /> Filter
     </button>
    </div>

    <div className="flex items-center mt-3 flex-wrap gap-2">
     {filters.sort === "newest" && (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
       <FaCalendarAlt className="mr-1" /> Newest
      </span>
     )}
     {filters.sort === "oldest" && (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
       <FaCalendarAlt className="mr-1" /> Oldest
      </span>
     )}
     {filters.verified === true && (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
       Verified Only
      </span>
     )}
     {filters.verified === false && (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
       Unverified Only
      </span>
     )}
     {(searchTerm || filters.sort || filters.verified !== null) && (
      <button
       onClick={resetAllFilters}
       className="text-xs text-gray-500 hover:text-gray-700 ml-1">
       Clear all filters
      </button>
     )}
    </div>
   </motion.div>

   <motion.div
    variants={itemVariants}
    className=" overflow-hidden">
    {loading ? (
     <div className="p-6 text-center">Loading clients...</div>
    ) : displayedClients.length === 0 ? (
     <div className="p-6 text-center">
      {searchTerm || filters.sort || filters.verified !== null
       ? "No clients match your filters"
       : "No clients found"}
     </div>
    ) : (
     <div className="overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          #
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Joined
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {displayedClients.map((client, index) => (
         <tr
          key={client.id}
          className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="font-medium text-gray-900">{index + 1}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="font-medium text-gray-900">{client.fullname}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
           {client.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
           {client.phone || "-"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
             client.verified
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
            }`}>
            {client.verified ? "Verified" : "Pending"}
           </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
           {client.createdAt
            ? new Date(client.createdAt).toLocaleDateString()
            : "-"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
           <button
            onClick={() => handleDeleteClick(client)}
            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors flex gap-2 items-center"
            title="Hapus User">
            <FaUserSlash className="text-lg" />
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
             Hapus User
            </span>
           </button>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    )}
   </motion.div>

   <ClientsFilterModal
    isOpen={isFilterOpen}
    onClose={() => setIsFilterOpen(false)}
    onApply={applyFilters}
    filters={filters}
   />

   <DeleteClientsModal
    isOpen={isModalOpen}
    onClose={() => {
     setIsModalOpen(false);
     setSelectedClient(null);
    }}
    onConfirm={handleConfirmDelete}
    isLoading={isDeleting}
    title={`Delete ${selectedClient?.fullname || "User"}?`}
    message="Are you sure you want to delete this user? This action cannot be undone."
   />
  </motion.div>
 );
}

