#!/bin/bash

# Copyright (c) 2020 Red Hat, Inc.

echo "Initiating tests..."

if [ -z "$CYPRESS_TEST_MODE" ]; then
  echo "CYPRESS_TEST_MODE not exported; setting to 'e2e' mode"
  export CYPRESS_TEST_MODE='e2e'
fi

if [ -z "$BROWSER" ]; then
  export BROWSER="chrome"
fi

# check and load options.yaml
OPTIONS_FILE=/resources/options.yaml
if [ -f $OPTIONS_FILE ]; then
  echo "Processing options file..."
  BASE_DOMAIN=`yq r $OPTIONS_FILE 'options.hub.baseDomain'`
  export CYPRESS_BASE_URL="https://multicloud-console.apps.$BASE_DOMAIN"
  export CYPRESS_OC_CLUSTER_USER=`yq r $OPTIONS_FILE 'options.hub.user'`
  export CYPRESS_OC_CLUSTER_PASS=`yq r $OPTIONS_FILE 'options.hub.password'`
  export CYPRESS_OC_IDP=`yq r $OPTIONS_FILE 'options.hub.idp'`

  cp $OPTIONS_FILE ./tests/cypress/config/config.e2e.yaml
else
  if [ $CYPRESS_TEST_MODE != "functional" ]; then
    echo "Options file not found..."
    exit 1
  fi
fi

#echo "Logging into Kube API server..."
#oc login --server=$CYPRESS_OC_CLUSTER_URL -u $CYPRESS_OC_CLUSTER_USER -p $CYPRESS_OC_CLUSTER_PASS --insecure-skip-tls-verify

echo "Running tests on $CYPRESS_BASE_URL in $CYPRESS_TEST_MODE mode..."
testCode=0
npx cypress run --config-file "./tests/cypress/cypress.json" --browser $BROWSER --reporter junit \
  --reporter-options "mochaFile=/results/cypress-e2e-[hash].xml"
testCode=$?

echo "Copying outputed screenshots and videos..."
cp -r ./cypress/screenshots /results/screenshots
cp -r ./cypress/videos /results/videos


# merge xml reports
# echo "Merging xml reports..."
# npm run test:merge-xml
# mkdir /results
# cp ./test-output/application-ui.xml /results
# ls -al /results

# if [[ ! -z "$SLACK_TOKEN" ]]; then
#   echo "Slack integration is configured; processing..."
#   npm run test:slack
# fi

if [ $CYPRESS_TEST_MODE == "functional" ]; then
  echo "Cleaning up functional test resources..."
  sh ./tests/cypress/scripts/resource-cleanup.sh
fi

exit $testCode