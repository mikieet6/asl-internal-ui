import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Snippet } from '@asl/components';
import { groupBy } from 'lodash';
import { format, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

const Metric = ({ number, label }) => {
  if (typeof number === 'number' && number !== Math.floor(number)) {
    number = number.toFixed(2);
  }
  return <div className="metric">
    <p>{ number }</p>
    <label>{ label }</label>
  </div>
}

const Index = ({ metrics, since }) => {
  const types = [
    'project-application',
    'project-amendment',
    'pil-grant',
    'pil-revoke',
    'role-create',
    'role-delete',
    'place-update',
    'place-create',
    'place-delete',
    'profile-update'
  ];
  const now = new Date();
  const dates = {
    all: '2019-07-31',
    week: format(startOfWeek(now), 'YYYY-MM-DD'),
    month: format(startOfMonth(now), 'YYYY-MM-DD'),
    year: format(startOfYear(now), 'YYYY-MM-DD')
  }
  const groups = groupBy(metrics, 'type');
  const pplApplications = groups['project-application'];
  const iterations = pplApplications
    .map(m => m.iterations)
    .reduce((sum, i) => sum + i, 0);
  const meanIterations = pplApplications.length ? iterations / pplApplications.length : '-';

  const meanProcessing = list => {
    if (!list || !list.length) {
      return '-';
    }
    const hours = list.reduce((sum, item, i, list) => sum + (item.processing / list.length), 0);
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (wholeHours > 8) {
      return `${Math.floor(wholeHours/8)}d${wholeHours % 8}h${minutes}m`;
    }
    return `${wholeHours}h${minutes}m`;
  }

  return <Fragment>

    <Header title="Performance metrics"/>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <Metric number={metrics.length} label="total tasks completed" />
      </div>
      <div className="govuk-grid-column-one-third">
        <Metric number={meanIterations} label="mean iterations per PPL application" />
      </div>
      <div className="govuk-grid-column-one-third">
        <Metric number={meanProcessing(metrics)} label="mean end-to-end processing time" />
      </div>
    </div>

    <h3>Tasks completed by type:</h3>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <table className="govuk-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>#</th>
              <th>e2e</th>
            </tr>
          </thead>
          <tbody>
            {
              types.map(type => {
                return <tr key={type}>
                  <td><Snippet>{ type }</Snippet></td>
                  <td>{ (groups[type] || []).length }</td>
                  <td>{ meanProcessing(groups[type]) }</td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </div>
    </div>

    <div className="link-filter">
      <label>Showing data for period:</label>
      <ul>
        {
          Object.keys(dates).map(date => {
            return dates[date] === since ?
              <li key={date}><strong><Snippet>{ `date.${date}` }</Snippet></strong></li> :
              <li key={date}><a href={`?since=${dates[date]}`}><Snippet>{ `date.${date}` }</Snippet></a></li>
          })
        }
      </ul>
    </div>

  </Fragment>
};

export default connect(({ static: { metrics, since } }) => ({ metrics, since }))(Index);
