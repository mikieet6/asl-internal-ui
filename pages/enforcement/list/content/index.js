const { merge } = require('lodash');
const enforcementContent = require('../../content');

module.exports = merge({}, enforcementContent, {
  page: {
    title: 'Enforcement cases',
    description: 'Flag people and licences subject to enforcement to help inspectors make informed decisions when granting or amending licences in ASPeL.'
  },
  fields: {
    caseNumber: {
      label: 'Case number'
    },
    subject: {
      label: 'Subject'
    },
    establishment: {
      label: 'Establishment'
    },
    appliedTo: {
      label: 'Flag applied to'
    },
    status: {
      label: 'Enforcement flag'
    },
    updatedAt: {
      label: 'Last updated'
    },
    action: {
      label: 'View details'
    }
  },
  cases: {
    actions: {
      create: 'Add new case',
      view: 'View case'
    },
    flags: {
      empty: 'No subjects with ongoing or closed enforcement flags'
    }
  }
});
