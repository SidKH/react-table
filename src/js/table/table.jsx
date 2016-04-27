
var togglePerson = function () {
  console.log(TableComponent);
}

/**
 * Cell component for the checkboxes
 */
var CellComponent = React.createClass({
  onChange: function () {
    this.props.onToggle(this.props.rowID, this.props.cellID, this.props.role.status);
  },
  render: function () {
    return (
      <td>
        <input type="checkbox" checked={this.props.role.status} onChange={this.onChange} />
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
 * Form for adding a new person
 */
var AddPersonFormComponent = React.createClass({
  onClick: function () {
    this.props.onAddPerson();
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmit();
  },
  render: function () {
    return (
      <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={this.props.inputVal} onChange={this.props.onChange} />
        </div>
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
    return {
      inputVal: '',
      people: this.props.people
    }
  },
  checkPersonInTable: function (rowID, cellID, status) {
    var people = [...this.state.people];
    people[rowID].roles[cellID].status = !people[rowID].roles[cellID].status;
    this.setState({people: people});
  },
  addInputChange: function (e) {
    var state = Object.assign({}, this.state, {inputVal: e.target.value});
    this.setState(state);
  },
  clearFormInput: function () {
    var state = Object.assign({}, this.state, {inputVal: ''});
    this.setState(state);
  },
  addPerson: function () {
    var people = [...this.state.people];
    var person = {
      id: 3,
      name: this.state.inputVal,
      roles: [{slug: 'superPower', status: false}, {slug: 'rich', status: false}, {slug: 'genius', status: false}]
    }
    people.push(person);
    var state = Object.assign({}, this.state, {people: people});
    this.setState(state);
  },
  render: function () {
    return (
      <div className="people-component">
        <h1 className="page-header">{'Add new person'}</h1>
        <AddPersonFormComponent clearForm={this.clearFormInput} inputVal={this.state.inputVal} onChange={this.addInputChange} onSubmit={this.addPerson} />
        <TableComponent onToggle={this.checkPersonInTable} people={this.state.people} />
      </div>
    );
  }
});

export { PeopleComponent };