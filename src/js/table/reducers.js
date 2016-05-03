const initialState = {
  inputVal: '',
  roles: [
    {slug: 'superPower', text: 'Super Power'},
    {slug: 'rich', text: 'Rich'},
    {slug: 'genius', text: 'Genius'}
  ],
  people: [
    {id: 0, name: 'Hulk', roles: [{slug: 'superPower', selected: true}, {slug: 'rich', selected: false}, {slug: 'genius', selected: true}]},
    {id: 1, name: 'Obama', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]},
    {id: 2, name: 'Bill Gates', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]}
  ]
}
function tableApp(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_FORM_INPUT': {
      return Object.assign({}, state, {inputVal: ''});
    }
    case 'TOGGLE_DELETE': {
      let val,
        people = [...state.people];
      if (typeof action.val !== 'undefined') {
        val = action.val
      } else {
        val = !state.people[action.rowID].toggleDelete
      }
      people[action.rowID].toggleDelete = val;
      return Object.assign({}, state, {people: people});
    }
    case 'DELETE_PERSON': {
      let people = [...state.people];
      people.splice(action.rowID, 1);
      return Object.assign({}, state, {people: people});
    }
    case 'TOGGLE_CHECKBOX_TABLE': {
      let newState = JSON.parse(JSON.stringify(state));
      let role = newState.people[action.rowID].roles[action.cellID];
      role.selected = !role.selected;
      return newState;
    }
    case 'ADD_INPUT_CHANGE': {
      return Object.assign({}, state, {inputVal: action.value});
    }
    case 'ADD_PERSON': {
      var val = action.str || state.inputVal;
      if (!val) { return state; }
      return Object.assign({}, state, {people: [...state.people, {
        name: action.str || state.inputVal,
        roles: [...state.roles]
      }]});
    }
    default:
      return state;
  }
}

export { tableApp };