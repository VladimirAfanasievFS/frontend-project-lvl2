
import _ from 'lodash';
import renderTypeTree from './Tree';
import renderTypePlain from './Plain';
import renderTypeJson from './Json';


const renders = {
  tree: renderTypeTree,
  plain: renderTypePlain,
  JSON: renderTypeJson,
};

const getRender = (render) => {
  if (!_.has(renders, render)) {
    throw new Error(`Unknown render : ${render}'.`);
  }
  return renders[render];
};
export default getRender;
