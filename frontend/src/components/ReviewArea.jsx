import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const ReviewArea = ({ review, TMDB_IMAGE_BASE, className }) => {
  if (!review) return null;

  return (
    <div 
      className={twMerge(
        "bg-[#0f1930]/50 rounded-[16px] p-6 flex flex-col gap-[15px] items-start w-full border border-transparent",
        className
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex gap-[12px] items-center">
          {/* Profile Image / Initials */}
          <div className="bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0">
            {review.author_details?.avatar_path ? (
              <img 
                src={`${TMDB_IMAGE_BASE.POSTER}${review.author_details.avatar_path}`} 
                alt={review.author} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-orange-400 font-semibold text-base uppercase">
                {review.author.substring(0, 2) || "U"}
              </span>
            )}
          </div>
          
          {/* Author Info */}
          <div className="flex flex-col items-start">
            <p className="text-slate-200 font-semibold text-sm leading-[20px]">
              {review.author || "Anonymous"}
            </p>
            <p className="text-slate-400 font-medium text-xs leading-[16px]">
              {new Date(review.created_at).toLocaleDateString().replace(/\. /g, '.').replace(/\.$/, '')}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-start gap-1">
          <FontAwesomeIcon icon={faStar} className="text-orange-400 text-sm mt-1" />
          <span className="text-slate-200 font-medium text-lg leading-[28px]">
            {review.author_details?.rating?.toFixed(1) || '4.9'}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="w-full pb-[0.75px]">
        <p className="text-slate-400 font-medium text-sm leading-[20px] text-left">
          {review.content}
        </p>
      </div>
    </div>
  );
};

export default ReviewArea;
