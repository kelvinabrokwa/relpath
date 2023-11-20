import { relative, dirname } from 'node:path'

export function relativePath(fromPath: string, toPath: string){
    const relativePath = relative(dirname(fromPath), toPath);
    return relativePath
}

export default relativePath
