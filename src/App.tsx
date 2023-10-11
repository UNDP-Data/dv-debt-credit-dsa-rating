/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { csv } from 'd3-fetch';
import { useEffect, useState } from 'react';
import { CategoryData, RatingType } from './Types';
import { StackedBarChart } from './StackedBarChart';
import './style.css';

function App() {
  const [creditRatingData, setCreditRatingData] = useState<
    RatingType[] | undefined
  >();
  const [dsaRatingData, setDsaRatingData] = useState<
    RatingType[] | undefined
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
      const creditDataArray = [];
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
