export default function ConnectionArticleReverse() {
  return (
    <article className="px-3 md:px-12 xl:px-24 py-12 flex flex-col">
      <div className="flex flex-col gap-3 md:flex-row-reverse md:px-16 md:items-center md:justify-between md:gap-12 lg:gap-24">
        <div className="flex flex-col gap-3 md:w-2/3">
          <p>
            Que vous soyez en quête d’une relation amoureuse, de nouvelles
            amitiés ou simplement de moments de partage autour de vos passions,
            Senior Love est là pour répondre à vos désirs. Notre plateforme est
            conçue pour vous connecter avec des personnes qui partagent vos
            intérêts, tout en vous proposant des événements captivants et des
            activités enrichissantes.
          </p>

          <h3 className="font-semibold">
            Rejoignez-nous dès aujourd&apos;hui sur Senior Love et lancez-vous
            dans une nouvelle aventure pleine de découvertes, de rencontres et
            de moments mémorables !
          </h3>
        </div>

        <img
          src="/img/senior-yoga.webp"
          alt="Couple pratiquant le yoga ensemble dans un espace lumineux et paisible."
          className="hidden md:block w-80 xl:w-1/3 xl:h-96 object-cover rounded-2xl shadow-xl"
        />
      </div>
    </article>
  );
}
