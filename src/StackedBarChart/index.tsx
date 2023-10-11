/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { Select, Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { ratingType, CategoryData } from '../Types';
import { Graph } from './Graph';

interface Props {
  creditData: ratingType[];
  dsaData: ratingType[];
  categories: CategoryData[];
}

const GraphDiv = styled.div`
  flex-grow: 1;
  height: 800px;
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
  }
`;
const numberPercentOptions = ['number', 'percentage'];
const creditDsaOptions = ['credit', 'dsa'];

export function StackedBarChart(props: Props) {
  const { dsaData, creditData, categories } = props;
  const [totalPercentSelection, setTotalPercentSelection] = useState('number');
  const [creditDsaSelection, setCreditDsaSelection] = useState('credit');
  const [categorySelection, setCategorySelection] = useState('All developing');
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <GraphDiv ref={graphDiv} style={{ maxWidth: '900px', maxHeight: '600px' }}>
      <div>
        <div className='margin-bottom-05'>
          <div>
            <p className='label undp-typography'>Select a category</p>
            <Select
              options={categories.map(d => ({
                label: d.description,
                value: d.description,
              }))}
              className='undp-select'
              style={{ width: '100%' }}
              onChange={el => {
                setCategorySelection(el);
              }}
              value={categorySelection}
            />
          </div>
        </div>
      </div>
      <div className='chart-container'>
        <div className='margin-bottom-03'>
          <div>
            <h6 className='undp-typography margin-bottom-01'>
              Credit rating and debt sustainability analysis (DSA) rating
            </h6>
            <p className='undp-typography small-font margin-bottom-01'>
              Years: 1995-2023
            </p>
          </div>
          <div className='flex-div flex-space-between flex-wrap'>
            <div>
              <Radio.Group
                defaultValue={totalPercentSelection}
                onChange={(el: RadioChangeEvent) => {
                  setTotalPercentSelection(el.target.value);
                }}
              >
                {numberPercentOptions.map((d, i) => (
                  <Radio key={i} className='undp-radio' value={d}>
                    {d}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div>
              <Radio.Group
                defaultValue={creditDsaSelection}
                onChange={(el: RadioChangeEvent) => {
                  setCreditDsaSelection(el.target.value);
                  const data =
                    creditDsaSelection === 'credit' ? dsaData : creditData;
                  setSelectedData(
                    data.filter(d => d.region === categorySelection),
                  );
                }}
              >
                {creditDsaOptions.map((d, i) => (
                  <Radio key={i} className='undp-radio' value={d}>
                    {d}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>
        {svgHeight && svgWidth ? (
          <Graph
            data={selectedData}
            totalPercentOption={totalPercentSelection}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
          />
        ) : null}
        <p className='source'>Source:</p>
      </div>
    </GraphDiv>
  );
}
