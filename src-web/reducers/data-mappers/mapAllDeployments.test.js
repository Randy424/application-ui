/*******************************************************************************
 * Licensed Materials - Property of IBM
 * 5737-E67
 * (c) Copyright IBM Corporation 2016, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import mapAllDeployments from './mapAllDeployments'

describe('data-mappers testing for mapAllDeployments', () => {
  it('should mold the data properly', () => {
    const apiResponse = {
      deployment: 'sampleDeploymentName',
      shouldIgnore: 'ignore'
    }
    const result = {
      deploymentName: 'sampleDeploymentName'
    }
    expect(mapAllDeployments(apiResponse)).toEqual(result)
  })

  it('should not break on empty response', () => {
    const apiResponse = {}
    const result = {
      deploymentName: ''
    }
    expect(mapAllDeployments(apiResponse)).toEqual(result)
  })
})
