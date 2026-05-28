import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
  large?: boolean;
}

const BlogCard = ({ post, large }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block"
    >
      <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
      <h3 className={`font-medium text-foreground ${large ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
        {post.title}
      </h3>
      <p className="text-muted-foreground text-xs mt-1">{post.date}</p>
    </Link>
  );
};

export default BlogCard;
