/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { csv } from 'd3-fetch';
import { useEffect, useState } from 'react';
import { CategoryData, CreditRatingType, DsaRatingType } from './Types';
import { StackedBarChart } from './StackedBarChart';
import './style.css';

function App() {
  const [creditRatingData, setCreditRatingData] = useState<
    CreditRatingType[] | undefined
  >();
  const [dsaRatingData, setDsaRatingData] = useState<
    DsaRatingType[] | undefined
  >();
  const [categoriesData, setCategoriesData] = useState<
    CategoryData[] | undefined
  >(undefined);
  useEffect(() => {
    Promise.all([
      csv('./data/creditRating.csv'),
      csv('./data/dsaRating.csv'),
      csv('./data/categories.csv'),
    ]).then(([creditData, dsaData, regions]) => {
      /* const creditDataArray: any[] = [];
      regions.forEach(region => {
        const data = creditData.filter(
          (k: any) => k.region === region.description,
        );
        console.log('data', data);
        const arrayEl = {
          region: region.description,
          number: {},
          percentage: {},
        };
        creditDataArray.push(arrayEl);
      });
      console.log('creditDataArray', creditDataArray); */
      setCreditRatingData(creditData as any);
      setDsaRatingData(dsaData as any);
      setCategoriesData(regions as any);
    });
  }, []);
  return (
    <div className='undp-container'>
      {creditRatingData && dsaRatingData && categoriesData ? (
        <StackedBarChart
          creditData={creditRatingData}
          dsaData={dsaRatingData}
          categories={categoriesData}
        />
      ) : null}
    </div>
  );
}

export default App;
