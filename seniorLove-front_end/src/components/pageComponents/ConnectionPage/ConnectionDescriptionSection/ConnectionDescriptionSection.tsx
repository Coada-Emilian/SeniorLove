import ConnectionArticleReverse from './ConnectionArticles/ConnectionArticleReverse';
import ConnectionArticleRow from './ConnectionArticles/ConnectionArticleRow';

export default function ConnectionDescriptionSection() {
  return (
    <section className="text-primaryText bg-primaryGrey flex flex-col gap-3">
      <div className="text-sm md:text-lg">
        <ConnectionArticleRow />

        <ConnectionArticleReverse />
      </div>
    </section>
  );
}
