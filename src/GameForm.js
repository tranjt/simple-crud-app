import React from "react";
import classnames from "classnames";

class GameForm extends React.Component {

    state = {
        title: this.props.game ? this.props.game.title : "",
        cover: this.props.game ? this.props.game.cover : "",
        _id: this.props.game ? this.props.game._id : null,
        errors: {},
        loading: false        
    };    

    // componentDidMount fetchGame data
    // componentWillReceiveProps update/rerender component with new props         
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            _id: nextProps.game._id,
            title: nextProps.game.title,
            cover: nextProps.game.cover,
        });
    }    

    handleChange = (event) => {

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({
                [event.target.name] : event.target.value,
                errors
            });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // validation
        let errors = {};
        if (this.state.title === "") errors.title = "Can't be empty";
        if (this.state.cover === "") errors.cover = "Can't be empty";
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { _id, title, cover } = this.state;
            this.setState({ loading: true });
            this.props.saveGame({ _id, title, cover })
            .catch((err) => {
                err.response.json()
                .then(({errors}) => {
                // errors contain "global" variable with text message from resp
                    this.setState({errors, loading: false })
                });
            });

        }
    };
    // double !! double negation to convert to boolean
    render() {
        const form = (
            <form className={classnames("ui", "form", { loading: this.state.loading })} onSubmit={this.handleSubmit}>
               <h1>Add new game</h1>
               {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
             
               <div className={classnames("field", { error: !!this.state.errors.title })}>
                   <label htmlFor="title">Tilte</label>
                   <input 
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}                   
                    id="title"
                    />
                    <span>{this.state.errors.title}</span>

               </div>

                <div className={classnames("field",{ error: !!this.state.errors.cover })}>
                   <label htmlFor="title">Cover URL</label>
                   <input 
                    name="cover"
                    value={this.state.cover}
                    onChange={this.handleChange}       
                    id="cover"
                    />
                    <span>{this.state.errors.cover}</span>
               </div>

                <div className="field">
                    {this.state.cover !== "" && <img src={this.state.cover} alt="cover" className="ui small bordered image" />}
                </div>

                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>

           </form>
        );

        return (
           <div>
               { form }
           </div>
        );
    }
}

// redirect condition 
// state = { done : true/false}
//  { this.state.done ? <Redirect to="/games"/> : form }



export default GameForm;