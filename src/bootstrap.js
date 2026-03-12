'use strict';

async function seedGattegnoData() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up Gattegno CMS...');
      await importSeedData();
      console.log('Gattegno CMS ready');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

async function createEntry({ model, entry }) {
  try {
    await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

const categories = [
  {
    categoryId: 'event',
    title: 'Events',
    image: '',
    href: '',
    order: 0,
    documents: [
      { __component: 'shared.document', documentId: 'losangeles', title: 'Los Angeles meeting 18/8/2010', smallTitle: '' },
      { __component: 'shared.document', documentId: 'paris', title: 'Paris reunion 15/05/2011', smallTitle: '' },
      { __component: 'shared.document', documentId: 'israel', title: 'Israel meeting 23/10/2015', smallTitle: '' },
      { __component: 'shared.document', documentId: 'telaviv', title: 'Tel Aviv conference', smallTitle: '' },
      { __component: 'shared.document', documentId: 'thessaloniki', title: 'Thessaloniki conference', smallTitle: '' },
    ],
  },
  {
    categoryId: 'introduction',
    title: 'Introduction',
    image: 'templatemo_logo.jpg',
    href: '/introduction',
    order: 1,
    documents: [],
  },
  {
    categoryId: 'dossier1',
    title: 'DE GATINES A MONZON 1250 - 1492',
    image: 'dossier1.jpg',
    href: '/category/dossier1',
    order: 2,
    documents: [
      { __component: 'shared.document', documentId: 'introduction', title: 'Introduction', smallTitle: '' },
      { __component: 'shared.document', documentId: 'origin', title: 'Origine du nom Gattegno', smallTitle: '' },
      { __component: 'shared.document', documentId: 'expulsion', title: "L'expulsion de France vers la Provence et l'Espagne", smallTitle: '' },
      { __component: 'shared.document', documentId: 'refugies', title: 'Juifs de France réfugiés en Aragon de Yom Tov Assis', smallTitle: '' },
      { __component: 'shared.document', documentId: 'cartes', title: 'Cartes', smallTitle: '' },
      { __component: 'shared.document', documentId: 'listeMonzon', title: 'Una lista de judios de Monzon en 1397 de R. PITA MERCE / Une liste des Juifs de Monzon en 1397 de R. Pita Merce', smallTitle: 'Une liste des Juifs de Monzon en 1397' },
      { __component: 'shared.document', documentId: 'listeTarrega', title: 'Algunes noticies sobre els Jueus de Tarrega 1303 - 1486 / Une liste des Juifs de Tarrega 1303 – 1486', smallTitle: 'Algunes noticies sobre els Jueus de Tarrega 1303-1486' },
      { __component: 'shared.document', documentId: 'seepharades', title: 'Apellidos sefardis de los Balcanes y del Oriente medio, existentes entre los judios medievales de Lerida y Huesca Dr R. Pita Merce / Noms sépharades des Balkans et du Moyen Orient des Juifs provenant de Lerida et Huesca de R. Pita Merce', smallTitle: 'Apellidos sefardis de los Balkanes' },
      { __component: 'shared.document', documentId: 'lerida', title: 'Los ultimos años de existencia de la Aljama Hebrea de Lerida ( 1490 - 1492 ) de R. Pita Merce / Les dernières années d\u2019existence de la communauté hebraique de Lerida ( 1490 – 1492 )', smallTitle: 'Los ultimos años de existencia de la Aljama de Lerida' },
      { __component: 'shared.document', documentId: 'ordre', title: 'Los judios de Monzon y la orden de San Juan de Jerusalem ( 1317 – 1492 ) de M. A. Motis Dolader / Les juifs de Monzon et l\u2019ordre de San Juan de Jerusalem ( 1317 – 1492 ) de M. A. Motis Dolader', smallTitle: 'Los judios de Monzon' },
    ],
  },
  {
    categoryId: 'dossier2',
    title: 'SALONIQUE ET SES GATTEGNO',
    image: 'dossier2.jpg',
    href: '/category/dossier2',
    order: 3,
    documents: [
      { __component: 'shared.document', documentId: 'introduction', title: 'Introduction', smallTitle: '' },
      { __component: 'shared.document', documentId: 'illustrations', title: 'Illustrations de Salonique', smallTitle: '' },
      { __component: 'shared.document', documentId: 'historique', title: 'Historique de Salonique', smallTitle: '' },
      { __component: 'shared.document', documentId: 'salonique', title: "Ce qu'était la communauté juive de Salonique a la veille de la catastrophe (extrait de In memoriam de M. Molho)", smallTitle: '' },
      { __component: 'shared.document', documentId: 'jewish', title: 'Jewish community of Thessaloniki La communauté juive de Théssalonique', smallTitle: '' },
      { __component: 'shared.document', documentId: 'gatigno', title: 'Gatigno in the jewish encyclopedies Extrait d\u2019encyclopédies juives pour Gatigno', smallTitle: '' },
      { __component: 'shared.document', documentId: 'synagogue', title: 'La synagogue Aragon et les Gattegno (extraits de Traditions & Customs of the sephardic jews of Salonica de M. Molho et Histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'gattegnoSalonique', title: 'Les Gattegno de Salonique en images', smallTitle: '' },
      { __component: 'shared.document', documentId: 'artisanat', title: "Les juifs de Salonique dans l'artisanat, l'industrie et le commerce (extrait de In mémoriam de M. Molho)", smallTitle: '' },
      { __component: 'shared.document', documentId: 'registres', title: 'Extrait des registres du consulat espagnol de Salonique en 1916', smallTitle: '' },
      { __component: 'shared.document', documentId: 'thessaloniki', title: 'The jewish cementery in Thessaloniki. Le cimetière juif de Salonique de D. Gal et M. Silber', smallTitle: '' },
      { __component: 'shared.document', documentId: 'necropole', title: 'La Nécropole juive de Théssalonique de M. Molho', smallTitle: '' },
      { __component: 'shared.document', documentId: 'cementerio', title: 'El cementerio judio de Salonica verdadero museo epigrafico historico y arqueologico de M. Molho. Le cimetière juif de Salonique, véritable musée épigraphique, historique et arquéologique', smallTitle: '' },
    ],
  },
  {
    categoryId: 'dossier3',
    title: 'LES GRANDS RABBINS GATTEGNO',
    image: 'dossier3.jpg',
    href: '/category/dossier3',
    order: 4,
    documents: [
      { __component: 'shared.document', documentId: 'introduction', title: 'Introduction', smallTitle: '' },
      { __component: 'shared.document', documentId: 'organisation', title: 'Organisation de la communauté juive de Salonique (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'abrahamI', title: 'Abraham (I) Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'benvenisteI', title: 'Benveniste (I) Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'abrahamII', title: 'Abraham (II) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'benvenisteII', title: 'Benveniste (II) moise Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'abrahamIII', title: 'Abraham (III) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'benvenisteIII', title: 'Benveniste (III) moise Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'abrahamIV', title: 'Abraham (IV) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', documentId: 'ouvrages', title: 'Liste des ouvrages publiés par les rabbins Gattegno', smallTitle: '' },
      { __component: 'shared.document', documentId: 'ecoles', title: "Les écoles de l'Alliance israélite universelle", smallTitle: '' },
    ],
  },
  {
    categoryId: 'dossier4',
    title: 'IN MEMORIAM',
    image: 'dossier4.jpg',
    href: '/category/dossier4',
    order: 5,
    documents: [
      { __component: 'shared.document', documentId: 'introduction', title: 'Introduction', smallTitle: '' },
      { __component: 'shared.document', documentId: 'hommage', title: 'Hommage aux victimes juives des nazis de Grèce de M. Molho', smallTitle: '' },
      { __component: 'shared.document', documentId: 'holocaust', title: 'The holocaust in Salonika de Steven Bowman', smallTitle: '' },
      { __component: 'shared.document', documentId: 'history', title: 'History of the jews of Thessaloniki and the holocaust by Paul Isaac Hagouel', smallTitle: '' },
      { __component: 'shared.document', documentId: 'liste', title: 'Liste allemande des juifs originaires de Grèce', smallTitle: '' },
      { __component: 'shared.document', documentId: 'agonie', title: 'L\u2019agonie de la salonique juive', smallTitle: '' },
    ],
  },
  {
    categoryId: 'dossier5',
    title: 'Tree branches',
    image: 'arbre4.gif',
    href: '/category/dossier5',
    order: 6,
    documents: [
      { __component: 'shared.document', documentId: 'abram', title: "Abram Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'isaac', title: "Isaac Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'daniel', title: "Daniel Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'samuel', title: "Samuel Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'levy', title: "Levy Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'salomon', title: "Salomon Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'shmuel', title: "Shmuel Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'bella', title: "Bella Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'jacob', title: "Jacob Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'baruch', title: "Baruch Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'menahem', title: "Menahem Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'yehuda', title: "Yehuda Gattegno's descendance", smallTitle: '' },
      { __component: 'shared.document', documentId: 'benveniste', title: "Benveniste Samuel Gattegno's descendance", smallTitle: '' },
    ],
  },
];

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importSeedData() {
  await setPublicPermissions({
    category: ['find', 'findOne'],
  });
  await importCategories();
}

module.exports = async () => {
  await seedGattegnoData();
};
