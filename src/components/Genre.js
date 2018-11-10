import React from 'react';

class Genre extends React.Component {
  render() {
    const {
      data: {
        id,
        name,
      },
    } = this.props;

    return (
      <div className="genre" onClick={() => this.props.updateMovies(id)}>
        {name}
      </div>
    )
  }
}

export default Genre;
