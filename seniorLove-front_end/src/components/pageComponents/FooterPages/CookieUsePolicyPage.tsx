export default function CookieUsePolicyPage() {
  return (
    <main className="w-full bg-pink-200 px-4">
      <h1 className="text-2xl md:text-3xl font-bold bg-primaryText text-white py-5 text-center mx-[-1rem] md:mx-[-1.5rem]">
        Politique de cookies
      </h1>
      <section>
        <h2 className="text-xl font-bold mb-4 mt-4">
          Bienvenue dans la Politique de cookies de Senior Love !
        </h2>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Chez SeniorLove, nous nous engageons à être clairs et transparents sur
          la manière dont nous collectons et utilisons les données que vous nous
          communiquez. Cette page est conçue pour vous informer sur notre
          utilisation des cookies et pour vous expliquer comment les gérer.
        </p>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Vous savez déjà tout sur les cookies et souhaitez ajuster vos
          paramètres ? Pas de problème. Rendez-vous sur{' '}
          <a href="#" className="text-primaryBlue underline">
            Paramètres des cookies
          </a>{' '}
          pour mettre à jour vos préférences sur ce site ou accédez aux
          paramètres de votre compte dans l'application pour ajuster vos options
          de confidentialité.
        </p>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Si vous souhaitez en savoir plus sur les cookies et comment nous les
          utilisons, poursuivez votre lecture.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">
          Qu’est-ce qu’un cookie ?
        </h2>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Les cookies sont de petits fichiers texte placés sur votre navigateur
          ou dans la mémoire de votre appareil. Ils contiennent généralement des
          informations telles que le nom du domaine d’où ils proviennent, leur
          durée de vie et un identifiant unique. Ils peuvent aussi stocker des
          informations sur votre appareil, vos paramètres d’utilisateur ou vos
          activités de navigation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 mt-4">
          Types de cookies utilisés
        </h2>

        <h3 className="text-lg font-bold mb-4">
          Cookies de première partie et de tiers
        </h3>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Les cookies de première partie sont directement déposés par SeniorLove
          pour, par exemple, adapter le site à vos préférences linguistiques.
          Les cookies de tiers, eux, sont placés par nos partenaires et
          prestataires de services. Consultez notre outil de gestion des
          consentements pour plus de détails sur ces partenaires.
        </p>

        <h3 className="text-lg font-bold mb-4">
          Cookies de session et persistants
        </h3>

        <p className="mb-4 text-justify text-base md:text-lg italic">
          Les cookies de session sont temporaires et sont supprimés lorsque vous
          fermez votre navigateur, tandis que les cookies persistants restent
          plus longtemps. Ces derniers vous permettent, par exemple, de vous
          reconnecter rapidement à notre site.
        </p>
      </section>

      <h2 className="text-xl font-bold mb-4 mt-4">
        Pourquoi utilisons-nous des cookies ?
      </h2>

      <p className="mb-4 text-justify text-base md:text-lg italic">
        Nous utilisons des cookies pour fournir, sécuriser et améliorer nos
        services. Cela inclut mémoriser vos préférences, reconnaître vos visites
        sur le site, et mesurer l’efficacité de nos campagnes marketing.
      </p>

      <section>
        <h3 className="text-lg font-bold mb-4">Types de cookies</h3>

        <table className="w-full mb-4 border-collapse border border-primaryText">
          <thead className="bg-primaryText text-white">
            <tr>
              <th className="border border-primaryText px-2 py-2 text-left">
                Type de cookies
              </th>
              <th className="border border-primaryText px-2 py-2 text-left">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-primaryText px-2 py-2">
                Cookies essentiels
              </td>
              <td className="border border-primaryText px-2 py-2">
                Ces cookies sont strictement nécessaires pour vous fournir nos
                services, comme vous permettre de vous connecter, mémoriser vos
                préférences et assurer votre sécurité.
              </td>
            </tr>
            <tr>
              <td className="border border-primaryText px-2 py-2">
                Cookies analytiques
              </td>
              <td className="border border-primaryText px-2 py-2">
                Ces cookies nous servent à comprendre comment nos services sont
                utilisés et nous aident à personnaliser et améliorer
                l'expérience.
              </td>
            </tr>
            <tr>
              <td className="border border-primaryText px-2 py-2">
                Cookies publicitaires
              </td>
              <td className="border border-primaryText px-2 py-2">
                Ces cookies permettent de personnaliser les annonces
                publicitaires et mesurer leur efficacité.
              </td>
            </tr>
            <tr>
              <td className="border border-primaryText px-2 py-2">
                Cookies réseaux sociaux
              </td>
              <td className="border border-primaryText px-2 py-2">
                Ces cookies vous permettent de partager des contenus sur les
                réseaux sociaux.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <h2 className="text-xl font-bold mb-4 mt-4">
        Comment gérer vos cookies ?
      </h2>
      <p className="mb-4 text-justify text-base md:text-lg italic">
        Vous pouvez ajuster vos préférences à tout moment via notre outil de
        gestion des cookies dans les{' '}
        <a href="#" className="text-primaryBlue underline">
          Paramètres des cookies
        </a>{' '}
        ou dans les paramètres de votre compte sur l’application.
      </p>
    </main>
  );
}
