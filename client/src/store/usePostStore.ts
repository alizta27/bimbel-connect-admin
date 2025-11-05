import { create } from 'zustand';
import { Post, getPosts, createPost, toggleLike, addComment, addBid } from '@/lib/localStorage';

interface PostState {
  posts: Post[];
  loadPosts: () => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'bids'>) => void;
  likePost: (postId: string, userId: string) => void;
  commentOnPost: (postId: string, userId: string, userName: string, userAvatar: string, text: string) => void;
  bidOnPost: (postId: string, userId: string, userName: string, userAvatar: string, amount: number, message: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  
  loadPosts: () => {
    const posts = getPosts();
    set({ posts });
  },
  
  addPost: (post) => {
    const newPost = createPost(post);
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },
  
  likePost: (postId, userId) => {
    toggleLike(postId, userId);
    const posts = getPosts();
    set({ posts });
  },
  
  commentOnPost: (postId, userId, userName, userAvatar, text) => {
    addComment(postId, { userId, userName, userAvatar, text });
    const posts = getPosts();
    set({ posts });
  },
  
  bidOnPost: (postId, userId, userName, userAvatar, amount, message) => {
    addBid(postId, { userId, userName, userAvatar, amount, message });
    const posts = getPosts();
    set({ posts });
  },
}));
