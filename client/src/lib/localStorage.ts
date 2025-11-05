// LocalStorage utilities for KerjaAja

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  tokens: number;
  role: 'job-maker' | 'job-seeker';
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  media: string; // URL to image/video
  mediaType: 'image' | 'video';
  description: string;
  tags: string[];
  category: string;
  budget?: number;
  likes: string[]; // array of user IDs
  comments: Comment[];
  bids: Bid[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  amount: number;
  message: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  USER: 'kerjaaja_user',
  POSTS: 'kerjaaja_posts',
  COMMENTS: 'kerjaaja_comments',
  BIDS: 'kerjaaja_bids',
};

// Dummy user for login
const DUMMY_USER: User = {
  id: 'user-1',
  email: 'admin@admin.com',
  name: 'Admin KerjaAja',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  bio: 'Platform freelancing terbaik di Indonesia 🇮🇩',
  tokens: 100,
  role: 'job-maker',
};

// User functions
export const loginUser = (email: string, password: string): User | null => {
  if (email === 'admin@admin.com' && password === 'qwerty') {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DUMMY_USER));
    return DUMMY_USER;
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const updateUser = (updates: Partial<User>) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
};

// Post functions
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts) : getInitialPosts();
};

export const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'bids'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: `post-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: [],
    comments: [],
    bids: [],
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return newPost;
};

export const toggleLike = (postId: string, userId: string): Post | null => {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId);
    }
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return post;
  }
  return null;
};

export const addComment = (postId: string, comment: Omit<Comment, 'id' | 'postId' | 'createdAt'>): Comment | null => {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
    };
    post.comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newComment;
  }
  return null;
};

export const addBid = (postId: string, bid: Omit<Bid, 'id' | 'postId' | 'createdAt'>): Bid | null => {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    const newBid: Bid = {
      ...bid,
      id: `bid-${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
    };
    post.bids.push(newBid);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newBid;
  }
  return null;
};

// Initial dummy data
const getInitialPosts = (): Post[] => {
  const initialPosts: Post[] = [
    {
      id: 'post-1',
      userId: 'user-2',
      userName: 'Budi Santoso',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi',
      media: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800',
      mediaType: 'image',
      description: 'Butuh desainer grafis untuk logo perusahaan startup! Budget flexible, hasil harus profesional.',
      tags: ['Design', 'Logo', 'Grafis'],
      category: 'Design',
      budget: 1500000,
      likes: [],
      comments: [],
      bids: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'post-2',
      userId: 'user-3',
      userName: 'Siti Nurhaliza',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=siti',
      media: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
      mediaType: 'image',
      description: 'Bisa bantu edit video untuk konten YouTube! Saya content creator yang butuh editor handal.',
      tags: ['Video Editing', 'YouTube', 'Content'],
      category: 'Video',
      budget: 800000,
      likes: [],
      comments: [],
      bids: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'post-3',
      userId: 'user-4',
      userName: 'Ahmad Rifai',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad',
      media: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      mediaType: 'image',
      description: 'Web developer tersedia! Spesialis React & Node.js. Portfolio lengkap tersedia.',
      tags: ['Web Dev', 'React', 'Node.js'],
      category: 'Programming',
      budget: 5000000,
      likes: [],
      comments: [],
      bids: [],
      createdAt: new Date().toISOString(),
    },
  ];
  
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialPosts));
  return initialPosts;
};
