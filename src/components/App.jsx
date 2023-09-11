import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './FilterForm/FilterForm';
import { ContactList } from './ContactList/ContactList';
import { FormContainer, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  formSubmitHandler = data => {
    const dataWithId = {
      id: uuidv4(),
      ...data,
    };

    this.state.contacts
      .map(({ name }) => name.toLocaleLowerCase())
      .includes(dataWithId.name.toLocaleLowerCase())
      ? alert(`${dataWithId.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [dataWithId, ...prevState.contacts],
        }));
  };

  filterHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onFilterChange = () =>
    this.state.contacts.filter(({ name }) =>
      name
        .split(' ')
        .join('')
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );

  deleteHandler = e => {
    const filter = this.state.contacts.filter(
      contact => contact.id !== e.currentTarget.parentNode.id
    );
    this.setState({ contacts: filter });
  };

  render() {
    const {
      formSubmitHandler,
      filterHandler,
      onFilterChange,
      deleteHandler,
      state,
    } = this;

    return (
      <FormContainer>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={formSubmitHandler} />
        <Title>Contacts</Title>
        <Filter onChange={filterHandler} value={state.filter} />
        <ContactList contacts={onFilterChange()} onDelete={deleteHandler} />
      </FormContainer>
    );
  }
}
