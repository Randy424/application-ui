/*******************************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *******************************************************************************/
"use strict";

import {
  updateNodeStatus,
  updateNodeIcons
} from "../../../../../../src-web/components/Topology/viewer/defaults/status";

const locale = "en-US";

const clusterNodes = [
  {
    id: "member--clusters--cluster1",
    uid: "member--clusters--cluster1",
    name: "cluster1",
    cluster: null,
    clusterName: null,
    type: "cluster",
    specs: {
      cluster: {
        metadata: {
          name: "cluster1",
          namespace: "cluster1",
          selfLink:
            "/apis/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters/cluster1",
          uid: "98a0e1b0-519c-11ea-9c87-965ebc50d5a3",
          resourceVersion: "796601",
          creationTimestamp: "2020-02-17T15:46:00Z",
          labels: {
            cloud: "IBM",
            env: "prod",
            name: "cluster1",
            region: "paris",
            vendor: "RHOCP"
          }
        },
        usage: {
          cpu: "2808m",
          memory: "5543Mi",
          pods: "65",
          storage: "20Gi"
        },
        status: "ok"
      },
      clusterNames: ["cluster1"],
      clusterStatus: {
        isOffline: false,
        hasViolations: false,
        hasFailure: false,
        isRecent: false,
        isDisabled: false
      },
      scale: 1
    },
    namespace: "",
    topology: null,
    labels: null,
    __typename: "Resource"
  }
];

const podNodes = [
  {
    id:
      "member--pod--member--deployable--member--clusters--az01--pacmangitchannel--pacmangitchannel-deployment--pacmangit--pacmangit",
    uid:
      "member--pod--member--deployable--member--clusters--az01--pacmangitchannel--pacmangitchannel-deployment--pacmangit--pacmangit",
    name: "pacmangit",
    cluster: null,
    clusterName: null,
    type: "pod",
    specs: {
      raw: {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          labels: {
            app: "pacmangit"
          },
          name: "pacmangit"
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              name: "pacmangit"
            }
          },
          template: {
            metadata: {
              labels: {
                name: "pacmangit"
              }
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: "MONGO_SERVICE_HOST",
                      value:
                        "b8eec768-c48d-4022-9c32-b6083afed0c9-0.bngflf7f0ktkmkdl3jhg.databases.appdomain.cloud"
                    },
                    {
                      name: "MONGO_AUTH_USER",
                      value: "ibm_cloud_82d27531_5290_4a59_b1c4_5cbef1154ea3"
                    },
                    {
                      name: "MONGO_REPLICA_SET",
                      value: "replset"
                    },
                    {
                      name: "MONGO_AUTH_PWD",
                      value:
                        "f197cc208307f82e2e0de68b781f7a128cf6a98eed3e38e10fcf2309c6e91455"
                    },
                    {
                      name: "MONGO_DATABASE",
                      value: "admin"
                    },
                    {
                      name: "MY_MONGO_PORT",
                      value: "30692"
                    },
                    {
                      name: "MONGO_USE_SSL",
                      value: "true"
                    },
                    {
                      name: "MONGO_VALIDATE_SSL",
                      value: "false"
                    },
                    {
                      name: "MY_NODE_NAME",
                      valueFrom: {
                        fieldRef: {
                          fieldPath: "spec.nodeName"
                        }
                      }
                    },
                    {
                      name: "COLOR",
                      value: "rgb(197, 33, 33)"
                    },
                    {
                      name: "MY_IMAGE",
                      value: "RedHat"
                    },
                    {
                      name: "MESSAGE",
                      value: "Initial Version"
                    }
                  ],
                  image: "docker.io/rfontain/pacman:v1",
                  imagePullPolicy: "Always",
                  name: "pacmangit",
                  ports: [
                    {
                      containerPort: 8080
                    }
                  ]
                }
              ],
              serviceAccount: "pacmangit"
            }
          }
        }
      },
      row: 984,
      podModel: {
        "pacmangit-668ff55c4d-m2cgt": {
          name: "pacmangit-668ff55c4d-m2cgt",
          namespace: "pacmangit",
          status: "Running",
          cluster: {
            metadata: {
              name: "az01"
            }
          },
          containers: [
            {
              name: "pacmangit",
              image: "docker.io/rfontain/pacman:v1"
            }
          ],
          creationTimestamp: "2020-03-20T13:22:54Z",
          labels: {
            name: "pacmangit",
            "pod-template-hash": "2249911708"
          },
          hostIP: "10.65.71.148",
          podIP: "172.30.92.237",
          restarts: 0,
          startedAt: "2020-03-20T13:22:54Z"
        },
        "pacmangit-668ff55c4d-fmnh4": {
          name: "pacmangit-668ff55c4d-fmnh4",
          namespace: "pacmangit",
          status: "Running",
          cluster: {
            metadata: {
              name: "cluster1"
            }
          },
          containers: [
            {
              name: "pacmangit",
              image: "docker.io/rfontain/pacman:v1"
            }
          ],
          creationTimestamp: "2020-03-19T19:05:58Z",
          labels: {
            name: "pacmangit",
            "pod-template-hash": "2249911708"
          },
          hostIP: "10.126.109.199",
          podIP: "172.30.167.142",
          restarts: 0,
          startedAt: "2020-03-19T19:05:58Z"
        }
      },
      podStatus: {
        hasPending: false,
        hasFailure: false,
        hasRestarts: false,
        hostIPs: ["10.65.71.148", "10.126.109.199"]
      },
      pulse: null
    },
    namespace: "",
    topology: null,
    labels: null,
    __typename: "Resource"
  }
];

describe("updateNodeStatus cluster nodes", () => {
  it("should update cluster node", () => {
    expect(updateNodeStatus(clusterNodes, locale)).toEqual(undefined);
  });
});

describe("updateNodeStatus cluster nodes", () => {
  it("should update pod node", () => {
    expect(updateNodeStatus(podNodes, locale)).toEqual(undefined);
  });
});

describe("updateNodeIcons cluster nodes", () => {
  it("should update cluster node icon", () => {
    expect(updateNodeIcons(clusterNodes, locale)).toEqual(undefined);
  });
});

describe("updateNodeIcons pod nodes", () => {
  it("should update pod node icon", () => {
    expect(updateNodeIcons(podNodes, locale)).toEqual(undefined);
  });
});