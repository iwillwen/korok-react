/// <reference types="react" />
export declare function registerKorok(key: string): {
    <P>(component: import("react").FunctionComponent<P>): import("react").ComponentClass<P, any>;
    <P, TFunction extends import("react").ComponentClass<P, any>>(component: TFunction): TFunction;
};
