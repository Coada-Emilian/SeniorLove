export default function ConnectionArticleRow() {
  return (
    <article className=" px-3 pt-12 md:px-12 xl:px-24 md:py-12 flex flex-col">
      <div className="flex flex-col mx-auto gap-3 md:flex-row md:px-16 md:items-center md:justify-between md:gap-12 lg:gap-24">
        <div className="flex flex-col gap-3 md:w-2/3">
          <h3 className="font-semibold">
            Votre destination privilégiée pour des rencontres enrichissantes et
            des événements passionnants, exclusivement conçus pour les seniors
            actifs et engagés !
          </h3>

          <p>
            Chez Senior Love, nous sommes convaincus que chaque étape de la vie
            offre de nouvelles opportunités pour la passion et la connexion.
            Notre plateforme unique allie la magie des rencontres en ligne avec
            des événements captivants qui correspondent à vos passions et à vos
            intérêts personnels. Que vous soyez passionné de littérature,
            amateur de musique, voyageur dans l’âme, ou fervent défenseur de la
            cuisine, Senior Love est la communauté idéale pour vous.
          </p>
        </div>
        <img
          src="/img/senior-laugh.webp"
          alt="Un couple senior sur la plage, la femme affichant un sourire joyeux en regardant son compagnon."
          className="w-80  xl:w-1/3 xl:h-96 object-cover rounded-2xl shadow-xl mx-auto"
        />
      </div>
    </article>
  );
}
