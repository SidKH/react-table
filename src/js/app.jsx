import HP from './helpers';
import { PeopleComponent } from './table/table.jsx';

(function ($) {

  var roles = [
    {slug: 'superPower', text: 'Super Power'},
    {slug: 'rich', text: 'Rich'},
    {slug: 'genius', text: 'Genius'}
  ];
  var people = [
    {id: 0, name: 'Hulk', roles: [{slug: 'superPower', status: true}, {slug: 'rich', status: false}, {slug: 'genius', status: true}]},
    {id: 1, name: 'Obama', roles: [{slug: 'superPower', status: false}, {slug: 'rich', status: true}, {slug: 'genius', status: true}]},
    {id: 2, name: 'Bill Gates', roles: [{slug: 'superPower', status: false}, {slug: 'rich', status: true}, {slug: 'genius', status: true}]}
  ];

  ReactDOM.render(
    <div class="container">
      <PeopleComponent people={people} />
    </div>,
    document.getElementById('wrapper')
  );


}(jQuery));