# Job Title: Front-End Developer (React, Material UI)

## Requirement:
Create a hosted web app using React and Material UI with two views using the data provided above. One view is a table and chart that updates as the table changes. The second view is a pivot table with a corresponding pivot chart that updates in sync as well.

[X] Include all data from the data file
[X] Table view needs to have:
 - Pagination
 - Column filters
 - Sorting
 - Search
 - Format data fields as appropriate
 - Ability to customize the columns size displayed and their order
[X] Data in the chart should be editable and saved after closing the browser
 - Cells should have data validation e.g. datetime fields can only accept date-time inputs
[X] Corresponding chart should be a bar graph that displays all the companies that went "Out of Service" per month
 - Note: Bar graph must be table filters aware. E.g if user filters for entity_type="CARRIER", the chart should only account for entity_type="CARRIER" records
[X] App should remember the user’s table setup until cache is cleared
 - Extra modal that allows savings and loading views/templates
 - Ability to reset table setup settings to default
[X] Pivot table version of the table
 - Datetime groupable by year/month/week
 - Pivot chart should sync with the pivot table
[X] Allow generating share links where if another user clicks the share link, they see the same table format and data as you
[X] Host it somewhere and show us the link
[X] Make loom presenting their dashboard and code