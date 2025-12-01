declare global {
    type require = ((name: string) => any);
    type __name = string;
    interface module {
        exports: (Record<string, any> & {default: any}) | any;
    }
}