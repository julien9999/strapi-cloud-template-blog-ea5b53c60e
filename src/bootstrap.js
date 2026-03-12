'use strict';

let _strapi;

async function seedGattegnoData(strapiInstance) {
  _strapi = strapiInstance;
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
  const pluginStore = _strapi.store({
    environment: _strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await _strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return _strapi.query('plugin::users-permissions.permission').create({
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
    await _strapi.documents(`api::${model}.${model}`).create({
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
      { __component: 'shared.document', slug: 'listeTarrega', title: 'Algunes noticies sobre els Jueus de Tarrega 1303 - 1486 / Une liste des Juifs de Tarrega 1303 – 1486', smallTitle: 'Algunes noticies sobre els Jueus de Tarrega 1303-1486' },
      { __component: 'shared.document', slug: 'seepharades', title: 'Apellidos sefardis de los Balcanes y del Oriente medio, existentes entre los judios medievales de Lerida y Huesca Dr R. Pita Merce / Noms sépharades des Balkans et du Moyen Orient des Juifs provenant de Lerida et Huesca de R. Pita Merce', smallTitle: 'Apellidos sefardis de los Balkanes' },
      { __component: 'shared.document', slug: 'lerida', title: 'Los ultimos años de existencia de la Aljama Hebrea de Lerida ( 1490 - 1492 ) de R. Pita Merce / Les dernières années d\u2019existence de la communauté hebraique de Lerida ( 1490 – 1492 )', smallTitle: 'Los ultimos años de existencia de la Aljama de Lerida' },
      { __component: 'shared.document', slug: 'ordre', title: 'Los judios de Monzon y la orden de San Juan de Jerusalem ( 1317 – 1492 ) de M. A. Motis Dolader / Les juifs de Monzon et l\u2019ordre de San Juan de Jerusalem ( 1317 – 1492 ) de M. A. Motis Dolader', smallTitle: 'Los judios de Monzon' },
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
      { __component: 'shared.document', slug: 'salonique', title: "Ce qu'était la communauté juive de Salonique a la veille de la catastrophe (extrait de In memoriam de M. Molho)", smallTitle: '' },
      { __component: 'shared.document', slug: 'jewish', title: 'Jewish community of Thessaloniki La communauté juive de Théssalonique', smallTitle: '' },
      { __component: 'shared.document', slug: 'gatigno', title: 'Gatigno in the jewish encyclopedies Extrait d\u2019encyclopédies juives pour Gatigno', smallTitle: '' },
      { __component: 'shared.document', slug: 'synagogue', title: 'La synagogue Aragon et les Gattegno (extraits de Traditions & Customs of the sephardic jews of Salonica de M. Molho et Histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'gattegnoSalonique', title: 'Les Gattegno de Salonique en images', smallTitle: '' },
      { __component: 'shared.document', slug: 'artisanat', title: "Les juifs de Salonique dans l'artisanat, l'industrie et le commerce (extrait de In mémoriam de M. Molho)", smallTitle: '' },
      { __component: 'shared.document', slug: 'registres', title: 'Extrait des registres du consulat espagnol de Salonique en 1916', smallTitle: '' },
      { __component: 'shared.document', slug: 'thessaloniki', title: 'The jewish cementery in Thessaloniki. Le cimetière juif de Salonique de D. Gal et M. Silber', smallTitle: '' },
      { __component: 'shared.document', slug: 'necropole', title: 'La Nécropole juive de Théssalonique de M. Molho', smallTitle: '' },
      { __component: 'shared.document', slug: 'cementerio', title: 'El cementerio judio de Salonica verdadero museo epigrafico historico y arqueologico de M. Molho. Le cimetière juif de Salonique, véritable musée épigraphique, historique et arquéologique', smallTitle: '' },
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
      { __component: 'shared.document', slug: 'organisation', title: 'Organisation de la communauté juive de Salonique (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'abrahamI', title: 'Abraham (I) Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'benvenisteI', title: 'Benveniste (I) Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'abrahamII', title: 'Abraham (II) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'benvenisteII', title: 'Benveniste (II) moise Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'abrahamIII', title: 'Abraham (III) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'benvenisteIII', title: 'Benveniste (III) moise Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'abrahamIV', title: 'Abraham (IV) Benveniste Gattegno (Extrait histoire des israélites de Salonique de Joseph Nehama)', smallTitle: '' },
      { __component: 'shared.document', slug: 'ouvrages', title: 'Liste des ouvrages publiés par les rabbins Gattegno', smallTitle: '' },
      { __component: 'shared.document', slug: 'ecoles', title: "Les écoles de l'Alliance israélite universelle", smallTitle: '' },
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
      { __component: 'shared.document', slug: 'hommage', title: 'Hommage aux victimes juives des nazis de Grèce de M. Molho', smallTitle: '' },
      { __component: 'shared.document', slug: 'holocaust', title: 'The holocaust in Salonika de Steven Bowman', smallTitle: '' },
      { __component: 'shared.document', slug: 'history', title: 'History of the jews of Thessaloniki and the holocaust by Paul Isaac Hagouel', smallTitle: '' },
      { __component: 'shared.document', slug: 'liste', title: 'Liste allemande des juifs originaires de Grèce', smallTitle: '' },
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

module.exports = async (strapi) => {
  await seedGattegnoData(strapi);
};
