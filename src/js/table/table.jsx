import { connect } from 'react-redux';
import * as actions from './actions';
var cx = window.classNames;


/**
 * Cell component for the checkboxes
 */
let CellComponent = ({rowID, cellID, role, onToggle, dispatch}) => {
  return (
    <td>
      <input type="checkbox"
        checked={role.selected}
        onChange={() => onToggle(rowID, cellID, role.selected)}
      />
    </td>
  );
}
CellComponent = connect(
  null,
  (dispatch) => {
    return {
      onToggle: (rowID, cellID, selected) => {
        dispatch(actions.toggleCheckboxInTable(rowID, cellID, selected));
      }
    }
  }
)(CellComponent);

/**
 * Table row component
 */
let RowComponent = ({onToggleDelete, onDelete, person, rowID}) => {
  var cells = [];
  person.roles.forEach((role, i) => {
    cells.push(<CellComponent role={role} key={i} cellID={i} rowID={rowID}  />);
  });
  var classes = cx({
    'delete-cell': true,
    'toggle': person.toggleDelete
  });
  return (
    <tr>
      <td>{person.name}</td>
      {cells}
      <td className={classes}>
        <button className="btn btn-default delete" onClick={() => onToggleDelete(rowID)}>Delete</button>
        <div className="choose">
          <button className="btn btn-default" onClick={() => onDelete(rowID)}>Yes</button>
          <button className="btn btn-default" onClick={() => onToggleDelete(rowID, false)}>No</button>
        </div>
      </td>
    </tr>
  );
};

RowComponent = connect(
  (store, props) => {
    return {
      people: store.people,
      person: store.people[props.rowID]
    }
  },
  (dispatch) => {
    return {
      onToggleDelete: (rowID, value) => {
        dispatch(actions.toggleDelete(rowID, value));
      },
      onDelete: (rowID) => {
        dispatch(actions.deletePerson(rowID));
      }
  }
})(RowComponent);


/**
 * Table component
 */
let TableComponent = ({people}) => {
  var tdRows = [];
  people.forEach((person, i) => {
    tdRows.push(<RowComponent key={i} rowID={i} />);
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Super Power</th>
          <th>Rich</th>
          <th>Genius</th>
        </tr>
      </thead>
      <tbody>
        {tdRows}
      </tbody>
    </table>
  );
};

TableComponent = connect(function (store) {
  return {
    people: store.people,
  }
})(TableComponent);

/**
 * Form checkbox component
 */
var AddPersonRole = ({onChange, addID, role}) => (
  <div className="form-group">
    <label htmlFor={role.slug}>{role.text}</label>
    <input id={role.slug} type="checkbox" checked={role.selected} onChange={onChange} />
  </div>
);

AddPersonRole = connect(
  null,
  (dispatch, props) => {
    return {
      onChange: () => dispatch(actions.changeFormCheckbox(props.addID))
    }
  }
)(AddPersonRole);

/**
 * Form for adding a new person
 */
let AddPersonFormComponent = ({onChange, onSubmit, clearInput, roles, inputVal}) => {
  var checkboxes = [];
  roles.forEach((role, i) => {
    checkboxes.push(<AddPersonRole role={role} key={i} addID={i} />);
  });
  return (
    <form className="navbar-form navbar-left" onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" value={inputVal} onChange={onChange} />
      </div>
      {checkboxes}
      <button type="submit" className="btn btn-default">{'Submit'}</button>
    </form>
  );
};

AddPersonFormComponent = connect(
  (store) => {
    return {
      inputVal: store.inputVal,
      roles: store.roles
    }
  },
  (dispatch, store) => {
    return {
      onSubmit: function (e) {
        e.preventDefault();
        dispatch(actions.addPerson());
      },
      onChange: (e) => { dispatch(actions.addInputChange(e.target.value)); },
      clearInput: () => { dispatch(actions.clearInput()) }
    }
  }
)(AddPersonFormComponent);

/**
 * Container component
 */
let PeopleComponent = React.createClass({
  
  checkPersonInTable: function (rowID, cellID) {
    var state = JSON.parse(JSON.stringify(this.state));
    var role = state.people[rowID].roles[cellID];
    role.selected = !role.selected;
    this.setState(state);
  },
  addInputChange: function (e) {
    var state = Object.assign({}, this.state, {inputVal: e.target.value});
    this.setState(state);
  },
  clearFormInput: function () {
    var state = Object.assign({}, this.state, {inputVal: ''});
    this.setState(state);
  },
  addPerson: function (cb) {
    if (!this.state.inputVal) { return; }
    var people = [...this.state.people];
    var person = {
      id: ++this.state.id,
      name: this.state.inputVal,
      roles: [...this.state.roles]
    }
    people.push(person);
    var state = Object.assign({}, this.state, {people: people});
    this.setState(state, cb);
  },
  checkAddFormInput: function (i) {
    var state = JSON.parse(JSON.stringify(this.state));
    state.roles[i].selected = !state.roles[i].selected;
    this.setState(state);
  },
  deletePerson: function (i) {
    var state = JSON.parse(JSON.stringify(this.state));
    state.people.splice(i, 1);
    this.setState(state);
  },
  toggleDelete: function (rowID, val) {
    var state = JSON.parse(JSON.stringify(this.state));
    state.people[rowID].toggleDelete = typeof val !== 'undefined' ? val : !state.people[rowID].toggleDelete;
    this.setState(state);
  },
  render: function () {
    return (
      <div className="people-component">
        <h1 className="page-header">{'Add new person'}</h1>
        <AddPersonFormComponent />
        <TableComponent />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

PeopleComponent = connect((state) => state)(PeopleComponent);

export { PeopleComponent };