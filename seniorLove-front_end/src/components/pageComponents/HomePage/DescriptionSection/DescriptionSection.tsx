import ArticleReverse from './Articles/ArticleReverse';
import ArticleRow from './Articles/ArticleRow';

interface DescriptionSectionProps {
  isForm1Validated: boolean;
  isForm2Validated: boolean;
  isForm3Validated: boolean;
}

export default function DescriptionSection({
  isForm1Validated,
  isForm2Validated,
  isForm3Validated,
}: DescriptionSectionProps) {
  return (
    <section className="text-primaryText bg-primaryGrey flex flex-col gap-3">
      <div className="text-sm md:text-lg">
        <ArticleRow
          isForm1Validated={isForm1Validated}
          isForm2Validated={isForm2Validated}
          isForm3Validated={isForm3Validated}
        />
        <ArticleReverse
          isForm1Validated={isForm1Validated}
          isForm2Validated={isForm2Validated}
          isForm3Validated={isForm3Validated}
        />
      </div>
    </section>
  );
}
