/**
 * demo resources resembling a db
 */

const routes = [
  {
    id: 1,
    name: "via degli allievi",
    grade: "3a",
    sector: "",
    dateClimbed: "02/11/2020",
    link: "http://www.falesiaonline.it/falesia/avane.html",
    type: "moulinette",
    city: "Vecchiano",
  },
  {
    id: 2,
    name: "undici",
    grade: "5a",
    sector: "groviera",
    dateClimbed: "02/11/2020",
    link:
      "https://www.falesiaonline.it/settorefoto/469/gruviera-e-diedro-lontano.html",
    type: "first",
    city: "Vecchiano",
  },
];

const ropesUsage = [
  {
    id: 1,
    routeId: 1,
    ropeId: 1,
    times: 4,
  },
];

const ropes = [
  {
    id: 1,
    name: "beal",
    color: "orange",
    bought_date: "10/06/2020",
    shopLink: "",
    length_m: 80,
    thickness_mm: 9.8,
    img_url:
      "https://media.oliunid.it/media/catalog/product/cache/a0878e296847b1aa8832f2fdabad9b1b/b/e/beal_booster_9.7_mm_golden_dry_unicore_fuxia_1_1.jpg",
  },
];

module.exports = {
  routes,
  ropes,
  ropesUsage,
};
