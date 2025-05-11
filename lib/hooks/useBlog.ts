import { useState, useEffect } from "react";
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    getFirestore,
} from "firebase/firestore";
import { app } from "@/lib/firebase/init";

const firestore = getFirestore(app);

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: string;
    tags: string[];
    isPublished: boolean;
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export const useBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const collectionName = "blog_posts";

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(firestore, collectionName));
            const postsData: BlogPost[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                postsData.push({
                    id: doc.id,
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    excerpt: data.excerpt,
                    featuredImage: data.featuredImage,
                    author: data.author,
                    tags: data.tags || [],
                    isPublished: data.isPublished,
                    publishedAt: data.publishedAt?.toDate(),
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate(),
                });
            });

            setPosts(postsData);
            setError(null);
        } catch (err) {
            console.error("Error fetching blog posts:", err);
            setError("Failed to load blog posts");
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (postData: Omit<BlogPost, "id">) => {
        try {
            setLoading(true);
            const newPost = {
                ...postData,
                isPublished: postData.isPublished || false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await addDoc(collection(firestore, collectionName), newPost);
            await fetchPosts();
            return { success: true };
        } catch (err) {
            console.error("Error adding blog post:", err);
            return { success: false, error: "Failed to add blog post" };
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (id: string, postData: Partial<BlogPost>) => {
        try {
            setLoading(true);
            await updateDoc(doc(firestore, collectionName, id), {
                ...postData,
                updatedAt: new Date(),
            });
            await fetchPosts();
            return { success: true };
        } catch (err) {
            console.error("Error updating blog post:", err);
            return { success: false, error: "Failed to update blog post" };
        } finally {
            setLoading(false);
        }
    };

    const togglePostStatus = async (id: string, isPublished: boolean) => {
        return updatePost(id, { isPublished });
    };

    const deletePost = async (id: string) => {
        try {
            setLoading(true);
            await deleteDoc(doc(firestore, collectionName, id));
            await fetchPosts();
            return { success: true };
        } catch (err) {
            console.error("Error deleting blog post:", err);
            return { success: false, error: "Failed to delete blog post" };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return {
        posts,
        loading,
        error,
        addPost,
        updatePost,
        togglePostStatus,
        deletePost,
        refresh: fetchPosts,
    };
};