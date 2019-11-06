import React, { Component } from 'react'


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      name: '',
      type: '',
      captured: false,
      description: '',
      attacks: '',
      photo: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.submit = this.submit.bind(this);
    this.loadPokemon = this.loadPokemon.bind(this);
  }

  handleChange(element) {
    const inputName = element.target.name;
    const inputValue = element.target.value;

    const statusCopy = Object.assign({}, this.state);
    statusCopy[inputName] = inputValue;

    console.log(statusCopy);
    this.setState(statusCopy);
  }

  handleCheckbox(element) {
    const inputName = element.target.name;
    const inputValue = element.target.checked;

    const statusCopy = Object.assign({}, this.state);
    statusCopy[inputName] = inputValue;

    console.log(statusCopy);
    this.setState(statusCopy);
  }

  handleFile(element) {
    const inputName = element.target.name;
    const inputFile = element.target.files[0];
    const statusCopy = Object.assign({}, this.state);

    if (inputFile != null) {
      const fileReader = new FileReader();

      fileReader.onload = (fle) => {
        const file = fle.target.result;
        console.log(file);

        statusCopy[inputName] = file;
        console.log(statusCopy);

        this.setState(statusCopy);
      };

      fileReader.readAsDataURL(inputFile);
    }
  }

  submit(id) {
    const dataToUpload = Object.assign({}, this.state);
    delete dataToUpload.loaded;

    if(dataToUpload.photo == null)
      delete dataToUpload.photo;

    fetch("http://localhost:8000/pokemons/" + id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(this.state),
      })
      .then(res => res.json())
      .then(data => alert("Pokemon modified"))
      .catch(err => console.log(err))
  }

  loadPokemon(id) {
    fetch(`http://localhost:8000/pokemons/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ loaded: true });
        this.setState(data);
      }).catch(err => console.log(err));
  }

  render() {
    if (!this.state.loaded)
      this.loadPokemon(this.props.match.params.pokemonId)

    if (this.state.loaded)
      return (
        <div>
          <h1>Modifier {this.state.name}</h1>
          <div>
            <div>
              <label htmlFor='name'>Nom</label>
              <input
                value={this.state.name}
                onChange={this.handleChange}
                name='name'
                id='name'
              ></input>
            </div>
            <div>
              <label htmlFor='type'>Type</label>
              <input
                value={this.state.type}
                onChange={this.handleChange}
                name='type'
                id='type'></input>
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea
                value={this.state.description}
                onChange={this.handleChange}
                name='description'
                id='description'></textarea>
            </div>
            <div>
              <label htmlFor='attacks'>Attaques</label>
              <textarea
                value={this.state.attacks}
                onChange={this.handleChange}
                name='attacks' id='attacks'></textarea>
            </div>
            <div>
              <label htmlFor='captured'>Capturé</label>
              <input
                checked={this.state.captured}
                onChange={this.handleCheckbox}
                name='captured' id='captured' type='checkbox'></input>
            </div>
            <div>
              <label htmlFor='photo'>Photo</label>
              <input
                onChange={this.handleFile}
                name='photo' id='photo' type='file'></input>
            </div>
            <div>
              <button onClick={() => this.submit(this.props.match.params.pokemonId)}>GO !</button>
            </div>
          </div>
        </div>
      );
    else
        return (
          <div>Loading motherfucker !!!!</div>
        )
  }
}

export default Edit;