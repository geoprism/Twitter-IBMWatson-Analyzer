import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.searchBar.events({
  'submit .searchForm'(event) {
    event.preventDefault();
    console.log(event.target.searchbar.value);
  },
});
