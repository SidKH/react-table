export function clearInput() {
  return {
    type: 'CLEAR_FORM_INPUT'
  }
}

export function toggleDelete(rowID, value) {
  return {
    type: 'TOGGLE_DELETE',
    rowID: rowID,
    value: value
  }
}

export function deletePerson(rowID) {
  return {
    type: 'DELETE_PERSON',
    rowID: rowID
  }
}

export function toggleCheckboxInTable(rowID, cellID, selected) {
  return {
    type: 'TOGGLE_CHECKBOX_TABLE',
    rowID,
    cellID,
    selected
  }
}

export function addInputChange(value) {
  return {
    type: 'ADD_INPUT_CHANGE',
    value
  }
}

export function addPerson(str) {
  return {
    type: 'ADD_PERSON',
    str
  }
}

export function checkRoleInForm(id) {
  return {
    type: 'CHECK_ROLE_IN_FORM',
    id
  }
}

export function changeFormCheckbox(id) {
  return {
    type: 'CHANGE_FORM_CHECKBOX',
    id
  }
}