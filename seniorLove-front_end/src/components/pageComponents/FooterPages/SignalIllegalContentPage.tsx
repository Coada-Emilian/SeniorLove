export default function SignalIllegalContentPage() {
  return (
    <main className="w-full bg-pink-200 px-4">
      <h1 className="text-2xl md:text-3xl font-bold bg-primaryText text-white py-5 text-center mx-[-1rem] md:mx-[-1.5rem]">
        Signaler un contenu illégal
      </h1>
      <section className="mt-24 mb-24 md:mt-64 md:mb-64 text-lg font-semibold text-center">
        <p>
          Si vous souhaitez signaler un profil ou un contenu illégal, n'hésitez
          pas à nous contacter à l'adresse suivante : {}
          <a
            href="mailto:support@seniorlove.fr"
            className="text-blue-500 underline"
          >
            support@seniorlove.fr
          </a>{' '}
          ou nous appeler au{' '}
          <a href="tel:+33123456789" className="text-blue-500 underline">
            +33 (0)1 23 45 67 89
          </a>
          .
        </p>
      </section>
    </main>
  );
}
