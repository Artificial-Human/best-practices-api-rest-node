import BaseError from '@shared/baseError';
import { Http } from '@status/codes';
import {plainToClass} from 'class-transformer';
import { validate, ValidationError} from 'class-validator';

class ForbiddenErrorValidators  extends BaseError {
  constructor(errors: any) {
    super('validation error', Http.Forbidden, errors);
  }
}

function validationFactory<T>(metadataKey: Symbol, model: new (...args: any[]) => T, source: 'body' | 'query') {
    return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        Reflect.defineMetadata(metadataKey, model, target, propertyName);

        const method = descriptor.value;

        descriptor.value = async function(...args: any[]) {
        const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);

        const plain = args[0][source];
        const errors = await validate(plainToClass(model, plain));

        if (errors.length > 0) {
            throw new ForbiddenErrorValidators(transformValidationErrorsToJSON(errors));
        }
        return method.apply(target, args);
      };

    };
}

export const ValidateQuery = (dto: any) => validationFactory(Symbol('validate-query'), dto, 'query');
export const ValidateBody = (dto: any) => validationFactory(Symbol('validate-body'), dto, 'body');

function transformValidationErrorsToJSON(errors: ValidationError[]) {
    return errors.reduce((p: any, c: ValidationError) => {
        if (!c.children || !c.children.length) {
            p[c.property] = Object.keys(c.constraints).map((key) => c.constraints[key]);
        } else {
            p[c.property] = transformValidationErrorsToJSON(c.children);
        }
        return p;
    }, {});
}
