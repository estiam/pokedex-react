import React, { Component } from 'react'


class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  submit() {
    fetch("http://localhost:8000/pokemons",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state),
      })
      .then(data => alert("Pokemon created")
        .catch(err => console.log(err))
      )
  }

  

  render() {
    return (
      <div>
        <h1>Ajouter un pokémon</h1>
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
            <button onClick={this.submit}>GO !</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;