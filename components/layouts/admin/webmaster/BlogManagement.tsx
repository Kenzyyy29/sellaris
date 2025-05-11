"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {
 FiPlus,
 FiEdit2,
 FiTrash2,
 FiEye,
 FiEyeOff,
 FiSave,
} from "react-icons/fi";
import {useBlog} from "@/lib/hooks/useBlog";
import {BlogPost} from "@/lib/hooks/useBlog";

const BlogManagement = () => {
 const {
  posts,
  loading,
  error,
  addPost,
  updatePost,
  togglePostStatus,
  deletePost,
  refresh,
 } = useBlog();

 const [isEditing, setIsEditing] = useState(false);
 const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
 const [isFormOpen, setIsFormOpen] = useState(false);

 const handleAddNew = () => {
  setCurrentPost({
   title: "",
   slug: "",
   content: "",
   excerpt: "",
   featuredImage: "",
   author: "",
   tags: [],
   isPublished: false,
  });
  setIsEditing(false);
  setIsFormOpen(true);
 };

 const handleEdit = (post: BlogPost) => {
  setCurrentPost({...post});
  setIsEditing(true);
  setIsFormOpen(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!currentPost) return;

  const result = isEditing
   ? await updatePost(currentPost.id!, currentPost)
   : await addPost(currentPost as Omit<BlogPost, "id">);

  if (result.success) {
   setIsFormOpen(false);
   setCurrentPost(null);
   refresh();
  }
 };

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  if (!currentPost) return;
  const {name, value} = e.target;
  setCurrentPost({...currentPost, [name]: value});
 };

 const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!currentPost) return;
  const tags = e.target.value.split(",").map((tag) => tag.trim());
  setCurrentPost({...currentPost, tags});
 };

 return (
  <div className="container mx-auto px-4 py-8">
   <motion.div
    initial={{opacity: 0, y: -20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.3}}
    className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
    <p className="text-gray-600">Manage your blog posts here</p>
   </motion.div>

   {error && (
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
     {error}
    </motion.div>
   )}

   <motion.button
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    onClick={handleAddNew}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center mb-6">
    <FiPlus className="mr-2" />
    Add New Post
   </motion.button>

   {isFormOpen && currentPost && (
    <motion.div
     initial={{opacity: 0, y: -20}}
     animate={{opacity: 1, y: 0}}
     exit={{opacity: 0, y: -20}}
     className="bg-white rounded-lg shadow-md p-6 mb-8">
     <h2 className="text-xl font-semibold mb-4">
      {isEditing ? "Edit Post" : "Add New Post"}
     </h2>
     <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
       <div>
        <label className="block text-gray-700 mb-2">Title</label>
        <input
         type="text"
         name="title"
         value={currentPost.title || ""}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border rounded-md"
         required
        />
       </div>
       <div>
        <label className="block text-gray-700 mb-2">Slug</label>
        <input
         type="text"
         name="slug"
         value={currentPost.slug || ""}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border rounded-md"
         required
        />
       </div>
      </div>

      <div className="mb-4">
       <label className="block text-gray-700 mb-2">Excerpt</label>
       <textarea
        name="excerpt"
        value={currentPost.excerpt || ""}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md"
        rows={2}
        required
       />
      </div>

      <div className="mb-4">
       <label className="block text-gray-700 mb-2">Content</label>
       <textarea
        name="content"
        value={currentPost.content || ""}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md"
        rows={6}
        required
       />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
       <div>
        <label className="block text-gray-700 mb-2">Featured Image URL</label>
        <input
         type="text"
         name="featuredImage"
         value={currentPost.featuredImage || ""}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border rounded-md"
        />
       </div>
       <div>
        <label className="block text-gray-700 mb-2">Author</label>
        <input
         type="text"
         name="author"
         value={currentPost.author || ""}
         onChange={handleInputChange}
         className="w-full px-3 py-2 border rounded-md"
         required
        />
       </div>
      </div>

      <div className="mb-4">
       <label className="block text-gray-700 mb-2">
        Tags (comma separated)
       </label>
       <input
        type="text"
        value={currentPost.tags?.join(", ") || ""}
        onChange={handleTagsChange}
        className="w-full px-3 py-2 border rounded-md"
       />
      </div>

      <div className="flex items-center mb-4">
       <input
        type="checkbox"
        id="isPublished"
        checked={currentPost.isPublished || false}
        onChange={(e) =>
         setCurrentPost({...currentPost, isPublished: e.target.checked})
        }
        className="mr-2"
       />
       <label
        htmlFor="isPublished"
        className="text-gray-700">
        Publish
       </label>
      </div>

      <div className="flex justify-end space-x-2">
       <motion.button
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        type="button"
        onClick={() => setIsFormOpen(false)}
        className="px-4 py-2 border rounded-md text-gray-700">
        Cancel
       </motion.button>
       <motion.button
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
        <FiSave className="mr-2" />
        {isEditing ? "Update" : "Save"}
       </motion.button>
      </div>
     </form>
    </motion.div>
   )}

   {loading ? (
    <div className="flex justify-center items-center h-32">
     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
   ) : (
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     className="bg-white rounded-lg shadow-md overflow-hidden">
     <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Author
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Created
         </th>
         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {posts.map((post) => (
         <motion.tr
          key={post.id}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          whileHover={{backgroundColor: "rgba(0, 0, 0, 0.02)"}}>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="text-sm font-medium text-gray-900">{post.title}</div>
           <div className="text-sm text-gray-500">{post.slug}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {post.author}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
             post.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
            }`}>
            {post.isPublished ? "Published" : "Draft"}
           </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {post.createdAt?.toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
           <div className="flex justify-end space-x-2">
            <motion.button
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.9}}
             onClick={() => togglePostStatus(post.id, !post.isPublished)}
             className="text-gray-600 hover:text-gray-900"
             title={post.isPublished ? "Unpublish" : "Publish"}>
             {post.isPublished ? <FiEyeOff /> : <FiEye />}
            </motion.button>
            <motion.button
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.9}}
             onClick={() => handleEdit(post)}
             className="text-blue-600 hover:text-blue-900"
             title="Edit">
             <FiEdit2 />
            </motion.button>
            <motion.button
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.9}}
             onClick={() => deletePost(post.id)}
             className="text-red-600 hover:text-red-900"
             title="Delete">
             <FiTrash2 />
            </motion.button>
           </div>
          </td>
         </motion.tr>
        ))}
       </tbody>
      </table>
     </div>
    </motion.div>
   )}
  </div>
 );
};

export default BlogManagement;
