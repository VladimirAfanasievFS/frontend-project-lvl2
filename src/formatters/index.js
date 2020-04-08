
import _ from 'lodash';
import renderTree from './Tree';
import renderPlain from './Plain';
import renderJson from './Json';


const renders = {
  tree: renderTree,
  plain: renderPlain,
  JSON: renderJson,
};

const getRender = (render) => {
  if (!_.has(renders, render)) {
    throw new Error(`Unknown render : ${render}'.`);
  }
  return renders[render];
};
export default getRender;
