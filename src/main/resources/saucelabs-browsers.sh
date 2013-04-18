#!/bin/bash
java -classpath "src/main/resources/lib/*" org.pouncilt.plugins.saucelabs.SauceLabMojo saucelabs-maven-plugin org.pouncilt.plugins 0.0.1-SNAPSHOT start pom.xml