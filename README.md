# train-scheduler

https://daibhidhdwaum.github.io/train-scheduler/

The train scheduler required that the user was able to input parameters (first train time and train frequency)
and the app returns when the next train will arrive and the how many minutes until arrival. The app would then 
log this and update the train time when the page is refreshed.

I solved this problem by utilizing Firebase Database to store the information that the user entered, and then
used Moment.js to calculate when the next train would arrive and the number of minutes until arrival. 

The input parameters are entered in a form field and then pushed to the database via an on-click event. The numerical
values entered (first train time, Frequency) are then formatted in moment.js to military time, then the current 
minutes are divided to determine the modulus. The frequency is then subtracted from the remainder(modulus) to determine 
how many minutes away the next train is. The information stored in the database is then used to determine any changes in the time until the next train and the minutes away by referencing it and doing the calculations again each time the page is refreshed.
