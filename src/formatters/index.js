
import _ from 'lodash';
import renderTypeTree from './renderTypeTree';
import renderTypePlain from './renderTypePlain';
import renderTypeJson from './renderTypeJson';


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
