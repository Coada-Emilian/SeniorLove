interface ArticleRowProps {
  isForm1Validated: boolean;
  isForm2Validated: boolean;
  isForm3Validated: boolean;
}

export default function ArticleRow({
  isForm1Validated,
  isForm2Validated,
  isForm3Validated,
}: ArticleRowProps) {
  return (
    <article className="px-3 pt-12 md:px-12 xl:px-24 md:py-12 flex flex-col">
      <div className="flex flex-col mx-auto gap-3 md:flex-row md:px-16 md:items-center md:justify-between md:gap-12 lg:gap-24">
        <div className="flex flex-col gap-3 md:w-2/3">
          <h3 className="font-semibold">
            {!isForm1Validated && !isForm2Validated && !isForm3Validated
              ? "Bienvenue sur Senior Love, votre plateforme de rencontres et d'événements dédiée aux seniors dynamiques !"
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? "Senior Love, un espace conçu pour vous offrir bien plus qu'une simple rencontre !"
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? 'Rejoignez Senior Love et épanouissez-vous !'
                  : 'Bienvenue dans la communauté Senior Love ! Explorez les rencontres et les événements qui vous attendent !'}
          </h3>

          <div className="italic">
            {!isForm1Validated && !isForm2Validated && !isForm3Validated ? (
              <>
                <p>
                  Chez SeniorLove, nous croyons que la passion et la connexion
                  n&apos;ont pas d&apos;âge. Notre site unique combine les
                  rencontres en ligne avec des événements passionnants basés sur
                  vos centres d&apos;intérêt. Que vous soyez féru de jardinage,
                  amateur d&apos;art, passionné de voyages ou adepte de la
                  cuisine, SeniorLove vous offre l&apos;opportunité de :
                </p>
                <ul className="list-disc px-4">
                  <li>
                    Créer votre profil personnalisé et découvrir des profils
                    compatibles
                  </li>
                  <li>
                    Participer à des événements thématiques près de chez vous
                  </li>
                  <li>
                    Rencontrer des personnes partageant vos passions dans un
                    cadre convivial et sécurisé
                  </li>
                </ul>
              </>
            ) : (
              <p>
                {isForm1Validated && !isForm2Validated && !isForm3Validated
                  ? "Nous savons qu'il peut être intimidant de franchir le pas, mais soyez assuré que SeniorLove met tout en œuvre pour que votre expérience soit sécurisée, agréable et enrichissante. Chaque profil est vérifié avec soin par notre équipe pour garantir un environnement de confiance. Ici, vous ne ferez pas que rencontrer des personnes, vous créerez des liens autour de passions communes."
                  : isForm1Validated && isForm2Validated && !isForm3Validated
                    ? "Chez Senior Love, nous croyons que chaque étape de la vie est une opportunité d'explorer, de découvrir et de se reconnecter. Nous vous invitons à faire le premier pas vers une nouvelle aventure enrichissante. En rejoignant notre communauté, vous accédez à un réseau de personnes partageant vos passions et vos intérêts, prêtes à vivre des moments précieux avec vous. Ne laissez pas passer l'occasion de faire de nouvelles rencontres et de participer à des événements qui vous inspirent."
                    : "Félicitations ! Vous êtes sur le point de rejoindre une communauté où chaque moment compte. Chez Senior Love, nous croyons que chaque connexion est une opportunité d'apprendre et de partager. En finalisant votre inscription, vous aurez accès à un réseau de personnes passionnantes qui partagent vos intérêts. Préparez-vous à vivre des expériences enrichissantes et à rencontrer des amis qui vous ressemblent !"}
              </p>
            )}
          </div>
        </div>

        <img
          src={
            !isForm1Validated && !isForm2Validated && !isForm3Validated
              ? '/img/senior-forest.webp'
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? '/img/senior-friends-activities.webp'
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? '/img/senior-chess.webp'
                  : '/img/group.webp'
          }
          alt={
            !isForm1Validated && !isForm2Validated && !isForm3Validated
              ? 'Un homme enlaçant une femme.'
              : isForm1Validated && !isForm2Validated && !isForm3Validated
                ? 'Deux couples au théâtre tenant des accessoires'
                : isForm1Validated && isForm2Validated && !isForm3Validated
                  ? 'Deux couple qui joue aux échecs'
                  : 'Deux couples qui prennent une photo en groupe'
          }
          className="w-80 xl:w-1/3 xl:h-96 object-cover rounded-2xl shadow-xl mx-auto"
        />
      </div>
    </article>
  );
}
