# Improvements

1. - [x] Upon edit cancel could fetch worksheet from server to ensure most up to date
2. - [x] Backend and frontend have to limit to amount of students in a class **POSSIBLE VULNERABILITY**
3. - [ ] **IMPORTANT** There is a large vulnerability right now where the skill array length is not defined. This should probably be moved on the backend because if there is some sort of error on the frontend we could have mismatching arrays
4. - [ ] Modify time to support AM and PM... idk what I was thinking when I set this up
5. - [x] Should seperate the worksheet state so that typing is more seamless

## Todo

### Worksheet Inspect

- [ ] Error Handling on submit and displaying those errors on frontend
- [ ] Worksheet Deletion handling
- [ ] Worksheet level change modal
- [ ] Leaving page before saving when changes are made popup
- [ ] Ensure backend handles data properly

### Worksheet Create

### Grouping

### Dashboard

### Stretch Goals

- [ ] Skeleton loading components
- [ ] Some sort of caching to avoid constant rerenders on finderview and library
