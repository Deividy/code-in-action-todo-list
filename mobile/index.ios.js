import React from 'react';

import { AppRegistry } from 'react-native';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { Component } = React;

class P extends Component {
    render () {
        return (
            <Text style={ styles.paragraph }>{ this.props.children }</Text>
        );
    }
}

class H1 extends Component {
    render () {
        return (
            <Text style={ [ styles.h1, this.props.style ] }>
                { this.props.children }
            </Text>
        );
    }
}

class Header extends Component {
    render () {
        return (
            <View style={ styles.header }>{ this.props.children }</View>
        );
    }
}

class TodoItem extends Component {
    render () {
        const item = this.props;

        return (
            <TouchableOpacity onPress={ this._onPress } style={ styles.todoItem }>
                <View style={ styles.todoItemIcon }>
                    <FontAwesome
                        name='square-o'
                        size={ 30 }
                        color='#777' />
                </View>

                <View style={ styles.todoItemLabel }>
                    <H1 style={ { fontWeight: 'normal', color: '#444' } }>
                        { item.label }
                    </H1>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress = () => {
        this.props.onPressTouchableItem(this.props.index);
    }
}

class TodoListItems extends Component {
    render () {
        return this.props.todoItems.map((i, idx) =>
            <TodoItem
                onPressTouchableItem={ this._onTodoItemPress }
                key={ idx }
                index={ idx }
                label={ i.label } />
        );
    }

    _onTodoItemPress = (index) => {
        const todoItems = [ ].concat(this.props.todoItems);
        todoItems.splice(index, 1);
        this.props.updateTodoItems(todoItems);
    }
}


class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = { todoItems: [ ], addingItemLabel: '' };
    }

    render () {
        return (
            <View>
                <TodoListItems
                    updateTodoItems={ this._updateTodoItems }
                    todoItems={ this.state.todoItems } />

                <View style={ styles.textinputWrapper }>
                    <TextInput
                        style={ styles.textinput }
                        onChange={ this._onAddingItemLabelChange }
                        value={ this.state.addingItemLabel } />

                    <TouchableOpacity
                        style={ styles.addingButton }
                        onPress={ this._addTodoItem }>
                        <H1>Add todo item</H1>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _updateTodoItems = (todoItems) => {
        this.setState({ todoItems, addingItemLabel: this.state.addingItemLabel });
    }

    _onAddingItemLabelChange = (ev) => {
        this.setState({
            todoItems: this.state.todoItems,
            addingItemLabel: ev.nativeEvent.text
        });
    }

    _addTodoItem = () => {
        const todoItems = [ ].concat(this.state.todoItems);
        todoItems.push({ label: this.state.addingItemLabel });

        this.setState({ todoItems, addingItemLabel: '' });
    }
}

class App extends Component {
    render () {
        return (
            <View style={ styles.container }>
                <Header>
                    <H1 style={ { color: '#FFF' } }>#codeinaction</H1>
                </Header>

                <ScrollView style={ styles.todoContainer }>
                    <TodoList />
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },

    todoContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },

    header: {
        height: 60,
        backgroundColor: '#444',

        alignItems: 'center',
        paddingTop: 12,
        justifyContent: 'center'
    },

    paragraph: {
        fontSize: 14,
        fontWeight: 'normal'
    },

    h1: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    todoItem: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC'
    },

    todoItemIcon: {
        width: 40,
        justifyContent: 'center'
    },

    todoItemLabel: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    textinput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#CCC'
    },


    textinputWrapper: {
        paddingTop: 10
    },

    addingButton: {
        alignItems: 'center'
    }
};

AppRegistry.registerComponent('TodoListCodeInAction', () => App);
