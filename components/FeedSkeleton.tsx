const SKELETON_CARDS = [0, 1, 2];

export default function FeedSkeleton() {
  return (
    <div className="blog-grid" aria-hidden="true">
      {SKELETON_CARDS.map((card) => (
        <div className="blog-card blog-skeleton" key={card}>
          <span className="blog-skeleton-label" />
          <span className="blog-skeleton-title" />
          <span className="blog-skeleton-line" />
          <span className="blog-skeleton-line blog-skeleton-line-short" />
        </div>
      ))}
    </div>
  );
}
