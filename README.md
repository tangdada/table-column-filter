# table-column-filter

A Vue component that controls the columns of a table
vue2 and vue3 are both available

## How to use ?
### step 1
```
npm install table-column-filter
```

### step 2
```
import 'table-column-filter'
or
require('table-column-filter')

in main.js or anywhere
```

### step 3
```
1. add directive v-table-column-filter to table tag
2. add attribute "col" to "th" tag

eg.
<table v-table-column-filter>
  <th col="col1">col1</th>
  <th col="col2" basic>col2</th>
  <th col="col3" unchecked>col3</th>
  <th col="col4">col4</th>
</table>
```

## options

### basic
```
basic column, cannot cancel
eg. <th col="col2" basic>col2</th>
```

### unchecked
```
default empty
eg. <th col="col3" unchecked>col3</th>
```

### v-table-column-filter-simple
```
if you want the simple version, you can use directive v-table-column-filter-simple
eg. <table v-table-column-filter-simple>
```
