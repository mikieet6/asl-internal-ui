import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import DateSelector from '@asl/pages/pages/establishment/rops/components/date-selector';
import { Header, Metric, Snippet } from '@asl/components';

const metrics = ['due', 'submitted', 'outstanding'];

export default function PageHeader() {

  const { year, ropsSummary } = useSelector(state => state.static);

  return <Fragment>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={<Snippet>subtitle</Snippet>}
    />
    <DateSelector year={year} />

    <div className="govuk-grid-row">
      {
        metrics.map(metric => (
          <div className="govuk-grid-column-one-third" key={metric}>
            <Metric number={ropsSummary[metric]} label={<Snippet year={year}>{ `ropsSummary.${metric}` }</Snippet>} className={`rops-${metric}`} />
          </div>
        ))
      }
    </div>
  </Fragment>;
}
