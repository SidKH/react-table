
var togglePerson = function () {
  console.log(TableComponent);
}

/**
 * Cell component for the checkboxes
 */
var CellComponent = React.createClass({
  onChange: function () {
    this.props.onToggle(this.props.rowID, this.props.cellID, this.props.role.selected);
  },
  render: function () {
    return (
      <td>
        <input type="checkbox" checked={this.props.role.selected} onChange={this.onChange} />
      </td>
    );
  }
});

/**
 * Table row component
 */
var RowComponent = React.createClass({
  render: function () {
    var cells = [];
    this.props.person.roles.forEach((role, i) => {
      cells.push(<CellComponent onToggle={this.props.onToggle} role={role} key={i} cellID={i} rowID={this.props.rowID}  />);
    });
    return (
      <tr>
        <td>{this.props.person.name}</td>
        {cells}
      </tr>
    );
  }
});

/**
 * Table component
 */
var TableComponent = React.createClass({
  render: function () {
    var tdRows = [];
    this.props.people.forEach((person, i) => {
      tdRows.push(<RowComponent onToggle={this.props.onToggle} person={person} key={i} rowID={i} />);
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
  }
});

/**
 * Form checkbox component
 */
var AddPersonRole = React.createClass({
  onChange: function () {
    this.props.onCheck(this.props.addID);
  },
  render: function () {
    return (
      <div className="form-group">
        <label htmlFor={this.props.role.slug}>{this.props.role.text}</label>
        <input id={this.props.role.slug} type="checkbox" checked={this.props.role.selected} onChange={this.onChange} />
      </div>
    );
  }
});

/**
 * Form for adding a new person
 */
var AddPersonFormComponent = React.createClass({
  onClick: function () {
    this.props.onAddPerson();
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmit(this.props.clearForm);
  },
  render: function () {
    var checkboxes = [];
    this.props.roles.forEach((role, i) => {
      checkboxes.push(<AddPersonRole onCheck={this.props.onCheck} role={role} key={i} addID={i} />);
    });
    return (
      <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={this.props.inputVal} onChange={this.props.onChange} />
        </div>
        {checkboxes}
        <button type="submit" className="btn btn-default">{'Submit'}</button>
      </form>
    );
  }
});

/**
 * Container component
 */
var PeopleComponent = React.createClass({
  getInitialState: function () {
    var roles = this.props.roles.map(function (role) {
      role.selected = false;
      return role;
    });
    return {
      id: 0,
      inputVal: '',
      roles: roles,
      people: this.props.people
    }
  },
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
  render: function () {
    return (
      <div className="people-component">
        <h1 className="page-header">{'Add new person'}</h1>
        <AddPersonFormComponent
          clearForm={this.clearFormInput}
          inputVal={this.state.inputVal}
          roles={this.state.roles}
          onChange={this.addInputChange}
          onSubmit={this.addPerson}
          onCheck={this.checkAddFormInput}
        />
        <TableComponent
          onToggle={this.checkPersonInTable}
          people={this.state.people}
        />
      </div>
    );
  }
});

export { PeopleComponent };