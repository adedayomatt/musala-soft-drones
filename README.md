## Drones

[[_TOC_]]

---

:scroll: **START**


### Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

---

### Task description

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

A **Drone** has:
- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communicaiton with the drone is outside the scope of this task. 

The service should allow:
- registering a drone;
- loading a drone with medication items;
- checking loaded medication items for a given drone; 
- checking available drones for loading;
- check drone battery level for a given drone;

> Feel free to make assumptions for the design approach. 

---

### Requirements

While implementing your solution **please take care of the following requirements**: 

#### Functional requirements

- There is no need for UI;
- Prevent the drone from being loaded with more weight that it can carry;
- Prevent the drone from being in LOADING state if the battery level is **below 25%**;
- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Required data must be preloaded in the database.
- JUnit tests are mandatory (or tests done in the suitable framework based on the technology used for the task, for e.g. Zest, etc.);
- Advice: Show us how you work through your commit history.

---

:scroll: **END**

---
---
# Solution
---
---

## Musala Soft Drone REST API

The task implementation was first started in Java using the SpringBoot framework and later in NodeJS, this repo has the Java version on the `java` branch, node version on `node` branch and the two versions together on the `main` branch.  The applications have also been containerized alongside their dependencies.

> **NOTE:
This submission is primarily in NodeJS**

### Requirement
- **Docker**: All applications are ran as docker containers, ensure docker engine is running on the system.

#### Serivces
The following services are registered in the `docker-compose.yml`:
- `mysql-service`: Database service using `mysql:8` image.
- `java-drone-service`: Implementation in Java using the image `java-drone-image` built by the Dockerfile at  _`java/Dockerfile`_
- `node-drone-service`: Implementation in Node using the image `node-drone-image` built by the Dockerfile at _`node/Dockerfile`_
- `node-drone-cron-service`: A cron service to run periodic tasks. It also uses the image `node-drone-image`

All services can be built and started by running:
```
docker-compose up --build
```

### Implemenations
The Java version was uncompleted before switching to Node, the Java version has the following implementations:
- Registering of drones
- Getting all drones
- Getting drones available for loading
- Getting a drone and loaded medications
- Loading drone with medications
- Test for registering drone when request data are valid

NodeJS version has the complete implementations. It has all the implementations in Java and also:
- Getting drone loaded medications
- Getting drone battery level
- Periodic task that check drone battery level
  > The Periodic task assumes that battery level of every drone that is not `IDLE` reduces by **2%** every minute. A log is created to record the drone state and the battery level at every audit. This task is ran by the `node-drone-cron-service`
  if all services are not started together already, the cron service can be started by running
  ` docker-compose up node-drone-cron-service `
- Tests for the following cases
    - Pinging the service if it is up
    - Getting correct 404 reponse for invalid service url
    - Logging of incoming requests and corresponding responses
    - Reponding with validaton error when request data are invalid for drone registration
    - Registering drone successfully when request data are valid
        - Request data is a non-empty object
        - Request data has the keys `serialNumber`, `model`, `weightLimit`, `batteryCapacity`, `state`(optional)
        - `serialNumber` is not more than **100** characters
        - `weightLimit` is not more that **500**
        - `model` is one of _Lightweight_, _Middleweight_, _Cruiserweight_, _Heavyweight_
        - `state` if provided should be one of _IDLE_, _LOADING_, _LOADED_, _DELIVERING_, _DELIVERED_, _RETURNING_. If not provided, uses _IDLE_ as default
    - Responding with validation error when loading a drone with invalid medication data
    - Loading a drone successfully when medication data are valid.
        - Request body is an array of medication items
        - Each medication item is an object with the following keys `name`, `weight`, `code` and `image`
        - Each medication item `name` allows only letters, numbers, ‘-‘, ‘_’
        - Each medication `code` allows only upper case letters, underscore and numbers
        - Total `weight` of the medication items is not more that the drone weight limit

### Starting The Java Application
To start the Java application if all services are not already started, run
```
docker-compose up java-drone-service
```
This would also start the `mysql-service` (if not already running) as a dependency.
Application should be running at [http://localhost:8080](localhost::8080)

### Starting The Node Application
To start the node application if all services are not already started, run
```
docker-compose up node-drone-service
```
This would also start the `mysql-service` (if not already running) as a dependency.
Application should be running at [http://localhost:8000](localhost::8000)

### Testing The Node Application
The Node application uses [Mocha](https://mochajs.org) Javascript test framework alongside [chai](https://www.chaijs.com) for assertions. To test, ensure that the `node-drone-service` is already started and running , then run the command below to run the available test cases:
```
docker exec node-drone-service npm test
```