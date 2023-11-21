import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

function useAGB(codeagb) {
  return useQuery({
    queryKey: ['codeagb', codeagb],
    queryFn: () =>
      axios
        .get(`https://data.ademe.fr/data-fair/api/v1/datasets//agribalyse-detail-etape/lines?Code_AGB_in=${codeagb}`)
        .then((res) => res.data.results[0]),
    enabled: codeagb ? true : false,
  })
}

export default function Importagb() {
  const router = useRouter()
  const { codeagb } = router.query

  const { data } = useAGB(codeagb)
  return (
    <Web>
      <Section>
        {data && (
          <SectionWideContent>
            <h1>{codeagb}</h1>
            "ecv": [<br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Agriculture']}
            ,
            <br />
            "id": 30
            <br />
            &#125;,
            <br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Transformation']}
            ,
            <br />
            "id": 31
            <br />
            &#125;,
            <br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Emballage']}
            ,
            <br />
            "id": 32 &#125;,
            <br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Transport']}
            ,
            <br />
            "id": 33 &#125;,
            <br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Supermarché_et_distribution']}
            ,
            <br /> "id": 34
            <br /> &#125;,
            <br />
            &#123;
            <br />
            "value": {data['Changement_climatique_(kg_CO2_eq/kg_de_produit)_-_Consommation']}
            ,
            <br /> "id": 35
            <br /> &#125;
            <br /> ],
            <br />
          </SectionWideContent>
        )}
      </Section>
    </Web>
  )
}
