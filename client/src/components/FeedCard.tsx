import { Heart, MessageCircle, DollarSign } from 'lucide-react';
import { Post } from '@/lib/localStorage';
import '@/styles/main.scss';

interface FeedCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  onBid: () => void;
  currentUserId?: string;
}

export default function FeedCard({ post, onLike, onComment, onBid, currentUserId }: FeedCardProps) {
  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  
  const formatTime = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} jam yang lalu`;
    return `${Math.floor(diffMins / 1440)} hari yang lalu`;
  };

  return (
    <article className="feed-card">
      <div className="feed-card__header">
        <div className="feed-card__user">
          <img 
            src={post.userAvatar} 
            alt={post.userName}
            className="feed-card__avatar"
          />
          <div className="feed-card__user-info">
            <div className="feed-card__username">{post.userName}</div>
            <div className="feed-card__timestamp">{formatTime(post.createdAt)}</div>
          </div>
        </div>
      </div>

      {post.mediaType === 'image' ? (
        <img 
          src={post.media} 
          alt="Post media"
          className="feed-card__media"
        />
      ) : (
        <video 
          src={post.media}
          className="feed-card__media"
          controls
        />
      )}

      <div className="feed-card__content">
        <p className="feed-card__description">{post.description}</p>
        
        {post.tags.length > 0 && (
          <div className="feed-card__tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="feed-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {post.budget && (
          <div style={{ fontSize: '0.875rem', color: '#31694E', fontWeight: 600 }}>
            Budget: Rp {post.budget.toLocaleString('id-ID')}
          </div>
        )}
      </div>

      <div className="feed-card__actions">
        <div className="feed-card__action-group">
          <button 
            onClick={onLike}
            className={`feed-card__action-btn ${isLiked ? 'feed-card__action-btn--active' : ''}`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{post.likes.length}</span>
          </button>
          
          <button 
            onClick={onComment}
            className="feed-card__action-btn"
          >
            <MessageCircle size={20} />
            <span>{post.comments.length}</span>
          </button>
          
          <button 
            onClick={onBid}
            className="feed-card__action-btn"
          >
            <DollarSign size={20} />
            <span>{post.bids.length} Tawaran</span>
          </button>
        </div>
      </div>
    </article>
  );
}
