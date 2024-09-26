interface ArticleReverseProps {
  isForm1Validated: boolean;
  isForm2Validated: boolean;
  isForm3Validated: boolean;
}

export default function ArticleReverse({
  isForm1Validated,
  isForm2Validated,
  isForm3Validated,
}: ArticleReverseProps) {
  return (
    <article className="px-3 md:px-12 xl:px-24 py-12 flex flex-col">
      <div className="flex flex-col gap-3 md:flex-row-reverse md:px-16 md:items-center md:justify-between md:gap-12 lg:gap-24">
        <div className="flex flex-col gap-3 md:w-2/3">
          <div className="italic">
            <p>
              {!isForm1Validated && !isForm2Validated && !isForm3Validated
                ? "Imaginez-vous discuter de vos lectures préférées lors d'un café littéraire, explorer une nouvelle exposition avec un compagnon d'art, ou partager vos astuces de jardinage lors d'un atelier en plein air. Chez SeniorLove, nous facilitons non seulement les rencontres en ligne, mais nous vous offrons aussi des expériences enrichissantes dans le monde réel. Que vous recherchiez l'amour, l'amitié ou simplement de nouvelles connexions, notre plateforme est conçue pour répondre à vos attentes."
                : isForm1Validated && !isForm2Validated && !isForm3Validated
                  ? "Que vous soyez à la recherche d'une belle histoire d'amour, d'une nouvelle amitié, ou d'activités à partager, vous trouverez des personnes avec les mêmes centres d'intérêt, prêtes à vivre ces moments avec vous. Votre sécurité et votre confort sont nos priorités absolues. Nos événements sont conçus pour vous offrir un cadre convivial où vous pouvez vous épanouir en toute sérénité."
                  : isForm1Validated && isForm2Validated && !isForm3Validated
                    ? "Chaque jour est une chance de découvrir quelque chose de nouveau et de créer des souvenirs mémorables. Avec Senior Love, vous êtes entouré de personnes qui comprennent vos aspirations et sont prêtes à partager des expériences enrichissantes. Nous vous offrons bien plus qu'une simple plateforme de rencontres : nous vous ouvrons les portes d'une communauté dynamique où chaque interaction peut devenir un moment exceptionnel. Faites le choix de vous épanouir et de vous connecter en toute sérénité."
                    : "Bienvenue dans notre communauté ! Chaque interaction est une nouvelle opportunité de créer des liens significatifs et de partager des moments uniques. Chez Senior Love, nous vous encourageons à vous plonger dans un environnement chaleureux où l'amour et l'amitié prospèrent. Que vous participiez à des événements passionnants ou à des discussions enrichissantes, chaque expérience est une chance de grandir et de vous épanouir. Ne manquez pas cette occasion de faire partie d'une aventure humaine inoubliable !"}
            </p>
          </div>

          <h3 className="font-semibold">
            {!isForm1Validated && !isForm2Validated && !isForm3Validated
              ? "Rejoignez Senior Love aujourd'hui et commencez une nouvelle aventure riche en découvertes et en rencontres !"
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? 'Rejoignez-nous et découvrez un nouveau monde de possibilités. Chez Senior Love, chaque rencontre est une chance de créer des souvenirs mémorables !'
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? 'Un Voyage Vers de Nouvelles Connexions !'
                  : 'Prêt à Commencer Votre Aventure !'}
          </h3>
        </div>

        <img
          src={
            !isForm1Validated && !isForm2Validated && !isForm3Validated
              ? '/img/senior-love-guitar.webp'
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? '/img/senior-dancer.webp'
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? '/img/happy-senior-couple.webp'
                  : '/img/senior-field.webp'
          }
          alt={
            !isForm1Validated && !isForm2Validated && !isForm3Validated
              ? 'Un homme jouant de la guitare avec une femme à ses côtés.'
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? 'Un couple qui danse'
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? 'Un couple qui sourit'
                  : 'Un couple qui fait du trekking'
          }
          className="hidden md:block w-80 xl:w-1/3 xl:h-96 object-cover rounded-2xl shadow-xl"
        />
      </div>
    </article>
  );
}
