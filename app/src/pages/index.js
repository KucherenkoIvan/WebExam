import MainPage from './Main/Main';
import ManualsPage from './WebGLManuals/WebGLManuals';
import ExamplesPage from './Examples/Examples';
import GLSLPage from './GLSL/GLSL';
import ForumPage from './Forum/Forum';
import page404 from './404/404';

const routes = {
  '/': MainPage,
  '/examples': ExamplesPage,
  '/glsl': GLSLPage,
  '/forum': ForumPage,
  '/webgl_manuals': ManualsPage,
  '/404': page404,
};

export default routes;
