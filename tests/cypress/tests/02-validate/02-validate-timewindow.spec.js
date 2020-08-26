/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import {
  getTimeWindowType,
  validateTimewindow,
  passTimeWindowType
} from "../../views/application";
const { wizards } = JSON.parse(Cypress.env("TEST_CONFIG"));

describe("Application", () => {
  for (const type in wizards) {
    const { name } = wizards[type];
    it(`should be validated from the timewindow - ${type}: ${name}`, () => {
      const timeWindowType = getTimeWindowType(name);
      const timeWindowData = passTimeWindowType(timeWindowType).timeWindowData;
      validateTimewindow(name, timeWindowType, timeWindowData);
    });
  }
});