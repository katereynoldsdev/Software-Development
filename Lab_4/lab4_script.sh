#!/bin/bash
#Author: Kate Reynolds
#Date: 09/21/2020

sudo cp /var/log/syslog /home
egrep -i "error" /var/log/syslog >error_log_check.txt
mail -s 'Occurrences of Error' kare6804@colorado.edu <error_log_check.txt

