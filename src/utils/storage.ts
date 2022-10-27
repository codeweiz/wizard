/**
 * 往 sessionStorage 中存放 string
 *
 * @param key 键
 * @param data 值
 * */
export const writeSessionString = (key: string, data: string) => {
    sessionStorage.setItem(key, data);
}

/**
 * 从 sessionStorage 中读取 string
 *
 * @param key 键
 * */
export const readSessionString = (key: string) => {
    return sessionStorage.getItem(key);
}

/**
 * 往 sessionStorage 中存放对象
 *
 * @param key 键
 * @param data 值
 * */
export const writeSessionObject = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

/**
 * 从 sessionStorage 中读取对象
 *
 * @param key 键
 * */
export const readSessionObject = (key: string) => {
    return JSON.parse(<string>sessionStorage.getItem(key));
}

/**
 * 从 sessionStorage 中删除对象
 *
 * @param key 键
 * */
export const delSessionObject = (key: string) => {
    sessionStorage.removeItem(key);
}

/**
 * 往 localStorage 中存放 string
 *
 * @param key 键
 * @param data 值
 * */
export const writeLocalString = (key: string, data: string) => {
    localStorage.setItem(key, data);
}

/**
 * 从 localStorage 中读取 string
 *
 * @param key 键
 * */
export const readLocalString = (key: string) => {
    return localStorage.getItem(key);
}

/**
 * 往 localStorage 中存放对象
 *
 * @param key 键
 * @param data 值
 * */
export const writeLocalObject = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 从 localStorage 中读取对象
 *
 * @param key 键
 * */
export const readLocalObject = (key: string) => {
    return JSON.parse(<string>localStorage.getItem(key));
}

