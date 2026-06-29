/**
 * CommunityPage.jsx
 * Displays community posts/discussions feed with like functionality.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { getCommunityPosts } from '../../services/mockApi';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { RiHeartLine, RiHeartFill, RiMessage2Line, RiGroupLine } from 'react-icons/ri';

const PostCard = ({ post, onLike }) => {
  const { author, initials, role, timeAgo, content, likes, replies, tags, liked } = post;

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-3">
      {/* Author row */}
      <div className="flex items-center gap-3">
        <Avatar initials={initials} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{author}</span>
            {role === 'Instructor' && (
              <span className="px-1.5 py-0.5 bg-[#6C1D5F] text-white text-xs rounded-md">Instructor</span>
            )}
          </div>
          <span className="text-xs text-slate-400">{timeAgo}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{content}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
            liked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'
          }`}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          {liked ? <RiHeartFill className="text-sm" /> : <RiHeartLine className="text-sm" />}
          {likes}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-[#6C1D5F] transition-colors">
          <RiMessage2Line className="text-sm" />
          {replies} replies
        </button>
      </div>
    </article>
  );
};

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityPosts().then(({ data }) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  // Toggle like on a post (client-side only for mock)
  const handleLike = useCallback((id) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }, []);

  if (loading) return <Loader message="Loading community..." />;

  return (
    <div className="space-y-5 max-w-[800px]">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Community</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Connect with fellow learners and instructors.
        </p>
      </div>

      {posts.length === 0 ? (
        <EmptyState
          icon={RiGroupLine}
          title="No posts yet"
          description="Be the first to start a discussion."
        />
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
