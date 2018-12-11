import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/bootstrap.min.css';

class Layout extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <SiteHeader />
                <div className='container'>
                    <MainBody />
                    <TranslateForm />
                </div>
                <SiteFooter />
            </div>
        )
    }
}

class SiteHeader extends React.Component {
    render() {
        return (
            <div className='siteHeader text-center'>
                <h1>Welcome to Shane's Translator</h1>
                <h5>A simple little React.js app for translating text using the Microsoft Text Translate API</h5>
                <hr/>
            </div>
        );
    }
}

class MainBody extends React.Component {
    render() {
        return (
            <div className="body col-10 offset-1 text-center">
                <p>

                    Hi! This app is nothing special so don't get excited. It is purley the result of a Sunday afternoon
                    with not much to do. The football wasn't on till late afternoon so I decided to have a go at learning
                    React.js
                </p>
            </div>
        );
    }
}

class SiteFooter extends React.Component {
    render() {
        return (
            <footer className='text-center'>
                <hr/>
                <p>This is the footer. Nothing thrilling but does what it needs to.</p>
            </footer>
        );
    }
}

class TranslateForm extends React.Component {
    constructor(props) {
        super(props);
        this.validateForm   = this.validateForm.bind(this);
        this.submitForm     = this.submitForm.bind(this);
        this.handleText     = this.handleText.bind(this);
        this.handleFrom     = this.handleFrom.bind(this);
        this.handleTo       = this.handleTo.bind(this);
        this.state = {
            text:null,
            from: '',
            to: '',
            translations: null
        };
    }

    handleText(event) {
        this.setState({text: event.target.value});
    }

    handleFrom(event) {
        this.setState({from: event.target.value});
    }

    handleTo(event) {
        this.setState({to: event.target.value});
    }

    validateForm(event) {
        event.preventDefault();
        this.submitForm(event);
    }

    submitForm(event, text) {
        event.preventDefault();
        const apiKey    = '01002cf6709e46fcacb2100839663db5';
        const to        = this.state.to;
        const from      = this.state.from;
        if (to === from) {
            alert('Really? The answer is '+ this.state.text)
        } else if (this.state.text === null) {
            alert('We need some text to work with please :)');
        }
        else {
            const endpoint  = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='+to+'&from='+from;
            const data      = JSON.stringify([{Text: this.state.text}]);
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey
                },
                body: data
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        translations: result[0].translations[0]
                    });
                    console.log(this.state.translations);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }
    render() {
        let resultDiv;
        if(this.state.translations) {
            resultDiv =
            <div className="card text-center">
                <div className="card-header">
                    Your translation is done - Yay!
                </div>
                <div className="card-body">
                    <h5 className="card-title">The answer is: {this.state.translations.text}</h5>
                </div>
                <div className="card-footer text-muted">
                    Whoop!
                </div>
            </div>
        } else {
            resultDiv = ''
        }

        return (
            <form className="col-8 offset-2" onSubmit={this.validateForm}>
                <div className="form-group">
                    <label htmlFor="from" className="center-text">
                        Which language are we translating from?
                    </label>
                    <select value={this.state.from} onChange={this.handleFrom} id="from" className="form-control">
                        <option value='en'>English</option>
                        <option value='de'>German</option>
                        <option value='es'>Spanish</option>
                        <option value='it'>Italian</option>
                        <option value='fr'>French</option>
                        <option value='pl'>Polish</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="to">
                        Which language are we translating to?
                    </label>
                    <select value={this.state.to} onChange={this.handleTo} id="to" className="form-control">
                        <option value='en'>English</option>
                        <option value='de'>German</option>
                        <option value='es'>Spanish</option>
                        <option value='it'>Italian</option>
                        <option value='fr'>French</option>
                        <option value='pl'>Polish</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="customFile">Text to translate</label>
                    <input type="text" className="form-control" ref={this.translateText} id="customFile" onChange={this.handleText} />
                </div>
                <div className="form-group pull-down">
                    <input type='submit' className="btn btn-primary col-4 offset-4"/>
                </div>
                {resultDiv}

            </form>

        );
    }
}

// ========================================

ReactDOM.render(
  <Layout />,
  document.getElementById('root'),
);
