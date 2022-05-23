# WheelShare

## Project Info

### Hazard Types
carBlocking, bikeBlocking, step, narrowSidewalk, other


### A key for understanding the fields in the database:
note: this is flexible and can be changed in case of frontend team needs.

Database fields are:

1. *id* - generated automatically by the db anytime a new object is entered. Not entered by user. Will be used to identify the hazard and perform actions on the hazard (i.e. updating and deleting).
   
2. *hazardType* - equivalent to Hazard types, as explained above (type:text).

3. *treated* - generated automatically by the db anytime a new object is entered. Not entered by user. Can be changed to 'treated' by user. Entered as text object ('true'/'false'), and converted to boolean (type in db is boolean).

4. *createdAt* - generated automatically by the db anytime a new object is entered. Not entered by user.

5. *updatedAt* - anytime hazard status is changed, this field saves the timestamp of change automatically, similar to *createdAt*. Meant to track changes and sort the db by relevancy when needed.

6. *dateUpdated* - date of last update - format is dd.mm.yyyy

7. *coordinates* - the geolocation shown in map (longitude & latitude).
  
8. *location* - a verbal and unmandatory description of the location (i.e. "Kaplan 10, Tel Aviv").
  
9. *info* - a verbal and unmandatory description of the location (i.e. "a big tree, no way to pass from the side" or "right below the traffic light").
