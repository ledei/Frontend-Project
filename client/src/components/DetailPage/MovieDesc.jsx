import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

/**
 * @author Louise Johansson
 * @description Renders the information about the film, takes in movie data from parent.
 */

function MovieDesc({ movie }) {
  return (
    <Container className='movie-desc-container mt-2'>
        <Row>
            <Col xs={5} sm={6} md={6} className='d-lg-none'>
                <Image src={movie.Poster} alt={movie.Title} fluid className="max-200 max-300 poster" />
            </Col>
            <Col xs={7} sm={6} md={6} lg={12}>
                <h2 className='d-lg-none title-h2'>Titel</h2>
                <p className='movie-title'>{movie.Title}</p>
                <h2>Genre</h2>
                <p>{movie.Genre}</p>
                <h2>Beskrivning</h2>
                <p>{movie.About}</p>
                <h2>Längd</h2>
                <p>{movie.Runtime}</p>
                <h2>Skådespelare</h2>
                <p>{movie.Actor}</p>
                <h2>Språk</h2>
                <p>{movie.Lang}</p>
                <h2>Släppt</h2>
                <p>{movie.Release_date}</p>
            </Col>
        </Row>
    </Container>
  );
}

export default MovieDesc;
