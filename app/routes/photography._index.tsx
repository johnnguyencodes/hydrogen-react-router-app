import {Link} from 'react-router';
import type {Route} from './+types/photography._index';

export default function Photography() {
  return (
    <div className="photography xxs:mx-5 2xl:mx-0">
      <p>This is the Photography page</p>

      <p>Checkout my photography albums</p>

      <Link to="/photography/08-22-2025" className="block">
        08-22-2025 (My first rolls of photography with Pentax 17)
      </Link>
      <Link to="/photography/09-10-2025" className="block">
        09-10-2025 (My first two rolls that I developed and scanned at home)
      </Link>
      <Link to="/photography/10-25-2025" className="block">
        10-25-2025 (My first set of pictures I shot with my Nikon D850 and
        edited in lightroom)
      </Link>
    </div>
  );
}
