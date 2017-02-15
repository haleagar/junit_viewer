import iconMap from '../icon-map'

export default (suites) => {
  let stats = {
    suites: {
      name: 'Suites',
      type: 'suites',
      total: suites.length,
      active: true,
      icon: 'minus',
      data: []
    },
    tests: {
      name: 'Tests',
      type: 'tests',
      total: 0,
      active: true,
      icon: 'minus',
      data: []
    },
    properties: {
      name: 'Properties',
      type: 'properties',
      total: 0,
      active: true,
      icon: 'minus'
    }
  }

  let count = {
    pass: {
      suites: 0,
      tests: 0
    },
    fail: {
      suites: 0,
      tests: 0
    },
    error: {
      suites: 0,
      tests: 0
    },
    skipped: {
      suites: 0,
      tests: 0
    },
    unknown: {
      suites: 0,
      tests: 0
    }
  }

  let updateCount = (type, group) => {
    if (count[type][group] > 0) {
      stats[group].data.push({
        type,
        total: count[type][group],
        active: true,
        icon: iconMap[type]
      })
    }
  }

  suites.forEach(suite => {
    if (count.hasOwnProperty(suite.status)) count[suite.status].suites += 1
    else count.unknown.suites += 1

    if (suite.tests) {
      stats.tests.total += suite.tests.length
      suite.tests.forEach(test => {
        if (count.hasOwnProperty(test.status)) count[test.status].tests += 1
        else count.unknown.tests += 1
      })
    }

    if (suite.properties) stats.properties.total += Object.keys(suite.properties).length
  })

  updateCount('pass', 'suites')
  updateCount('pass', 'tests')
  updateCount('fail', 'suites')
  updateCount('fail', 'tests')
  updateCount('error', 'suites')
  updateCount('error', 'tests')
  updateCount('skipped', 'suites')
  updateCount('skipped', 'tests')
  updateCount('unknown', 'suites')
  updateCount('unknown', 'tests')

  let result = []
  if (stats.suites.total > 0) result.push(stats.suites)
  if (stats.tests.total > 0) result.push(stats.tests)
  if (stats.properties.total > 0) result.push(stats.properties)
  return result
}
