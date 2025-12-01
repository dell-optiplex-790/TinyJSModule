declare global {
    type require = ((name: string) => any);
    type __name = string;
    type __dirname = string;
    interface module {
        exports: any;
    }
}