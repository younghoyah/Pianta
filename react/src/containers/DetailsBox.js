import React from 'react';
import PlantEdit from '../components/PlantEdit'

class DetailsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scientificName: ''
    };
    this.getScientificName = this.getScientificName.bind(this);
  }

  getScientificName(plantName) {
    let commonName = plantName.toLowerCase();
    fetch(`https://plantsdb.xyz/search?common_name=${commonName}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let genus, species;
      if (body.data) {
        genus = body.data[0].Genus;
        species = body.data[0].Species;
        this.setState({scientificName:`${genus} ${species}`})
      }
    })
    .catch(error => {
      this.setState({scientificName: ''})
      console.error(`Error in fetch: ${error.message}`)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.getScientificName(nextProps.commonName)
  }

  render() {
    let scientificName;
    if (this.state.scientificName) {
      scientificName = <div><i className='fa fa-file-text-o fa-fw'></i><strong>{this.state.scientificName}</strong></div>
    }
    return(
      <div className='details-container'>
        <i className='fa fa-leaf fa-fw'></i><strong>{this.props.commonName}</strong>
        {scientificName}
        <div><i className='fa fa-sun-o fa-fw'></i><strong>Sunlight: </strong>{this.props.sunlightNeeds}</div>
        <div><i className='fa fa-tint fa-fw'></i><strong>Watering: </strong>{this.props.wateringNeeds}</div>
        <i onClick={this.props.handleEdit} className='fa fa-pencil edit-button'></i>
      </div>
    );
  }
};

export default DetailsBox;
