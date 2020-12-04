
import getDecorators from 'inversify-inject-decorators';
import { container } from '../inversify.config';
const { lazyInject } = getDecorators(container);

export  { lazyInject };
