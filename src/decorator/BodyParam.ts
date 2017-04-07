import {defaultMetadataArgsStorage} from "../index";
import {ParamMetadataArgs} from "../metadata/args/ParamMetadataArgs";
import {ParamOptions} from "../decorator-options/ParamOptions";

/**
 * Takes partial data of the request body.
 * Must be applied on a controller action parameters.
 */
export function BodyParam(name: string, options?: ParamOptions): Function {
    return function (object: Object, methodName: string, index: number) {
        const format = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const metadata: ParamMetadataArgs = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: "body",
            reflectedType: format,
            name: name,
            format: format,
            parse: options ? options.parse : false,
            required: options ? options.required : false,
            classTransformOptions: options ? options.transform : undefined,
            validate: options && options.validate ? true : false,
            validateOptions: options && options.validate instanceof Object ? options.validate : undefined
        };
        defaultMetadataArgsStorage().params.push(metadata);
    };
}