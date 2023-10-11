/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
// import { select } from 'd3-selection';
import UNDPColorModule from 'undp-viz-colors';
import { RatingType } from '../Types';

interface Props {
  data: RatingType[];
  totalPercentOption: string;
  svgWidth: number;
  svgHeight: number;
}

export function Graph(props: Props) {
  const { data, totalPercentOption, svgWidth, svgHeight } = props;
  const margin = { top: 20, right: 30, bottom: 50, left: 80 };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
  const minParam = 0;

  const valueArray: number[] = data.map((d: any) => Number(d.number));
  const maxParam = max(valueArray) ? max(valueArray) : 0;
  // const groups = data.map(d => d.region);
  const subgroups = data.map(d => d.category);
  const stackedData = stack().keys(subgroups)(data);
  console.log('stacked', stackedData);
  const x = scaleLinear()
    .domain([minParam as number, maxParam as number])
    .range([graphWidth, 0])
    .nice();

  /* useEffect(() => {

  }, [data]); */
  return (
    <div>
      {valueArray.length > 0 ? (
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          id='creditRating'
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            <g>
              {stackedData.map((d, i) => (
                <g key={i}>
                  <rect
                    x={x(d[0][0])}
                    y={20}
                    width={x(d[0][1] - d[0][0])}
                    height={100}
                    fill={UNDPColorModule.categoricalColors.colors[0]}
                    opacity={0.8}
                  />
                </g>
              ))}
            </g>
          </g>
          <text
            x={-graphHeight / 2}
            y='20'
            transform='rotate(-90)'
            textAnchor='middle'
          >
            {totalPercentOption === 'percentage'
              ? 'Percentage of countries'
              : 'Number of countries'}
          </text>
        </svg>
      ) : (
        <div className='center-area-error-el'>No data available</div>
      )}
    </div>
  );
}
