import React, { Component } from "react";

const placeholderImageUrl = "https://via.placeholder.com/150";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterImageUrl: null,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ characterImageUrl: this.props.imageUrl }); // Establecer la URL de la imagen desde las props
  }

  render() {
    const { characterImageUrl } = this.state;
    const { alt, characterDirection } = this.props;

    const imageUrl = characterImageUrl || placeholderImageUrl;

    return (
      <img
        src={imageUrl}
        alt={alt}
        className={characterDirection.toLowerCase()}
      />
    );
  }
}

export default Image;