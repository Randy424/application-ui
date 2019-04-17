/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import _ from 'lodash'

// compensate for spotty weave data
export const getBufferedResponse = (state, action) => {
  const { buffer={} } = state
  const { links } = action
  let { nodes=[] } = action

  // weave scans can miss all nodes between scans
  buffer.hadNodes = buffer.hadNodes || nodes.length>0
  if (buffer.hadNodes && nodes.length===0) {
    if (buffer.latency===undefined) {
      buffer.latency = 6
    }
    buffer.latency -= 1
    // give it 3 scans where all objects are missing before we refresh topology with nothing
    if (buffer.latency>0) {
      return { nodes: buffer.nodes, links: buffer.links, buffer }
    }
  }
  delete buffer.latency

  // weave scans can:
  //  1) include multiple copies of the same node
  //  2) miss some or ALL nodes between scans
  const nodeMap = _.keyBy(nodes, 'uid')
  const prevNodeMap = _.keyBy(buffer.nodes, 'uid')
  for (var uid in prevNodeMap) {
    const prevNode = prevNodeMap[uid]
    if (!nodeMap[uid]) {
      // if node is missing in this scan, see if it reappears in the next 3 scans
      if (prevNode.latency===undefined) {
        prevNode.latency = 3
      }
      prevNode.latency -= 1
      // give it 3 scans where an object is missing before we remove it
      if (prevNode.latency>=0) {
        nodeMap[uid] = prevNode
      }
    } else {
      // if it's back, forget it was ever gone
      delete prevNode.latency
    }
  }
  nodes = Object.values(nodeMap)
  buffer.nodes = _.cloneDeep(nodes)
  buffer.links = _.cloneDeep(links)

  return { nodes, links, buffer }
}