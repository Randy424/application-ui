/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from 'react'
import { connect } from 'react-redux'
import resources from '../../../lib/shared/resources'
import {
  updateSecondaryHeader /* , fetchResource */
} from '../../actions/common'
import {
  getBreadCrumbs,
  getDeployableDetails,
  getSubscriptions,
  getChannels,
  sampleData
} from './utils'
import ApplicationDeployableHighlights from '../../components/ApplicationDeployableHighlights'
import ApplicationDeployableSubscription from '../../components/ApplicationDeployableSubscription'
import ApplicationDeployableVersionStatus from '../../components/ApplicationDeployableVersionStatus'
/* eslint-disable react/prop-types */

resources(() => {
  require('./style.scss')
})

const mapDispatchToProps = dispatch => {
  return {
    updateSecondaryHeaderInfo: (title, breadCrumbs) =>
      dispatch(updateSecondaryHeader(title, [], breadCrumbs, []))
  }
}

const mapStateToProps = () => {
  const deployableDetails = getDeployableDetails(sampleData)
  const subscriptions = getSubscriptions(sampleData)
  const channels = getChannels(sampleData)

  return { deployableDetails, subscriptions, channels }
}

class ApplicationDeployableDetails extends React.Component {
  componentWillMount() {
    const { updateSecondaryHeaderInfo, params } = this.props
    const { locale } = this.context
    const deployableParams =
      (params && params.match && params.match.params) || {}
    const breadCrumbs = getBreadCrumbs(deployableParams, locale)

    updateSecondaryHeaderInfo(deployableParams.name || '', breadCrumbs)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="ApplicationDeployableDetails">
        <ApplicationDeployableHighlights />
        <ApplicationDeployableSubscription
          subscription={this.props.subscriptions}
        />
        <ApplicationDeployableVersionStatus
          deployableDetails={this.props.deployableDetails}
          channels={this.props.channels}
          subscriptions={this.props.subscriptions}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ApplicationDeployableDetails
)