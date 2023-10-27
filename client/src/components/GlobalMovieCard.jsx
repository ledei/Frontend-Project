import { Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
function GlobalMovieCard(props) {
  return (
    <>
      <Col xs={props.xs} md={props.md} key={props.id}>
        <p>{props.index}</p>
        <Link to={`/film/${props.id}`}>
          <Image src={`${props.img}`} fluid rounded />
          <p>{props.title} </p>
        </Link>
      </Col>
    </>
  );
}

export default GlobalMovieCard;