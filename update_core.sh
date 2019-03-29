#!/bin/sh

cd services/users && yarn update:all && yarn --check-files
