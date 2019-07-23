/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from '../../../node_modules/react';
import msgs from '../../../nls/platform.properties';
import { withLocale } from '../../providers/LocaleProvider';
import resources from '../../../lib/shared/resources';
import { Icon } from 'carbon-components-react';

resources(() => {
  require('./style.scss')
})

const ApplicationDeployableSubscription = withLocale(({ subscription, locale }) => {
  return (
    <div id="ApplicationDeployableSubscription">
      <div className="deployable-subscription-header">
        {msgs.get('description.title.deployableSubscription', locale)}
      </div>

      <div className="deployable-subscription-container">
        <div className="deployable-subscription-edit-container">
          <p className="yamlEditIconTitle">YAML</p>
          <Icon
            name="icon--edit"
            fill="#6089bf"
            description=""
            className="yamlEditIcon"
          />
        </div>
        <div className="deployable-subscription-tile-container">
          <div className="subscription-name">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.subscriptionName')}</div>
            <span className="tile-content">{subscription.name ? subscription.name : "-"}</span>
          </div>
          <div className="landing-channel">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.landingChannel')}</div>
            <span className="tile-content">{subscription.channel ? subscription.channel : "-"}</span>
          </div>
          <div className="certificates">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.certificates')}</div>
            <span className="tile-content">{subscription.certificates ? subscription.certificates : "-"}</span>
          </div>
          <div className="annotations">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.annotations')}</div>
            <span className="tile-content">{subscription.annotations ? subscription.annotations : "-"}</span>
          </div>
          <div className="placement-rules">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.placementRules')}</div>
            <span className="tile-content">{subscription.rules ? subscription.rules : "-"}</span>
          </div>
          <div className="version">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.version')}</div>
            <span className="tile-content">{subscription.version ? subscription.version : "-"}</span>
          </div>
          <div className="labels">
            <div className="tile-title">{msgs.get('description.title.deployableSubscription.labels')}</div>
            <span className="tile-content">{subscription.labels ? subscription.labels : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default withLocale(ApplicationDeployableSubscription)
