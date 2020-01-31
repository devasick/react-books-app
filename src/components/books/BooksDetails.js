import React, { Component } from "react";

export default class BooksDetails extends Component {
  truncateTitle = string => {
    return string.length > 10 ? string.substring(0, 40) + "..." : string;
  };
  render() {
    const data = this.props.data;
    console.log(this.props.click);
    return data.map(row => {
      return (
        <div className='col s2 m3 box card book-box' key={row.id}>
          <div className='card-image'>
            {row.thumbnailUrl ? (
              <img src={row.thumbnailUrl} alt={row.title} />
            ) : (
              <img
                src='https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com%20C/O%20https://placeholder.com/'
                alt={row.title}
                width={200}
              />
            )}
          </div>
          <div className='book-title'>{this.truncateTitle(row.title)}</div>
        </div>
      );
    });
  }
}
