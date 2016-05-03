import HP from './helpers';
import { PeopleComponent } from './table/table.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { tableApp } from './table/reducers';

(function ($) {

  var roles = [
    {slug: 'superPower', text: 'Super Power'},
    {slug: 'rich', text: 'Rich'},
    {slug: 'genius', text: 'Genius'}
  ];
  var people = [
    {id: 0, name: 'Hulk', roles: [{slug: 'superPower', selected: true}, {slug: 'rich', selected: false}, {slug: 'genius', selected: true}]},
    {id: 1, name: 'Obama', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]},
    {id: 2, name: 'Bill Gates', roles: [{slug: 'superPower', selected: false}, {slug: 'rich', selected: true}, {slug: 'genius', selected: true}]}
  ];

  let store = createStore(tableApp);

  ReactDOM.render(
    <Provider store={store}>
      <div class="container">
        <PeopleComponent />
      </div>
    </Provider>,
    document.getElementById('wrapper')
  );


}(jQuery));