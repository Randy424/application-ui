/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import ResourceTableModule from './common/ResourceTableModuleFromProps'
import { withRouter } from 'react-router-dom'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import { typedResourcePageDetails } from './common/ResourcePage'
import CreateApplicationButton from './common/CreateApplicationButton'

export default withRouter(
  typedResourcePageDetails(
    RESOURCE_TYPES.QUERY_APPLICATIONS,
    [<CreateApplicationButton key="create" />],
    [],
    [<ResourceTableModule key="deployments" definitionsKey="deploymentKeys" />]
  )
)