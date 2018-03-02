import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsApi from './utils/ContactsAPI'

class App extends Component {
    state = {
        contacts: []
    }

    componentDidMount() {
        ContactsApi.getAll().then((contacts) => {
            this.setState({ contacts })
        })
    }

    removeCointact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))

        ContactsApi.remove(contact)
    }

    createContact(contact) {
        ContactsApi.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([ contact ])
            }))
        })
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <ListContacts
                        onDeleteContact={this.removeCointact}
                        contacts={ this.state.contacts }
                    />
                )}/>
                <Route path='/create' render={({ history }) => (
                    <CreateContact
                        onCreateContact={(contact) => {
                            this.createContact(contact)
                            history.push('/')
                        }}
                    />
                )}/>
            </div>
        )
    }
}

export default App;
