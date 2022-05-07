import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const renders = {
  stylish,
  plain,
  json: JSON.stringify,
};

const getRender = (render) => {
  if (!_.has(renders, render)) {
    throw new Error(`Unknown render : ${render}'.`);
  }
  return renders[render];
};
export default getRender;
