# Best practices to create an API in Node.js 🤓
Best practices in Api Rest with Node and express, implement TDD and other best practices principles.

## The motivation
Node.js it's a runtime environment to execute javascript in server side. Node is incredible to create I / O apps (in-out applications). A specific example is a REST API system. But, javascript programming and the Node.js architecture, delegate a lot resposability to developer.
The best practices, so, take a some sense in this kind of projects. Create a robust, large and scalable product is important. Express.js, the microframework used here, and popular technology in node.js environment, was created thinking in agnostic system, meaning, express can be adapted to any type of architecture.
Our responsability, as developers, is, in general termins, don't create a panic or pain project, and focus in programming, not in refactors, not in configurate our project all time, not in errors or chaos.


## The REST API principles

* Use HTTP verbs, in this version, the project used HTTP / 2
* Stateless endpoints, this meaning that our project don't create session in server, (only we use token services to auth or login-logout).
* All endpoint is in plural.
* Return a status code, using the HTTP Code:
    * 1xx - Information status
    * 2xx - Success status
    * 3xx - Redirections
    * 4xx - Client / user error
    * 5xx - Server error
* A resource is available in an url-path / URI / endpoint.
* Use Cors to avoid external request (this is not a strict principle, but is, in my personal perspective, needed).


## The technology used here:

* Typescript as the principal programming language
* Node.js as the runtime environment
* NPM to management Node.js dependencies and scripts
* Git and github to use control version software
* GitFlow methodology to order the code and create a robust framework to specific developing types, creating specific branches:
    * master (default branch, only to production using TAGS features from git)
    * develop (default branch, only to fork a branch and use to test and create release candidate)
    * feat / <name of branch> (New feature created)
    * fix / <name or number of issue> (fix anything issue in the project)
    * doc / <name to document> (to add documentation)
    * hotfix / <name or number of issue> (problem to fix in production, this type of branches should be forked from master, and merged to master and develop branches)
* TDD (Test driven developer), a methodology to programming based in testing models and implementation to coverage all testing create previusly. This methodology will guaranteed that us user-stories total coverage.
* Docker to container mongo and node.js images to encapsulate dependencies.
* Mongo an NoSQL database, popular in JS environment, using Objects and based in javascript object Notation (JSON)
* Winston a robust logger to send data a HTTP service
* Express js, a microframework to implement HTTP services using verbs and resources 
* HTTP (native node.js module), to managment HTTP server and shared protocol between express and other technology


### Notes
* If you like contribute, send your issue or create a pull request.



This project was create with ❤️