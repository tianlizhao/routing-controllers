import {defaultMetadataArgsStorage} from "../index";
import {ParamMetadataArgs} from "../metadata/args/ParamMetadataArgs";

/**
 * Injects a Request object to the controller action parameter.
 * Must be applied on a controller action parameters.
 */
export function Req(): Function {
    return function (object: Object, methodName: string, index: number) {
        const reflectedType = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const metadata: ParamMetadataArgs = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: "request",
            reflectedType: reflectedType,
            parse: false,
            required: false
        };
        defaultMetadataArgsStorage().params.push(metadata);
    };
}