@echo off

REM Windows script for running unit tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - karma (npm install -g karma)

set BASE_DIR=%~dp0
karma start "%BASE_DIR%\..\resources\karma.conf.js" %*
