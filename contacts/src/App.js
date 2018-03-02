import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsApi from './utils/ContactsAPI'

class App extends Component {
    state = {
        screen: 'list', // list & create
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

    render() {
        return (
            <div>
                {this.state.screen === 'list' && (
                    <ListContacts
                        onDeleteContact={this.removeCointact}
                        contacts={ this.state.contacts }
                        onNavigate={() => {
                            this.setState({ screen: 'create' })
                        }}
                    />
                )}
                {this.state.screen === 'create' && (
                    <CreateContact/>
                )}
            </div>
        )
    }
}

export default App;
