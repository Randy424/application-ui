###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2017, 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

include Configfile

SHELL := /bin/bash

NAMESPACE ?= kube-system
DOCKER_PASS ?= $(DOCKER_PASSWORD)
DOCKER_BUILD_OPTS= --build-arg "VCS_REF=$(VCS_REF)" \
           --build-arg "VCS_URL=$(GIT_REMOTE_URL)" \
           --build-arg "IMAGE_NAME=$(IMAGE_NAME)" \
					--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
					--build-arg "IMAGE_DISPLAY_NAME=$(IMAGE_DISPLAY_NAME)" \
					--build-arg "IMAGE_NAME_ARCH=$(IMAGE_NAME_ARCH)" \
					--build-arg "IMAGE_MAINTAINER=$(IMAGE_MAINTAINER)" \
					--build-arg "IMAGE_VENDOR=$(IMAGE_VENDOR)" \
					--build-arg "IMAGE_VERSION=$(IMAGE_VERSION)" \
					--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
					--build-arg "IMAGE_SUMMARY=$(IMAGE_SUMMARY)" \
					--build-arg "IMAGE_OPENSHIFT_TAGS=$(IMAGE_OPENSHIFT_TAGS)"

ifneq ($(BUILD_HARNESS_ARCH),amd64)
DOCKER_FILE = Dockerfile.$(ARCH)
endif

ifneq ($(BUILD_HARNESS_ARCH),amd64)
DOCKER_FILE = Dockerfile.$(ARCH)
endif

.PHONY: default
default:: init;

.PHONY: init\:
init::
	@mkdir -p variables
ifndef GITHUB_USER
	$(info GITHUB_USER not defined)
	exit -1
endif
GITHUB_USER := $(shell echo $(GITHUB_USER) | sed 's/@/%40/g')
ifndef GITHUB_TOKEN
	$(info GITHUB_TOKEN not defined)
	exit -1
endif

-include $(shell curl -fso .build-harness -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3.raw" "https://raw.github.ibm.com/ICP-DevOps/build-harness/master/templates/Makefile.build-harness"; echo .build-harness)

.PHONY: copyright-check
copyright-check:
	./copyright-check.sh

lint:
	npm run lint

install:
	npm install

prune:
	npm prune --production


.PHONY: build
build:
	npm run build:production

image:: build lint prune

.PHONY: docker-logins
docker-logins:
	make docker:login DOCKER_REGISTRY=$(DOCKER_EDGE_REGISTRY)
	make docker:login DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY)
	make docker:login DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY)

.PHONY: image
image:: docker-logins
	make docker:info
	make docker:build

.PHONY: run
run:
	# Both containers mcm-application-ui and mcm-ui-api must be on the same network.
	docker network create --subnet 10.10.0.0/16 mcm-network
	docker run \
	-e NODE_ENV=development \
	-e cfcRouterUrl=$(cfcRouterUrl) \
	-e PLATFORM_IDENTITY_PROVIDER_URL=$(PLATFORM_IDENTITY_PROVIDER_URL) \
	-e WLP_CLIENT_ID=$(WLP_CLIENT_ID) \
	-e WLP_CLIENT_SECRET=$(WLP_CLIENT_SECRET) \
	-e WLP_REDIRECT_URL=$(WLP_REDIRECT_URL) \
	-e hcmUiApiUrl=https://10.10.0.5:4000/hcmuiapi \
	--name mcm-application-ui \
	--network mcm-network \
	-d -p $(HOST):$(APP_PORT):$(CONTAINER_PORT) $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION)

.PHONY: test
test:
	npm install \
	del@3.0.0 \
	enzyme@3.7.0 \
	enzyme-adapter-react-16@1.6.0 \
	jest@22.4.2 \
	react-test-renderer@16.4.0 \
	jsonfile@4.0.0 \
	redux-mock-store@1.5.1 \
	jest-tap-reporter@1.9.0 \
	properties-parser@0.3.1
ifeq ($(UNIT_TESTS), TRUE)
	if [ ! -d "test-output" ]; then \
		mkdir test-output; \
	fi
	npm test
endif
# ifeq ($(SELENIUM_TESTS), TRUE)
# ifeq ($(OSARCH), linux-amd64)
# 	docker pull $(IMAGE_REPO)/mcm-ui-api-amd64
# 	docker run \
# 	-e NODE_ENV=test \
# 	-e MOCK=true \
# 	--name mcm-ui-api \
# 	--network mcm-network \
# 	--ip 10.10.0.5 \
# 	-d -p 127.0.0.1:4000:4000 $(IMAGE_REPO)/mcm-ui-api-amd64
# 	npm install selenium-standalone@6.16.0 xml2json@0.11.0 nightwatch@0.9.21
# 	nightwatch
# endif
# endif

.PHONY:
image-dev: build
	docker build -t $(IMAGE_NAME_ARCH):latest .

.PHONY: push
push:
	$(eval DOCKER_REGISTRY = $(DOCKER_SCRATCH_REGISTRY))
	make docker:login DOCKER_REGISTRY=$(DOCKER_REGISTRY)
	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_REGISTRY)
	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_REGISTRY)

.PHONY: release
release:
	$(eval DOCKER_REGISTRY = $(DOCKER_INTEGRATION_REGISTRY))
	make docker:login DOCKER_REGISTRY=$(DOCKER_REGISTRY)
	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_REGISTRY)
	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_REGISTRY)
ifeq ($(ARCH), x86_64)
	#$(eval DOCKER_TAG = $(RELEASE_TAG)-rhel)
	make docker:tag-arch DOCKER_ARCH_URI=$(DOCKER_REGISTRY)/$(DOCKER_NAMESPACE)/$(IMAGE_NAME_ARCH):$(RELEASE_TAG)-rhel DOCKER_REGISTRY=$(DOCKER_REGISTRY)
	make docker:push-arch DOCKER_ARCH_URI=$(DOCKER_REGISTRY)/$(DOCKER_NAMESPACE)/$(IMAGE_NAME_ARCH):$(RELEASE_TAG)-rhel DOCKER_REGISTRY=$(DOCKER_REGISTRY)
endif

#include Makefile.docker
include Makefile.cicd
