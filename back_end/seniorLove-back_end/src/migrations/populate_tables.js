// Purpose: Populate users table via Sequelize

import { User, sequelize } from '../models/index.js';

console.log('Adding demo users...');
await User.bulkCreate([
  {
    name: 'Jacqueline',
    birth_date: '1950-05-15',
    description:
      "Je suis Jacqueline, une passionnée de lecture et de voyages. Depuis ma retraite, j'ai enfin le temps de dévorer tous les livres que je n'avais pas le temps de lire. J'adore également découvrir de nouveaux horizons, rencontrer des gens et explorer différentes cultures. Je suis particulièrement attirée par l'Asie, où j'ai passé plusieurs mois à voyager. En dehors de cela, je suis très impliquée dans le bénévolat, aidant les jeunes à réussir leur parcours scolaire. J'aime aussi jardiner, transformer ma cour en un petit paradis fleuri. La cuisine est une autre de mes passions, surtout la pâtisserie, que je partage avec mes amis lors de goûters que j'organise régulièrement.",
    gender: 'female',
    picture:
      'https://st4.depositphotos.com/22611548/38059/i/1600/depositphotos_380591824-stock-photo-portrait-happy-mature-woman-eyeglasses.jpg',
    email: 'jacqueline@example.com',
    password: 'jacqueline1950!',
    status: 'active',
  },
  {
    name: 'Michel',
    birth_date: '1948-11-02',
    description:
      "Je m'appelle Michel et je suis un passionné de photographie. Depuis mon plus jeune âge, j'ai toujours eu un appareil photo à la main, capturant des moments uniques de la vie. Après une carrière dans l'ingénierie, je me consacre maintenant entièrement à ma passion. J'aime particulièrement photographier la nature et les paysages, cherchant toujours à capturer la beauté du monde qui m'entoure. En dehors de la photographie, je suis un amateur de cyclisme. Je passe beaucoup de temps à parcourir les routes de campagne, profitant de l'air frais et du calme. Je suis également un grand fan de jazz, une musique qui m'accompagne souvent lors de mes escapades photographiques.",
    gender: 'male',
    picture:
      'https://images.pexels.com/photos/236214/pexels-photo-236214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'michel@example.com',
    password: 'michel1948@',
    status: 'active',
  },
  {
    name: 'Renée',
    birth_date: '1949-03-08',
    description:
      "Je suis Renée, une passionnée d'art et d'histoire. Après avoir travaillé comme enseignante pendant de nombreuses années, j'ai désormais plus de temps pour me consacrer à mes passions. J'adore visiter des musées et des expositions, m'imprégnant de la culture et des histoires qui s'y trouvent. Je suis également une amatrice de musique classique, que j'écoute régulièrement lors de mes moments de détente. J'aime aussi la peinture, une activité que je pratique moi-même à mes heures perdues. En plus de cela, je participe à des cours de yoga, une discipline que j'ai découverte récemment et qui m'aide à rester en forme et à me détendre.",
    gender: 'other',
    picture:
      'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'renee@example.com',
    password: 'renee1949#',
    status: 'active',
  },
  {
    name: 'Henri',
    birth_date: '1952-02-14',
    description:
      "Je suis Henri, un mélomane et amateur d'échecs. La musique classique me passionne depuis mon enfance. Je joue du violon dans un orchestre amateur et assiste régulièrement à des concerts. En dehors de la musique, j'aime jouer aux échecs, que ce soit contre des adversaires locaux ou en ligne. Je suis également un grand lecteur, avec une préférence pour les essais philosophiques et les romans historiques. J'aime aussi cuisiner, surtout des plats traditionnels français que je prépare avec soin pour mes amis et ma famille. Lorsqu'il me reste du temps libre, je pars en excursion pour découvrir de nouveaux lieux culturels, toujours à la recherche de nouvelles expériences artistiques.",
    gender: 'other',
    picture:
      'https://images.pexels.com/photos/3018993/pexels-photo-3018993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'henri@example.com',
    password: 'henri1952!',
    status: 'active',
  },
  {
    name: 'Simone',
    birth_date: '1953-07-29',
    description:
      "Je suis Simone, ancienne danseuse aujourd'hui reconvertie en sculptrice. La danse a longtemps été ma vie, et même si je ne danse plus, j'ai trouvé une nouvelle forme d'expression artistique dans la sculpture. Je crée des œuvres en argile et en bronze, inspirées par mes années de danse. J'aime également l'art en général, et je visite régulièrement des musées et des galeries. En dehors de mes créations, j'aime me promener en ville et m'imprégner de l'ambiance des quartiers historiques. Je suis une grande amatrice de jazz et de musique classique, et je participe à des ateliers de danse pour seniors où je partage mon expérience.",
    gender: 'female',
    picture:
      'https://images.pexels.com/photos/1786258/pexels-photo-1786258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'simone@example.com',
    password: 'simone#1953',
    status: 'active',
  },
  {
    name: 'André',
    birth_date: '1946-10-05',
    description:
      "Je m'appelle André, ancien professeur de mathématiques avec une passion pour l'apprentissage et la technologie. Depuis ma retraite, je me consacre à la lecture, explorant des sujets aussi variés que la philosophie, l'histoire et les sciences. J'aime également rester à jour avec les dernières innovations technologiques et j'utilise souvent mon ordinateur pour découvrir de nouvelles idées. Je suis aussi un grand amateur de jardinage, passant beaucoup de temps à entretenir mon jardin. En plus de cela, j'aime voyager et écrire, partageant mes réflexions sur un blog que je tiens régulièrement. Je suis très proche de ma famille et je passe souvent du temps avec mes enfants et petits-enfants.",
    gender: 'male',
    picture:
      'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'andre@example.com',
    password: 'andre1946@',
    status: 'active',
  },
  {
    name: 'Lucienne',
    birth_date: '1950-04-02',
    description:
      "Je suis Lucienne, une cuisinière passionnée, connue pour mes recettes savoureuses. J'adore expérimenter de nouvelles recettes et perfectionner mes techniques culinaires. En dehors de la cuisine, je suis une grande amatrice d'artisanat, créant des objets de décoration à partir de matériaux recyclés. J'aime recevoir des invités, organisant souvent des dîners pour mes amis et ma famille. Je passe aussi du temps dans mon jardin potager, cultivant des herbes et des légumes frais que j'utilise dans mes plats. Je suis très sociable, participant à des clubs de lecture et à des groupes de marche avec mes amis.",
    gender: 'female',
    picture:
      'https://images.pexels.com/photos/34540/old-lady-smile-beautiful-woman.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'lucienne@example.com',
    password: 'lucienne#1950',
    status: 'active',
  },
  {
    name: 'Gérard',
    birth_date: '1947-09-18',
    description:
      "Je m'appelle Gérard, un passionné de sport et de nature. J'ai passé ma vie à enseigner l'éducation physique, et même à la retraite, je reste actif en pratiquant la randonnée et le vélo. J'aime explorer les sentiers de montagne et profiter de la beauté de la nature. En dehors du sport, je suis un amateur de photographie, capturant les paysages que je découvre lors de mes randonnées. J'aime aussi cuisiner des plats simples et sains, souvent avec des ingrédients que je cultive moi-même. Ma famille et mes amis sont très importants pour moi, et je passe beaucoup de temps avec eux, partageant des repas et des moments de convivialité.",
    gender: 'male',
    picture:
      'https://images.pexels.com/photos/2421934/pexels-photo-2421934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'gerard@example.com',
    password: 'gerard@1947',
    status: 'active',
  },
  {
    name: 'Marie',
    birth_date: '1949-06-10',
    description:
      "Je suis Marie, une passionnée de jardinage et de lecture. Mon jardin est mon sanctuaire, un endroit où je peux passer des heures à planter, tailler et entretenir mes fleurs. J'aime particulièrement les roses, que je cultive avec soin. Quand je ne suis pas dans mon jardin, je suis probablement en train de lire un roman ou un livre d'histoire. Je fais partie d'un club de lecture où nous partageons nos découvertes littéraires. En plus de cela, j'aime voyager, surtout pour découvrir de nouveaux jardins botaniques et rencontrer d'autres passionnés de plantes. La nature est une source d'inspiration pour moi, et je cherche toujours à apprendre et à partager mes connaissances.",
    gender: 'female',
    picture:
      'https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'marie@example.com',
    password: 'marie#1949',
    status: 'active',
  },
  {
    name: 'Bernard',
    birth_date: '1951-12-20',
    description:
      "Je suis Bernard, un passionné d'histoire et de modélisme. Depuis toujours, je suis fasciné par les récits historiques, en particulier ceux qui concernent les guerres mondiales. J'ai passé des années à construire des maquettes de navires et d'avions de cette époque, une activité qui me détend et me passionne. En plus de cela, j'aime lire des biographies et des documentaires historiques. Je suis également un amateur de vin, et j'aime découvrir de nouvelles régions viticoles lors de mes voyages. En dehors de mes passions, je suis très impliqué dans ma communauté, organisant des conférences et des expositions sur l'histoire locale.",
    gender: 'male',
    picture:
      'https://images.pexels.com/photos/25758/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email: 'bernard@example.com',
    password: 'bernard1951!',
    status: 'active',
  },
  {
    name: 'Jacques',
    birth_date: '1945-05-14',
    description:
      'Je suis Jacques, un amateur de machines à écrire anciennes. Depuis ma retraite, je passe mes journées à restaurer ces machines et à les utiliser pour écrire des lettres et des histoires. J’apprécie le calme de mon atelier, où je peux me plonger dans des tâches manuelles et créatives. En dehors de cela, j’aime lire des romans classiques et m’intéresse à l’histoire des technologies de communication. Je passe aussi beaucoup de temps à partager mes connaissances avec d’autres passionnés lors de salons et d’expositions.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/senior-caucasian-man-using-vintage-typewriter-grayscale_53876-31560.jpg?t=st=1725032211~exp=1725035811~hmac=fd133fedfcf1cd11cfb5074c62b8d1bdeed30fa7c902b9c4c248c3e3f6500148&w=2000',
    email: 'jacques.dubois@example.com',
    password: 'jacques1945!',
    status: 'active',
  },
  {
    name: 'Henri',
    birth_date: '1942-07-22',
    description:
      'Je suis Henri, un passionné de téléphones anciens. J’aime collectionner et restaurer ces objets fascinants qui rappellent une époque révolue. Ma journée typique consiste à travailler sur mes téléphones, en réparant et en nettoyant les pièces pour les faire revivre. J’organise également des rencontres avec d’autres collectionneurs et amateurs de vintage, où nous échangeons des histoires et des techniques de restauration.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/old-man-holding-telephone_23-2148432087.jpg?t=st=1725032288~exp=1725035888~hmac=619f47b4e7d7b1d421a987f46bc01df2c5e1edda177b3a53c0eae830dd8e66ce&w=1060',
    email: 'henri.moreau@example.com',
    password: 'henri1942!',
    status: 'active',
  },
  {
    name: 'Paul',
    birth_date: '1938-11-01',
    description:
      'Je suis Paul, un amateur de photographie qui aime capturer des moments précieux avec mon appareil photo. J’ai passé ma vie à explorer le monde à travers l’objectif et à partager mes photos avec d’autres passionnés. Je consacre une grande partie de mon temps à prendre des photos lors de différents événements et paysages, tout en discutant des techniques et des équipements avec mes amis photographes.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/portrait-senior-man-with-camera-device-world-photography-day-celebration_23-2151657270.jpg?t=st=1725032354~exp=1725035954~hmac=5a956684a0deeafc69574ac1dd25227ad998b3c9fe64b0af8a95d7d234e066e0&w=2000',
    email: 'paul.lefebvre@example.com',
    password: 'paul1938!',
    status: 'active',
  },
  {
    name: 'Lucien',
    birth_date: '1947-02-10',
    description:
      'Je suis Lucien, un homme sage qui aime passer du temps dans des lieux calmes et paisibles. J’aime me promener et profiter de la tranquillité des espaces intérieurs, où je peux réfléchir et apprécier la simplicité de la vie. Je trouve du plaisir à observer les détails de mon environnement et à partager ces moments de calme avec les autres.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/old-man-posing-indoors-side-view_23-2149883573.jpg?t=st=1725032412~exp=1725036012~hmac=cd9635a4d9330751174c813c7cfa8e51c5ccac00cd5a1d87d5eaa33eff9642eb&w=1060',
    email: 'lucien.bernard@example.com',
    password: 'lucien1947!',
    status: 'active',
  },
  {
    name: 'Éric',
    birth_date: '1950-03-05',
    description:
      'Je suis Éric, un homme élégant qui aime s’habiller avec soin et profiter des belles journées ensoleillées. J’apprécie les moments passés en plein air, surtout lorsqu’ils me permettent de montrer mes tenues préférées. Je suis également passionné par la mode et l’élégance, ce qui se reflète dans chaque aspect de ma vie.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/senior-man-posing-white-shirt-hat_23-2149487991.jpg?t=st=1725032446~exp=1725036046~hmac=371f49f8f4c97c753d37f1a7c3f0942bb440b3aa4f99767716c81009ac87bb65&w=2000',
    email: 'eric.martin@example.com',
    password: 'eric1950!',
    status: 'active',
  },
  {
    name: 'Alain',
    birth_date: '1935-09-20',
    description:
      'Je suis Alain, un homme âgé qui aime se détendre dans les parcs et profiter de la nature. J’apprécie particulièrement les moments de repos sur un banc, où je peux observer les gens et profiter du paysage. C’est dans ces moments de calme que je me sens le plus connecté avec le monde qui m’entoure.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/front-view-old-man-sitting-bench_23-2150493075.jpg?t=st=1725032486~exp=1725036086~hmac=e828fbb7cdefd7fcf040257ab6678c3631da7433837adeff4f1111d641bd93aa&w=2000',
    email: 'alain.durand@example.com',
    password: 'alain1935!',
    status: 'active',
  },
  {
    name: 'Maurice',
    birth_date: '1949-12-30',
    description:
      'Je suis Maurice, un homme moyen qui apprécie de prendre des promenades régulières pour rester actif et en bonne santé. J’aime découvrir de nouveaux endroits tout en me maintenant en forme. Chaque promenade est une occasion pour moi de réfléchir et de profiter des petites choses de la vie.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-elderly-man-taking-stroll_23-2150168211.jpg?t=st=1725032669~exp=1725036269~hmac=233ff2f2329d68aea9400db57c6581fd1e390c6ca70bddf6e218639f10689d51&w=1060',
    email: 'maurice.lefevre@example.com',
    password: 'maurice1949!',
    status: 'active',
  },
  {
    name: 'Louis',
    birth_date: '1939-10-10',
    description:
      'Je suis Louis, un homme sage qui aime poser pour des photos et capturer des moments précieux de la vie. J’apprécie particulièrement les séances photo en studio, où je peux exprimer ma personnalité et partager des instants de ma vie avec les autres.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/wise-senior-man-posing-indoors-front-view_23-2149883531.jpg?t=st=1725032688~exp=1725036288~hmac=00da6a70e10d070217905040c9ae39e5ee3cbe536bda730782877c5ca025b0c9&w=2000',
    email: 'louis.chevalier@example.com',
    password: 'louis1939!',
    status: 'active',
  },
  {
    name: 'Claude',
    birth_date: '1948-08-14',
    description:
      'Je suis Claude, un homme âgé qui aime porter des chapeaux élégants. J’apprécie les jours ensoleillés où je peux me promener en extérieur tout en mettant en avant mes accessoires de mode préférés. La mode et le style sont importants pour moi et me permettent de m’exprimer au quotidien.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/front-view-elderly-man-wearing-hat_23-2150168218.jpg?t=st=1725032702~exp=1725036302~hmac=e628aa1b46fc24db9bc765e2337ca4f96ccda8e1678649bba7171ae692481ddb&w=2000',
    email: 'claude.dupuis@example.com',
    password: 'claude1948!',
    status: 'active',
  },
  {
    name: 'Gérard',
    birth_date: '1941-06-23',
    description:
      'Je suis Gérard, un homme élégant qui aime passer du temps dans les parcs en automne. J’apprécie les belles couleurs de la saison et la tranquillité des environnements naturels. C’est un moment parfait pour moi pour me détendre et réfléchir, tout en admirant la beauté du monde autour de moi.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/elegant-old-man-sunny-autumn-park_1157-19117.jpg?t=st=1725032718~exp=1725036318~hmac=c51b06eedbd5636c8a049ceb49ff0d0ac28f2d4c276c16bb430d7aa8e03c51ec&w=2000',
    email: 'gerard.petit@example.com',
    password: 'gerard1941!',
    status: 'active',
  },
  {
    name: 'Henri',
    birth_date: '1943-04-08',
    description:
      'Je suis Henri, un homme confronté à la maladie d’Alzheimer. Malgré les défis, je reste passionné par les choses simples de la vie, en trouvant de la joie dans les petites interactions quotidiennes. Je suis entouré de ma famille et de mes amis qui m’aident à rester actif et engagé dans ma communauté.',
    gender: 'male',
    picture:
      'https://img.freepik.com/free-photo/senior-man-confronting-alzheimer-disease_23-2149043798.jpg?t=st=1725032739~exp=1725036339~hmac=16f199af73f5903d8bbf89394830fa6ea1ee1a02fd023a0ecdfad5834e07e725&w=2000',
    email: 'henri.lefevre@example.com',
    password: 'henri1943!',
    status: 'active',
  },
  {
    name: 'Sophie',
    birth_date: '1940-03-12',
    description:
      'Je suis Sophie, une femme pleine de vie qui aime bousculer les conventions. J’adore me sentir libre et faire ce que bon me semble, tout en étant entourée de mes proches. Mon quotidien est rempli de petites aventures et de moments amusants, et je trouve du plaisir à partager ces expériences avec ceux qui m’entourent.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-rebellious-granny-portrait_23-2151310001.jpg?t=st=1725032326~exp=1725035926~hmac=ae7bb47a9dbfe88b1f31faa77599cd27e0fa07dbc53335c8bc071076b6984ff1&w=1060',
    email: 'sophie.lambert@example.com',
    password: 'sophie1940!',
    status: 'active',
  },
  {
    name: 'Marie',
    birth_date: '1937-08-20',
    description:
      'Je suis Marie, une femme qui aime vivre chaque jour avec passion et énergie. J’apprécie les petits plaisirs de la vie, comme lire un bon livre ou explorer de nouveaux endroits. Je suis également une grande admiratrice de la nature, et je passe souvent du temps à me balader et à profiter des paysages.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-rebellious-granny-portrait_23-2151310207.jpg?t=st=1725032428~exp=1725036028~hmac=7d963acb317cf812b4aa36cfebd618769cd4bd82bda331bfca4da85e5e9eb53f&w=1060',
    email: 'marie.dupont@example.com',
    password: 'marie1937!',
    status: 'active',
  },
  {
    name: 'Catherine',
    birth_date: '1945-05-10',
    description:
      'Je suis Catherine, une passionnée de littérature et d’aventures. Depuis ma retraite, je me plonge dans des livres fascinants et découvre des histoires qui m’inspirent. J’aime aussi voyager et explorer des lieux inédits, tout en capturant mes souvenirs avec des photos.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-rebellious-granny-portrait_23-2151310100.jpg?t=st=1725032509~exp=1725036109~hmac=4fd404c05c3ac32fe4764bc09a8e0f8abb70f6f9c51c55768949e106deabab58&w=1060',
    email: 'catherine.moreau@example.com',
    password: 'catherine1945!',
    status: 'active',
  },
  {
    name: 'Claire',
    birth_date: '1948-07-25',
    description:
      'Je suis Claire, une amoureuse des livres et de la culture. Je passe mes journées à lire des romans captivants et à discuter de littérature avec mes amis. Je trouve également du plaisir à participer à des clubs de lecture et à des événements culturels.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-old-woman-holding-book_23-2148695396.jpg?t=st=1725032470~exp=1725036070~hmac=0434c49b63806c8fd59962458098e2c30c33fc6c2ed6ceda54bd1b6a639b0678&w=2000',
    email: 'claire.martin@example.com',
    password: 'claire1948!',
    status: 'active',
  },
  {
    name: 'Élise',
    birth_date: '1939-09-15',
    description:
      'Je suis Élise, une femme qui aime profiter de la vie à la plage. J’adore les journées ensoleillées passées au bord de l’eau, où je peux me détendre et savourer chaque instant. La plage est mon lieu de prédilection pour me ressourcer et apprécier les simples plaisirs de la vie.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/medium-shot-old-woman-beach_23-2148442032.jpg?t=st=1725032536~exp=1725036136~hmac=b949726b6056da627a51803fe2bbde501b6d8e20cdf9c88e8d5279d00800c63c&w=1060',
    email: 'elise.dubois@example.com',
    password: 'elise1939!',
    status: 'active',
  },
  {
    name: 'Hélène',
    birth_date: '1942-11-05',
    description:
      'Je suis Hélène, une femme sage qui aime profiter des moments de tranquillité. J’apprécie particulièrement les séances photo en studio, où je peux exprimer ma personnalité et mes émotions à travers l’objectif. Ces moments de réflexion me permettent de me sentir épanouie et sereine.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/wise-woman-posing-studio-side-view_23-2149883509.jpg?t=st=1725032560~exp=1725036160~hmac=2b88b1824d793633e40cfa21a9ed6910e6a59f567a1a5c3999679f7cceb969dd&w=1060',
    email: 'helene.lefebvre@example.com',
    password: 'helene1942!',
    status: 'active',
  },
  {
    name: 'Jacqueline',
    birth_date: '1936-06-14',
    description:
      'Je suis Jacqueline, une femme enthousiaste qui aime capturer les moments simples de la vie. J’apprécie les moments passés en compagnie d’une tasse de café, à discuter avec des amis ou à lire un bon livre. Ces instants de détente sont précieux et me permettent de rester connectée avec le monde qui m’entoure.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/elderly-woman_23-2148138608.jpg?t=st=1725032587~exp=1725036187~hmac=95441bbdb490eec1fc0398209e9a5ea42b2ef88aceca2e87a4b7f00a67889083&w=1380',
    email: 'jacqueline.morel@example.com',
    password: 'jacqueline1936!',
    status: 'active',
  },
  {
    name: 'Martine',
    birth_date: '1944-04-18',
    description:
      'Je suis Martine, une femme qui aime commencer sa journée avec une bonne tasse de café. Je trouve du réconfort et du plaisir dans ces moments de calme, où je peux me détendre et apprécier le début de chaque journée. J’aime également partager ces moments avec mes amis dans un café local.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/elderly-woman-drinking-coffee-cafe_23-2149260218.jpg?t=st=1725032604~exp=1725036204~hmac=5d65f34480da1e6309f82451fb6af55cce4cf8137941bd985b7ed38f60646e4b&w=1060',
    email: 'martine.roy@example.com',
    password: 'martine1944!',
    status: 'active',
  },
  {
    name: 'Gabrielle',
    birth_date: '1952-12-01',
    description:
      'Je suis Gabrielle, une femme qui aime capturer la beauté de la vie à travers des portraits. J’apprécie particulièrement les moments où je peux prendre des photos en gros plan, mettant en valeur les détails et les expressions uniques des personnes que je rencontre.',
    gender: 'female',
    picture:
      'https://img.freepik.com/free-photo/close-up-portrait-senior-woman_23-2149207235.jpg?t=st=1725032623~exp=1725036223~hmac=33532adeece95d068f5d67a9dbbb6432c5be06384329d6af4aabe98d26b0b898&w=2000',
    email: 'gabrielle.fournier@example.com',
    password: 'gabrielle1952!',
    status: 'active',
  },
]);

console.log('✅ Migration is OK ! ...');
await sequelize.close();
