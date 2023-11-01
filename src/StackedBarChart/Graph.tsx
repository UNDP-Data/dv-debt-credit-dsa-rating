/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
import UNDPColorModule from 'undp-viz-colors';

interface Props {
  data: object[];
  svgWidth: number;
  svgHeight: number;
}

export function Graph(props: Props) {
  const { data, svgWidth, svgHeight } = props;
  const margin = { top: 20, right: 30, bottom: 50, left: 0 };
  const graphWidth = svgWidth - margin.left - margin.right;
  // const graphHeight = svgHeight - margin.top - margin.bottom;

  const valueArray: number[] = data.map((d: any) => Number(d.number));
  const maxParam = max(valueArray) ? max(valueArray) : 0;
  console.log(maxParam);
  const percentageData = data.filter(d => (d as any).value === 'percentage');
  const numberData = data.filter(d => (d as any).value === 'number')[0];
  const subgroups = Object.keys(data[0]).slice(2);
  console.log('filteredData', percentageData);
  console.log('numberData', numberData);
  console.log('subgroups', subgroups);
  const stackedData = stack().keys(subgroups)(percentageData as any);
  console.log('stacked', stackedData);
  const x = scaleLinear()
    // .domain([0, maxParam as number])
    .domain([0, 100])
    .range([0, graphWidth])
    .nice();
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
                    fill={UNDPColorModule.categoricalColors.colors[i]}
                    opacity={0.8}
                  />
                  <text
                    textAnchor='middle'
                    x={x(d[0][0]) + x(d[0][1] - d[0][0]) / 2}
                    y={10}
                  >
                    {`${Math.round((numberData as any)[d.key])} ${(
                      d[0][1] - d[0][0]
                    ).toFixed(2)}% `}
                  </text>
                  <text
                    textAnchor='middle'
                    x={x(d[0][0]) + x(d[0][1] - d[0][0]) / 2}
                    y={40}
                  >
                    {d.key}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      ) : (
        <div className='center-area-error-el'>No data available</div>
      )}
    </div>
  );
}
