import Logo from '/icon/logo-pink-background.png';

function HeadbandV1() {
  return (
    <div className="bg-white p-6 rounded-lg mx-auto font-bold text-primaryText w-full">
      <article className="text-center w-full">
        <p className="mb-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <span className="text-secondaryPink font-bold">Senior Love</span> : le
          site de rencontre pour les 60 ans et plus
        </p>

        <img
          src={Logo}
          alt="Senior Love icon"
          className="hidden mx-auto w-14 h-14 sm:block sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 xl:w-38 xl:h-38 object-contain"
        />
      </article>
    </div>
  );
}

export default HeadbandV1;
