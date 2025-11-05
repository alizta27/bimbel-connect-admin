import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';
import { usePostStore } from '@/store/usePostStore';
import BottomNav from '@/components/BottomNav';
import FeedCard from '@/components/FeedCard';
import '@/styles/main.scss';

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, checkAuth } = useAuthStore();
  const { posts, loadPosts, likePost } = usePostStore();

  useEffect(() => {
    checkAuth();
    loadPosts();
  }, [checkAuth, loadPosts]);

  useEffect(() => {
    if (!user) {
      setLocation('/login');
    }
  }, [user, setLocation]);

  if (!user) return null;

  return (
    <>
      <div className="app-layout">
        <div className="container" style={{ paddingTop: '1rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#31694E',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            KerjaAja 🚀
          </h1>

          {posts.map((post) => (
            <FeedCard
              key={post.id}
              post={post}
              currentUserId={user.id}
              onLike={() => likePost(post.id, user.id)}
              onComment={() => setLocation(`/post/${post.id}`)}
              onBid={() => setLocation(`/post/${post.id}`)}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
