const formState = {
  inputVal: '',
  roles: [
    {slug: 'superPower', text: 'Super Power', selected: false},
    {slug: 'rich', text: 'Rich', selected: true},
    {slug: 'genius', text: 'Genius', selected: true}
  ]
}

const people = [
  {id: 0, name: 'Hulk', roles: [{slug: 'superPower', selected: true}, {slug: 'rich', selected: false}, {slug: 'genius', selected: true}]},
  {id: 1, name: 'Obama', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]},
  {id: 2, name: 'Bill Gates', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]}
]


function tableApp(state = {}, action) {
  return Object.assign({}, addForm(state.addForm, action), { people: listing(state.people, action)});
}

function addForm(state = formState, action) {
  switch (action.type) {
    case 'CHANGE_FORM_CHECKBOX': {
      let newState = JSON.parse(JSON.stringify(state));
      newState.roles[action.id].selected = !newState.roles[action.id].selected
      return newState;
    }
    case 'CLEAR_FORM_INPUT': {
      return Object.assign({}, state, {inputVal: ''});
    }
    case 'ADD_INPUT_CHANGE': {
      return Object.assign({}, state, {inputVal: action.value});
    }
    default:
      return state;
  }
}

function listing(state = people, action) {
  switch (action.type) {
    case 'TOGGLE_DELETE': {
      let val,
        people = [...state];
      if (typeof action.val !== 'undefined') {
        val = action.val
      } else {
        val = !people[action.rowID].toggleDelete
      }
      people[action.rowID].toggleDelete = val;
      return people;
    }
    case 'DELETE_PERSON': {
      let people = [...state];
      people.splice(action.rowID, 1);
      return people;
    }
    case 'TOGGLE_CHECKBOX_TABLE': {
      let people = [...state];
      let role = people[action.rowID].roles[action.cellID];
      role.selected = !role.selected;
      return people;
    }
    case 'ADD_PERSON': {
      var val = action.str || 'ololo';
      if (!val) { return state; }
      return Object.assign({}, state, {people: [...state.people, {
        name: val,
        roles: [...state.roles]
      }]});
    }
    default:
      return state;
  }
}

export { tableApp };