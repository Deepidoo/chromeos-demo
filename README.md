# ChromeOS reproducible bug demo app

## Description

This is a PWA targeting ChromeOS. It is used to demonstrate a bug at load time

## Installation

Add this app to your Google admin console. As of 2024-12-20 this demo is deployed on this domain:

https://chromeos.deepidoo.me/

## Issues

- Sometimes the Service Worker is not loaded ("unknown error"), but it doesn't prevent the rest of the code to perform the reboot.
- Sometimes the app only show up a blank screen and stops working. No log, no error in console, just a blank HTML document. In this case the rest of the code is not executed and the Device is stuck until you reboot it manually.

## How to reproduce

Simply install + run this app on a ChromeOS device using Kiosk mode. After a random amount of reboot (sometimes the very first one, more likely between 5 and 20 reboots), you'll reproduce the bug.
