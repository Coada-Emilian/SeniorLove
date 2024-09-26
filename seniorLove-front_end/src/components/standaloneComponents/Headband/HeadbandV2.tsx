import Logo from '/icon/logo-pink-background.png';

function HeadbandV2() {
  return (
    <div className="bg-white p-6 rounded-lg mx-auto font-bold text-primaryText w-full">
      <article className="text-center w-full">
        <p className="mb-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <span className="text-secondaryPink font-bold">
            &quot;Partagez Vos Passions,
          </span>{' '}
          Créez des Connexions&quot;
        </p>

        <img
          src={Logo}
          alt="Senior Love icon"
          className="mx-auto w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 xl:w-38 xl:h-38 object-contain"
        />
      </article>
    </div>
  );
}

export default HeadbandV2;
