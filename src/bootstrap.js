'use strict';

module.exports = async (strapi) => {
  // Check if our data already exists
  const existing = await strapi.documents('api::category.category').findMany({
    filters: { categoryId: { $eq: 'dossier1' } },
  });

  if (existing && existing.length > 0) {
    console.log('Gattegno data already seeded, skipping.');
    return;
  }

  console.log('Seeding Gattegno CMS data...');

  // Delete any leftover entries from the blog template
  const oldEntries = await strapi.documents('api::category.category').findMany();
  for (const entry of oldEntries) {
    await strapi.documents('api::category.category').delete({
      documentId: entry.documentId,
    });
  }

  // Set public permissions
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (publicRole) {
    const actions = ['find', 'findOne'];
    for (const action of actions) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::category.category.${action}`,
          role: publicRole.id,
        },
      });
    }
  }

  // Seed categories
  const categories = [
    {
      categoryId: 'event',
      title: 'Events',
      image: '',
      href: '',
      order: 0,
      documents: [
        { __component: 'shared.document', slug: 'losangeles', title: 'Los Angeles meeting 18/8/2010', smallTitle: '' },
        { __component: 'shared.document', slug: 'paris', title: 'Paris reunion 15/05/2011', smallTitle: '' },
        { __component: 'shared.document', slug: 'israel', title: 'Israel meeting 23/10/2015', smallTitle: '' },
        { __component: 'shared.document', slug: 'telaviv', title: 'Tel Aviv conference', smallTitle: '' },
        { __component: 'shared.document', slug: 'thessaloniki', title: 'Thessaloniki conference', smallTitle: '' },
      ],
    },
    {
      categoryId: 'introduction',
      title: 'Introduction',
      image: 'templatemo_logo.jpg',
      href: '/introduction',
      order: 1,
      documents: [],
      textFr: "Soyez les bienvenus sur le site des Gattegno et des familles parentes par alliance, qui a pour vocation première, une meilleure connaissance de nos ancêtres rabbins, la préservation de cet extraordinaire héritage, la compréhension des liens qui nous unissent et enfin de fournir à chacun la possibilité de se contacter, de se rencontrer. Salonique, la Jérusalem des Balkans, où notre famille originaire d\u00b4Aragon, vient s\u00b4établir à l\u00b4aube du 17e siècle après avoir préalablement séjourné au Danemark. Dès lors les Gattegno fournissent à la communauté salonicienne pendant près de trois siècles, une suite ininterrompue de rabbins, savants, de penseurs, d\u00b4écrivains et de chefs spirituels qui lui valent une place importante dans les annales du judaïsme oriental. La synagogue Aragon où prédominaient les Gattegno était d\u00b4ailleurs surnommée \" Cal del gato \", en raison de l\u00b4importance de notre famille, véritable poumon et cœur de cette congrégation. Qui sont les Gattegno où descendants d\u00b4aujourd\u00b4hui ? Des hommes et des femmes qui partagent tous ce même héritage génétique et qui à leur manière font l\u00b4histoire dans des domaines aussi divers que l\u00b4architecture, les mathématiques, la photographie, la recherche scientifique, la littérature, le commerce, le journalisme, l\u00b4immobilier etc. Toutes aussi diverses sont nos pratiques religieuses, juive évidemment mais aussi catholique, protestante  et tant mieux pour nous les Gattegno du monde que cette ouverture  et cette universalité. Aujourd\u00b4hui bien que décimée par la shoah, notre famille Gattegno et parentés  reliés dans l\u00b4 arbre,  comptent environ 800 personnes de par le monde et augmentent de manière constante au fil des recherches. Merci à vous tous pour votre aimable collaboration à ce projet.\n\nIsaac  Gattegno (1895-1962)\n\nFrancis  Gattegno",
      textEn: "Welcome to the Gattegno family website, which aims to provide a better understanding of the Gattegno family tree and the families formed by marriage, along with a better understanding and appreciation for the great Gattegno rabbinic legacy in Salonika.  In preserving this family heritage, one hopefully gains a better knowledge of their ancestry, and in doing so, opportunities are created for people to communicate, and ultimately, to meet and get to know one another. The Gattegnos, originally from the Aragon region of Spain, set up residence in Salonika, the \"Jerusalem of the Balkans\" in the early 17th century after a prior residence in Denmark.  (Interestingly, many Aragon Jews found refuge in the Scandinavian countries after their expulsion from Spain in the 15th century).  For three centuries in Ottoman Salonika, the Gattegnos provided an uninterrupted legacy of rabbis, scholars, judges, intellects, writers, and spiritual leaders of great importance in the annals of Eastern Judaism to the Salonika community.  Logically therefore, the Gattegno family formed the veritable heart and core of Salonika's synagogue Aragon, which was nicknamed Cal del Gato in reference to the Gattegno family's proeminence and status in the community. Who makes up the Gattegno family and their descendants today?  Men and women today who share the same Gattegno genetic heritage are making their own historical strides in fields as diverse as architecture, mathematics, photography, scientific research, literature, commerce, journalism, and real estate.  Equally diverse are today's religious practices among the Gattegnos, some, understandably, practice Judaism, while others practice Catholicism and  Protestantism.  How fortunate for the Gattegnos that in embracing diversity, their heritage continues all over the world. Although the Gattegno family was dramatically reduced by the Holocaust, today about 800 people around the world knowingly descend from the family tree.  This number continues to advance steadily as research into the family tree advances.  Thank you to you all for your kind collaboration in this massive project.",
    },
    {
      categoryId: 'dossier1',
      title: 'DE GATINES A MONZON 1250 - 1492',
      image: 'dossier1.jpg',
      href: '/category/dossier1',
      order: 2,
      documents: [
        { __component: 'shared.document', slug: 'introduction', title: 'Introduction', smallTitle: '' },
        { __component: 'shared.document', slug: 'origin', title: 'Origine du nom Gattegno', smallTitle: '' },
        { __component: 'shared.document', slug: 'expulsion', title: "L'expulsion de France vers la Provence et l'Espagne", smallTitle: '' },
        { __component: 'shared.document', slug: 'refugies', title: 'Juifs de France réfugiés en Aragon de Yom Tov Assis', smallTitle: '' },
        { __component: 'shared.document', slug: 'cartes', title: 'Cartes', smallTitle: '' },
        { __component: 'shared.document', slug: 'listeMonzon', title: 'Una lista de judios de Monzon en 1397 de R. PITA MERCE / Une liste des Juifs de Monzon en 1397 de R. Pita Merce', smallTitle: 'Une liste des Juifs de Monzon en 1397' },
        { __component: 'shared.document', slug: 'listeTarrega', title: 'Algunes noticies sobre els Jueus de Tarrega 1303 - 1486 / Une liste des Juifs de Tarrega 1303 \u2013 1486', smallTitle: 'Algunes noticies sobre els Jueus de Tarrega 1303-1486' },
        { __component: 'shared.document', slug: 'seepharades', title: 'Apellidos sefardis de los Balcanes y del Oriente medio, existentes entre los judios medievales de Lerida y Huesca Dr R. Pita Merce / Noms s\u00e9pharades des Balkans et du Moyen Orient des Juifs provenant de Lerida et Huesca de R. Pita Merce', smallTitle: 'Apellidos sefardis de los Balkanes' },
        { __component: 'shared.document', slug: 'lerida', title: 'Los ultimos a\u00f1os de existencia de la Aljama Hebrea de Lerida ( 1490 - 1492 ) de R. Pita Merce / Les derni\u00e8res ann\u00e9es d\u2019existence de la communaut\u00e9 hebraique de Lerida ( 1490 \u2013 1492 )', smallTitle: 'Los ultimos a\u00f1os de existencia de la Aljama de Lerida' },
        { __component: 'shared.document', slug: 'ordre', title: 'Los judios de Monzon y la orden de San Juan de Jerusalem ( 1317 \u2013 1492 ) de M. A. Motis Dolader / Les juifs de Monzon et l\u2019ordre de San Juan de Jerusalem ( 1317 \u2013 1492 ) de M. A. Motis Dolader', smallTitle: 'Los judios de Monzon' },
      ],
    },
    {
      categoryId: 'dossier2',
      title: 'SALONIQUE ET SES GATTEGNO',
      image: 'dossier2.jpg',
      href: '/category/dossier2',
      order: 3,
      documents: [
        { __component: 'shared.document', slug: 'introduction', title: 'Introduction', smallTitle: '' },
        { __component: 'shared.document', slug: 'illustrations', title: 'Illustrations de Salonique', smallTitle: '' },
        { __component: 'shared.document', slug: 'historique', title: 'Historique de Salonique', smallTitle: '' },
        { __component: 'shared.document', slug: 'salonique', title: "Ce qu'\u00e9tait la communaut\u00e9 juive de Salonique a la veille de la catastrophe (extrait de In memoriam de M. Molho)", smallTitle: '' },
        { __component: 'shared.document', slug: 'jewish', title: 'Jewish community of Thessaloniki La communaut\u00e9 juive de Th\u00e9ssalonique', smallTitle: '' },
        { __component: 'shared.document', slug: 'gatigno', title: 'Gatigno in the jewish encyclopedies Extrait d\u2019encyclop\u00e9dies juives pour Gatigno', smallTitle: '' },
        { __component: 'shared.document', slug: 'synagogue', title: 'La synagogue Aragon et les Gattegno (extraits de Traditions & Customs of the sephardic jews of Salonica de M. Molho et Histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'gattegnoSalonique', title: 'Les Gattegno de Salonique en images', smallTitle: '' },
        { __component: 'shared.document', slug: 'artisanat', title: "Les juifs de Salonique dans l'artisanat, l'industrie et le commerce (extrait de In m\u00e9moriam de M. Molho)", smallTitle: '' },
        { __component: 'shared.document', slug: 'registres', title: 'Extrait des registres du consulat espagnol de Salonique en 1916', smallTitle: '' },
        { __component: 'shared.document', slug: 'thessaloniki', title: 'The jewish cementery in Thessaloniki. Le cimeti\u00e8re juif de Salonique de D. Gal et M. Silber', smallTitle: '' },
        { __component: 'shared.document', slug: 'necropole', title: 'La N\u00e9cropole juive de Th\u00e9ssalonique de M. Molho', smallTitle: '' },
        { __component: 'shared.document', slug: 'cementerio', title: 'El cementerio judio de Salonica verdadero museo epigrafico historico y arqueologico de M. Molho. Le cimeti\u00e8re juif de Salonique, v\u00e9ritable mus\u00e9e \u00e9pigraphique, historique et arqu\u00e9ologique', smallTitle: '' },
      ],
    },
    {
      categoryId: 'dossier3',
      title: 'LES GRANDS RABBINS GATTEGNO',
      image: 'dossier3.jpg',
      href: '/category/dossier3',
      order: 4,
      documents: [
        { __component: 'shared.document', slug: 'introduction', title: 'Introduction', smallTitle: '' },
        { __component: 'shared.document', slug: 'organisation', title: 'Organisation de la communaut\u00e9 juive de Salonique (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'abrahamI', title: 'Abraham (I) Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'benvenisteI', title: 'Benveniste (I) Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'abrahamII', title: 'Abraham (II) Benveniste Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'benvenisteII', title: 'Benveniste (II) moise Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'abrahamIII', title: 'Abraham (III) Benveniste Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'benvenisteIII', title: 'Benveniste (III) moise Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'abrahamIV', title: 'Abraham (IV) Benveniste Gattegno (Extrait histoire des isra\u00e9lites de Salonique de Joseph Nehama)', smallTitle: '' },
        { __component: 'shared.document', slug: 'ouvrages', title: 'Liste des ouvrages publi\u00e9s par les rabbins Gattegno', smallTitle: '' },
        { __component: 'shared.document', slug: 'ecoles', title: "Les \u00e9coles de l'Alliance isra\u00e9lite universelle", smallTitle: '' },
      ],
    },
    {
      categoryId: 'dossier4',
      title: 'IN MEMORIAM',
      image: 'dossier4.jpg',
      href: '/category/dossier4',
      order: 5,
      documents: [
        { __component: 'shared.document', slug: 'introduction', title: 'Introduction', smallTitle: '' },
        { __component: 'shared.document', slug: 'hommage', title: 'Hommage aux victimes juives des nazis de Gr\u00e8ce de M. Molho', smallTitle: '' },
        { __component: 'shared.document', slug: 'holocaust', title: 'The holocaust in Salonika de Steven Bowman', smallTitle: '' },
        { __component: 'shared.document', slug: 'history', title: 'History of the jews of Thessaloniki and the holocaust by Paul Isaac Hagouel', smallTitle: '' },
        { __component: 'shared.document', slug: 'liste', title: 'Liste allemande des juifs originaires de Gr\u00e8ce', smallTitle: '' },
        { __component: 'shared.document', slug: 'agonie', title: 'L\u2019agonie de la salonique juive', smallTitle: '' },
      ],
    },
    {
      categoryId: 'dossier5',
      title: 'Tree branches',
      image: 'arbre4.gif',
      href: '/category/dossier5',
      order: 6,
      documents: [
        { __component: 'shared.document', slug: 'abram', title: "Abram Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'isaac', title: "Isaac Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'daniel', title: "Daniel Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'samuel', title: "Samuel Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'levy', title: "Levy Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'salomon', title: "Salomon Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'shmuel', title: "Shmuel Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'bella', title: "Bella Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'jacob', title: "Jacob Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'baruch', title: "Baruch Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'menahem', title: "Menahem Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'yehuda', title: "Yehuda Gattegno's descendance", smallTitle: '' },
        { __component: 'shared.document', slug: 'benveniste', title: "Benveniste Samuel Gattegno's descendance", smallTitle: '' },
      ],
    },
  ];

  for (const category of categories) {
    try {
      await strapi.documents('api::category.category').create({
        data: category,
      });
      console.log(`Created category: ${category.categoryId}`);
    } catch (error) {
      console.error(`Failed to create ${category.categoryId}:`, error.message);
    }
  }

  console.log('Gattegno CMS seeding complete.');
};
