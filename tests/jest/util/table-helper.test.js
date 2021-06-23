/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/
'use strict'
import tableHelper from '../../../src-web/util/table-helper'

describe('table-helper handleInputValue', () => {
  const item = {
    target: {
      value: 'world'
    }
  }
  const fn = jest.fn()
  it('handleInputValue should execute call back function', () => {
    tableHelper.handleInputValue(fn, item)
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith(expect.stringContaining('world'))
  })
})

describe('table-helper handleSort newSortColumn==defaultSortColumn', () => {
  const item = {
    currentTarget: {
      getAttribute() {
        return null
      }
    }
  }
  const fn = jest.fn()
  it('handleSort should execute call back function', () => {
    tableHelper.handleSort(true, true, fn, item)
    expect(fn).toHaveBeenCalled()
    expect(fn.mock.calls[0][0]).toBe('asc')
    expect(fn.mock.calls[0][1]).toBe(null)
  })

  it('handleSort should execute call back function', () => {
    tableHelper.handleSort(true, false, fn, item)
    expect(fn).toHaveBeenCalled()
    expect(fn.mock.calls[0][0]).toBe('asc')
    expect(fn.mock.calls[0][1]).toBe(null)
  })
})

describe('table-helper handleSort newSortColumn!=defaultSortColumn', () => {
  const item_asc = {
    currentTarget: {
      getAttribute(input) {
        if (input === 'data-key') {
          return 'asc'
        }
        return null
      }
    }
  }
  const fn = jest.fn()
  it('handleSort should execute call back function', () => {
    tableHelper.handleSort(true, false, fn, item_asc)
    expect(fn).toHaveBeenCalled()
    expect(fn.mock.calls[0][0]).toBe('asc')
    expect(fn.mock.calls[0][1]).toBe('asc')
  })
  it('handleSort should execute call back function', () => {
    tableHelper.handleSort(true, 'asc', fn, item_asc)
    expect(fn).toHaveBeenCalled()
    expect(fn.mock.calls[0][0]).toBe('asc')
    expect(fn.mock.calls[0][1]).toBe('asc')
  })
})