import { LivraisonType } from './Type'

export const livraisonData: Record<
  LivraisonType,
  { fabrication: number; ecv: Record<string, { id: number; value: number }[]> }
> = {
  courses: {
    fabrication: 20,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 55,
          value: 1.1355333787940003,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 55,
          value: 1.1355333787940003,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 54,
          value: 0.9613347362069967,
        },
        {
          id: 55,
          value: 0.04906632399947955,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 54,
          value: 0.9613347362069967,
        },
        {
          id: 55,
          value: 0.04906632399947955,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 54,
          value: 0.9613347362069967,
        },
        {
          id: 55,
          value: 1.1355333787940003,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 5.711127834984955,
        },
        {
          id: 54,
          value: 0.9613347362069967,
        },
        {
          id: 55,
          value: 1.1355333787940003,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 7.059517717884673,
        },
        {
          id: 54,
          value: 0.9613347362069967,
        },
        {
          id: 55,
          value: 0.04214857879400013,
        },
      ],
    },
  },
  chaussure: {
    fabrication: 13,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 55,
          value: 0.25928997888800026,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 55,
          value: 0.25928997888800026,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 54,
          value: 0.35270905003298764,
        },
        {
          id: 55,
          value: 0.017852855600329006,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 54,
          value: 0.35270905003298764,
        },
        {
          id: 55,
          value: 0.017852855600329006,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 54,
          value: 0.35270905003298764,
        },
        {
          id: 55,
          value: 0.25928997888800026,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 0.4283345876238716,
        },
        {
          id: 54,
          value: 0.35270905003298764,
        },
        {
          id: 55,
          value: 0.25928997888800026,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 0.5294638288413505,
        },
        {
          id: 54,
          value: 0.35270905003298764,
        },
        {
          id: 55,
          value: 0.01631557888800014,
        },
      ],
    },
  },
  livre: {
    fabrication: 1,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 55,
          value: 0.024885274712600172,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 55,
          value: 0.024885274712600172,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 54,
          value: 0.06274296135960296,
        },
        {
          id: 55,
          value: 0.00677749046602474,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 54,
          value: 0.06274296135960296,
        },
        {
          id: 55,
          value: 0.00677749046602474,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 54,
          value: 0.06274296135960296,
        },
        {
          id: 55,
          value: 0.024885274712600172,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 0.05711127834984955,
        },
        {
          id: 54,
          value: 0.06274296135960296,
        },
        {
          id: 55,
          value: 0.024885274712600172,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 0.07059517717884672,
        },
        {
          id: 54,
          value: 0.06274296135960296,
        },
        {
          id: 55,
          value: 0.0066621947126001375,
        },
      ],
    },
  },
  microondes: {
    fabrication: 79,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 55,
          value: 2.29334757853768,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 55,
          value: 2.29334757853768,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 54,
          value: 1.5139704067589537,
        },
        {
          id: 55,
          value: 0.1460782351541183,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 54,
          value: 1.5139704067589537,
        },
        {
          id: 55,
          value: 0.1460782351541183,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 54,
          value: 1.5139704067589537,
        },
        {
          id: 55,
          value: 2.29334757853768,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 5.26137651797989,
        },
        {
          id: 54,
          value: 1.5139704067589537,
        },
        {
          id: 55,
          value: 2.29334757853768,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 6.503580697601255,
        },
        {
          id: 54,
          value: 1.5139704067589537,
        },
        {
          id: 55,
          value: 0.13240615725768007,
        },
      ],
    },
  },
  vetements: {
    fabrication: 105,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 55,
          value: 1.2239254987376,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 55,
          value: 1.2239254987376,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 54,
          value: 1.0035955817536473,
        },
        {
          id: 55,
          value: 0.06502730695677822,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 54,
          value: 1.0035955817536473,
        },
        {
          id: 55,
          value: 0.06502730695677822,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 54,
          value: 1.0035955817536473,
        },
        {
          id: 55,
          value: 1.2239254987376,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 1.142225566996991,
        },
        {
          id: 54,
          value: 1.0035955817536473,
        },
        {
          id: 55,
          value: 1.2239254987376,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 1.4119035435769347,
        },
        {
          id: 54,
          value: 1.0035955817536473,
        },
        {
          id: 55,
          value: 0.05764837873760014,
        },
      ],
    },
  },
  lavelinge: {
    fabrication: 275,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 55,
          value: 7.947293681816,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 55,
          value: 7.947293681816,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 54,
          value: 3.4051841120958573,
        },
        {
          id: 55,
          value: 0.7041799831858633,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 54,
          value: 3.4051841120958573,
        },
        {
          id: 55,
          value: 0.7041799831858633,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 54,
          value: 3.4051841120958573,
        },
        {
          id: 55,
          value: 7.947293681816,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 19.988947422447346,
        },
        {
          id: 54,
          value: 3.4051841120958573,
        },
        {
          id: 55,
          value: 7.947293681816,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 24.70831201259636,
        },
        {
          id: 54,
          value: 3.4051841120958573,
        },
        {
          id: 55,
          value: 0.6580616818160002,
        },
      ],
    },
  },
  lit: {
    fabrication: 421,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 55,
          value: 42.361999355735996,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 55,
          value: 42.361999355735996,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 54,
          value: 10.394481950719891,
        },
        {
          id: 55,
          value: 3.732059629708603,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 54,
          value: 10.394481950719891,
        },
        {
          id: 55,
          value: 3.732059629708603,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 54,
          value: 10.394481950719891,
        },
        {
          id: 55,
          value: 42.361999355735996,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 34.26676700990972,
        },
        {
          id: 54,
          value: 10.394481950719891,
        },
        {
          id: 55,
          value: 42.361999355735996,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 42.35710630730803,
        },
        {
          id: 54,
          value: 10.394481950719891,
        },
        {
          id: 55,
          value: 3.4860953557360004,
        },
      ],
    },
  },
  smartphone: {
    fabrication: 77,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 55,
          value: 0.028774624395920226,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 55,
          value: 0.028774624395920226,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 54,
          value: 0.07084951854596915,
        },
        {
          id: 55,
          value: 0.007045283300029762,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 54,
          value: 0.07084951854596915,
        },
        {
          id: 55,
          value: 0.007045283300029762,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 54,
          value: 0.07084951854596915,
        },
        {
          id: 55,
          value: 0.028774624395920226,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 0.14277819587462387,
        },
        {
          id: 54,
          value: 0.07084951854596915,
        },
        {
          id: 55,
          value: 0.028774624395920226,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 0.17648794294711684,
        },
        {
          id: 54,
          value: 0.07084951854596915,
        },
        {
          id: 55,
          value: 0.006906928395920138,
        },
      ],
    },
  },
  vin: {
    fabrication: 12,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 55,
          value: 0.9095144082944002,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 55,
          value: 0.9095144082944002,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 54,
          value: 0.8284567832912497,
        },
        {
          id: 55,
          value: 0.040340764458783825,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 54,
          value: 0.8284567832912497,
        },
        {
          id: 55,
          value: 0.040340764458783825,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 54,
          value: 0.8284567832912497,
        },
        {
          id: 55,
          value: 0.9095144082944002,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 4.6831248246876624,
        },
        {
          id: 54,
          value: 0.8284567832912497,
        },
        {
          id: 55,
          value: 0.9095144082944002,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 5.78880452866543,
        },
        {
          id: 54,
          value: 0.8284567832912497,
        },
        {
          id: 55,
          value: 0.034806568294400146,
        },
      ],
    },
  },
  cafetiere: {
    fabrication: 41,
    ecv: {
      magasin: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 55,
          value: 0.7003508524040003,
        },
      ],
      magasindouce: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 55,
          value: 0.7003508524040003,
        },
      ],
      pointrelais: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 54,
          value: 0.6711726439498658,
        },
        {
          id: 55,
          value: 0.06657840377386325,
        },
      ],
      pointrelaisdouce: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 54,
          value: 0.6711726439498658,
        },
        {
          id: 55,
          value: 0.06657840377386325,
        },
      ],
      clickcollect: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 54,
          value: 0.6711726439498658,
        },
        {
          id: 55,
          value: 0.7003508524040003,
        },
      ],
      clickcollectdouce: [
        {
          id: 33,
          value: 2.1416729381193575,
        },
        {
          id: 54,
          value: 0.6711726439498658,
        },
        {
          id: 55,
          value: 0.7003508524040003,
        },
      ],
      livraisondomicile: [
        {
          id: 33,
          value: 2.647319144206752,
        },
        {
          id: 54,
          value: 0.6711726439498658,
        },
        {
          id: 55,
          value: 0.06254305240400015,
        },
      ],
    },
  },
}
